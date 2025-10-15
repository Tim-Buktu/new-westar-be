import { readFileSync } from "node:fs";
import { PrismaClient } from "@prisma/client";
import { PrismaNewsletterRepository } from "../../src/repositories/prisma/newsletterRepository.js";

const baseDatabaseUrl = process.env.DATABASE_URL;
const shouldRun =
  typeof baseDatabaseUrl === "string" &&
  baseDatabaseUrl.length > 0 &&
  !baseDatabaseUrl.includes("USER:PASSWORD");

const describeIfDb = shouldRun ? describe : describe.skip;

const getTestDatabaseUrls = (url: string) => {
  const parsed = new URL(url);
  const schemaName = `test_${Date.now()}_${Math.floor(Math.random() * 10_000)}`;
  const baseParsed = new URL(url);
  baseParsed.searchParams.delete("schema");

  parsed.searchParams.set("schema", schemaName);

  return {
    schema: schemaName,
    baseUrl: baseParsed.toString(),
    schemaUrl: parsed.toString()
  };
};

const runMigration = async (client: PrismaClient, schema: string) => {
  const migrationSql = readFileSync(
    "prisma/migrations/20250105000000_init/migration.sql",
    "utf-8"
  );

  await client.$executeRawUnsafe(`SET search_path TO "${schema}"`);

  const statements = migrationSql
    .split(/;\s*\n/)
    .map((statement) => statement.trim())
    .filter(Boolean);

  for (const statement of statements) {
    await client.$executeRawUnsafe(statement);
  }
};

describeIfDb("PrismaNewsletterRepository", () => {
  let prisma: PrismaClient;
  let schema: string;
  let repository: PrismaNewsletterRepository;
  let urls:
    | {
        schema: string;
        baseUrl: string;
        schemaUrl: string;
      }
    | undefined;

  beforeAll(async () => {
    if (!baseDatabaseUrl) return;

    urls = getTestDatabaseUrls(baseDatabaseUrl);
    schema = urls.schema;

    const schemaClient = new PrismaClient({
      datasources: {
        db: { url: urls.baseUrl }
      }
    });

    await schemaClient.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schema}"`);
    await schemaClient.$disconnect();

    prisma = new PrismaClient({
      datasources: {
        db: { url: urls.schemaUrl }
      }
    });

    await runMigration(prisma, schema);

    repository = new PrismaNewsletterRepository(prisma);
  }, 30_000);

  afterAll(async () => {
    if (!prisma) return;

    await prisma.$disconnect();

    if (!urls) return;

    const cleanupClient = new PrismaClient({
      datasources: {
        db: { url: urls.baseUrl }
      }
    });

    await cleanupClient.$executeRawUnsafe(
      `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
    );
    await cleanupClient.$disconnect();
  });

  it("creates and retrieves newsletters", async () => {
    const newsletter = await repository.create({
      title: "Integration Test",
      date: new Date().toISOString(),
      tags: ["integration"],
      summary: "Testing create lifecycle"
    });

    const fetched = await repository.findById(newsletter.id);

    expect(fetched?.title).toBe("Integration Test");
    expect(fetched?.tags).toContain("integration");
  });
});
