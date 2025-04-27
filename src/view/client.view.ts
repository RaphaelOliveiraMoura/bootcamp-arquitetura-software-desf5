import { ClientEntity } from "../model/client.entity";

export interface ClientView {
  show(client: ClientEntity): any;
}
