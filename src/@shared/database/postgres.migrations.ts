import { Database } from "./database";

const migrations: { name: string; sql: string }[] = [
  {
    name: "init",
    sql: `
        CREATE TABLE clients (
            id uuid primary key not null,
            name varchar not null,
            document varchar not null,
            birth_date varchar not null
        ); 
    `,
  },
];

export class PostgresMigrations {
  constructor(private database: Database) {}

  async runMigrations() {
    console.log("Iniciando execução das migrations...");

    await this.database.query(
      "CREATE TABLE IF NOT EXISTS migrations (name varchar);"
    );

    for (const { name, sql } of migrations) {
      const { data } = await this.database.query(
        "SELECT * FROM migrations WHERE name = $1;",
        [name]
      );

      if (data.length) continue;

      try {
        await this.database.query(sql);

        await this.database.query(
          "INSERT INTO migrations (name) VALUES ($1);",
          [name]
        );

        console.log(`💨 Migration ${name} executada com sucesso.`);
      } catch (error) {
        console.log(`❌ Falha ao executar migration ${name}.`, error);
        throw error;
      }
    }

    console.log("✅ Todas as migrations foram executadas com sucesso.");
  }
}
