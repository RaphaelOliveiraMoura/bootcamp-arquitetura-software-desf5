import { Database } from "../@shared/database/database";
import { ClientEntity } from "./client.entity";
import { ClientRepository } from "./client.repository";

export class ClientPostgresRepository implements ClientRepository {
  constructor(private database: Database) {}

  async findAll(): Promise<ClientEntity[]> {
    const { data } = await this.database.query<{
      id: string;
      document: string;
      name: string;
      birth_date: string;
    }>("SELECT id, document, name, birth_date FROM clients ");

    return data.map((item) => {
      const client = new ClientEntity();
      client.id = item.id;
      client.document = item.document;
      client.fullName = item.name;
      client.birthDate = new Date(item.birth_date);
      return client;
    });
  }

  async findById(id: string): Promise<ClientEntity | null> {
    const { data } = await this.database.query<{
      id: string;
      document: string;
      name: string;
      birth_date: string;
    }>(
      "SELECT id, document, name, birth_date FROM clients WHERE id::text = $1",
      [id]
    );

    if (!data.length) return null;

    const client = new ClientEntity();
    client.id = data[0].id;
    client.document = data[0].document;
    client.fullName = data[0].name;
    client.birthDate = new Date(data[0].birth_date);

    return client;
  }

  async findByName(name: string): Promise<ClientEntity | null> {
    const { data } = await this.database.query<{
      id: string;
      document: string;
      name: string;
      birth_date: string;
    }>("SELECT id, document, name, birth_date FROM clients WHERE name = $1", [
      name,
    ]);

    if (!data.length) return null;

    const client = new ClientEntity();
    client.id = data[0].id;
    client.document = data[0].document;
    client.fullName = data[0].name;
    client.birthDate = new Date(data[0].birth_date);

    return client;
  }

  async count(): Promise<number> {
    const { data } = await this.database.query<{
      total: string;
    }>("SELECT COUNT(id) as total FROM clients");

    return +data[0].total;
  }

  async create(client: ClientEntity): Promise<void> {
    const { data: alreadyExists } = await this.database.query(
      "SELECT id FROM clients WHERE document = $1;",
      [client.document]
    );

    if (alreadyExists.length) {
      throw new Error("UserAlreadyExists");
    }

    await this.database.query(
      "INSERT INTO clients (id, document, name, birth_date) VALUES ($1, $2, $3, $4)",
      [
        client.id,
        client.document,
        client.fullName,
        client.birthDate.toLocaleDateString(),
      ]
    );
  }

  async update(client: ClientEntity): Promise<void> {
    await this.database.query(
      "UPDATE clients SET document = $1, name = $2, birth_date = $3 WHERE id = $4",
      [
        client.document,
        client.fullName,
        client.birthDate.toLocaleDateString(),
        client.id,
      ]
    );
    return;
  }

  async delete(id: string): Promise<void> {
    const userExists = await this.findById(id);
    if (!userExists) {
      throw new Error("UserNotExists");
    }
    await this.database.query("DELETE FROM clients WHERE id = $1", [id]);
  }
}
