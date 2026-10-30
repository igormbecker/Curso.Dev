import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";
import session from "models/session.js";
import { parseSetCookie } from "set-cookie-parser";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDataBase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/user", () => {
  describe("Default user", () => {
    test("With valid session", async () => {
      const createdUser = await orchestrator.createUser({
        name: "User With Valid Session",
        username: "UserWithValidSession",
      });

      const sessionObject = await orchestrator.createSession(createdUser.id);

      const response = await fetch("http://localhost:3000/api/v1/user", {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });
      expect(response.status).toBe(200);

      const cacheControl = response.headers.get("Cache-Control");
      expect(cacheControl).toBe(
        "no-store, no-cache, max-age=0, must-revalidate",
      );

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: createdUser.id,
        name: "User With Valid Session",
        username: "UserWithValidSession",
        email: createdUser.email,
        password: createdUser.password,
        created_at: createdUser.created_at.toISOString(),
        updated_at: createdUser.updated_at.toISOString(),
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      //Session renewal assertions
      const renewedSessionObject = await session.findOneValidByToken(
        sessionObject.token,
      );

      expect(
        renewedSessionObject.expires_at > sessionObject.expires_at,
      ).toEqual(true);
      expect(
        renewedSessionObject.updated_at > sessionObject.updated_at,
      ).toEqual(true);

      //Set-Cookie assertions
      const parsedSetCookie = parseSetCookie(response, {
        map: true, // default: false
      });

      expect(parsedSetCookie.session_id).toEqual({
        name: "session_id",
        value: sessionObject.token,
        maxAge: session.EXPIRATION_IN_MILLISECONDS / 1000,
        path: "/",
        httpOnly: true,
      });
    });

    test("With nonexistent session", async () => {
      const nonexistentToken =
        "4c5095aead1773a061f65ea3868a819bafedae65939742cb4bf4eccc30cc280dcbfc3574b34b581bc048a9834622c31f";

      const response = await fetch("http://localhost:3000/api/v1/user", {
        headers: {
          Cookie: `session_id=${nonexistentToken}`,
        },
      });

      expect(response.status).toBe(401);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "UnauthorizedError",
        message: "User doesn't have active session.",
        action: "Check if user is authenticated and try again.",
        status_code: 401,
      });
    });

    test("With expired session", async () => {
      jest.useFakeTimers({
        now: new Date(Date.now() - session.EXPIRATION_IN_MILLISECONDS),
      });

      const createdUser = await orchestrator.createUser({
        name: "User With Expired Session",
        username: "UserWithExpiredSession",
      });

      const sessionObject = await orchestrator.createSession(createdUser.id);

      jest.useRealTimers();

      const response = await fetch("http://localhost:3000/api/v1/user", {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });
      expect(response.status).toBe(401);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "UnauthorizedError",
        message: "User doesn't have active session.",
        action: "Check if user is authenticated and try again.",
        status_code: 401,
      });
    });

    test("With session expiring in 30 seconds", async () => {
      const createdUser = await orchestrator.createUser({
        name: "User With Expiring Session",
        username: "UserWithExpiringSession",
      });

      const remainingTimeInMilliseconds = 30 * 1000;

      jest.useFakeTimers({
        now: new Date(
          Date.now() -
            session.EXPIRATION_IN_MILLISECONDS +
            remainingTimeInMilliseconds,
        ),
      });

      let sessionObject;

      try {
        sessionObject = await orchestrator.createSession(createdUser.id);
      } finally {
        jest.useRealTimers();
      }

      const requestStartedAt = Date.now();

      const response = await fetch("http://localhost:3000/api/v1/user", {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();
      expect(responseBody.id).toBe(createdUser.id);

      const renewedSessionObject = await session.findOneValidByToken(
        sessionObject.token,
      );

      expect(renewedSessionObject.expires_at.getTime()).toBeGreaterThan(
        sessionObject.expires_at.getTime(),
      );

      expect(renewedSessionObject.expires_at.getTime()).toBeGreaterThanOrEqual(
        requestStartedAt + session.EXPIRATION_IN_MILLISECONDS,
      );
    });
  });
});
