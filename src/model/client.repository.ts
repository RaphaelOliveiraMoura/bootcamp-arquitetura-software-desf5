import { ClientEntity } from "./client.entity";

export interface ClientRepository {
  findAll(): Promise<ClientEntity[]>;
  findById(id: string): Promise<ClientEntity | null>;
  findByName(name: string): Promise<ClientEntity | null>;
  create(client: ClientEntity): Promise<void>;
  update(client: ClientEntity): Promise<void>;
  delete(id: string): Promise<void>;
  count(): Promise<number>;
}
