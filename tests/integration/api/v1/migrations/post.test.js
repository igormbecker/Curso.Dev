import database from "infra/database.js";

beforeAll(cleanDb);

async function cleanDb() {
  await database.query(`DROP SCHEMA public CASCADE; CREATE SCHEMA public;`);
}

test("POST to /api/v1/migrations should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
    body: JSON.stringify({
      "txt": "Run POST migrations"
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  console.log("POST: ", responseBody);

  expect(Array.isArray(responseBody)).toBe(true);

});