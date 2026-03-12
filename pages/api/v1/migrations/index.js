import migrationRunner from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const allowedMethods = ["GET", "POST"];
  let dbClient;

  if (!allowedMethods.includes(request.method))
    return response.status(405).json({ error: "Method not allowed" }).end();

  try {

    dbClient = await database.getNewClient();

    const defaultMigrationsOptions = {
      dbClient: dbClient,
      //databaseUrl: process.env.DATABASE_URL,
      dryRun: true,
      dir: join("infra", "migrations"),
      direction: "up",
      verbose: true,
      migrationsTable: "pgmigrations",
    };

    if (request.method === "GET") {
      const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
      return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
      const migratedMigrations = await migrationRunner({
        ...defaultMigrationsOptions,
        dryRun: false,
      });

      // Se alguma migration foi executada, retornamos 201, caso contrário, retornamos 200
      if (migratedMigrations.length > 0)
        return response.status(201).json(migratedMigrations);

      return response.status(200).json(migratedMigrations);
    }

  } catch (error) {

    console.error("Error running migrations:", error);
    return response.status(500).json({ error: "Internal Server Error" }).end();

  } finally {

    await dbClient.end();

  }
}