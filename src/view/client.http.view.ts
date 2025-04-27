import { ClientEntity } from "../model/client.entity";
import { ClientView } from "./client.view";

export class CLientHttpView implements ClientView {
  show(client: ClientEntity) {
    return {
      id: client.id,
      cpf: client.document,
      data_nascimento: client.birthDate.toLocaleDateString(),
      nome_completo: client.fullName,
    };
  }
}
