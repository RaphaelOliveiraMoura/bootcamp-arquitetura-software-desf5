import { randomUUID } from "crypto";

export class ClientEntity {
  id: string;
  document: string;
  fullName: string;
  birthDate: Date;

  static generateId() {
    return randomUUID();
  }
}
