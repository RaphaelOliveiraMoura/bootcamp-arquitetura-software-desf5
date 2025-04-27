import { Client } from "pg";
import { Database } from "./database";
import { PostgresMigrations } from "./postgres.migrations";

export class PostgresDatabase implements Database {
  client = new Client({ connectionString: process.env.DB_URL });
  postgresMigrations = new PostgresMigrations(this);

  async connect(): Promise<void> {
    try {
      this.client = new Client({ connectionString: process.env.DB_URL });
      await this.client.connect();
    } catch (error) {
      console.log(
        "Erro ao tentar realizar conexão com banco de dados, retentando novamente em 5s..."
      );
      await new Promise((resolve) => setTimeout(() => resolve(null), 5000));
      await this.connect();
    }
  }

  async disconnect(): Promise<void> {
    await this.client.end();
  }

  async query<T = any>(sql: string, params?: string[]): Promise<{ data: T[] }> {
    await this.connect();
    try {
      const result = await this.client.query(sql, params);
      return { data: result.rows as T[] };
    } finally {
      await this.disconnect();
    }
  }

  async runMigrations(): Promise<void> {
    await this.postgresMigrations.runMigrations();
  }
}
