import {
  HttpFunction,
  HttpRequest,
  HttpResponse,
} from "../@shared/http-server/http-server";
import { ClientEntity } from "../model/client.entity";
import { ClientRepository } from "../model/client.repository";
import { ClientView } from "../view/client.view";
import { ClientController } from "./client.controller";

export class ClientHttpController implements ClientController<HttpFunction> {
  constructor(
    private clientModel: ClientRepository,
    private clientView: ClientView
  ) {}

  create = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      const clientEntity = new ClientEntity();
      clientEntity.id = ClientEntity.generateId();
      clientEntity.document = req.body.cpf;
      clientEntity.fullName = req.body.nome_completo;
      clientEntity.birthDate = new Date(req.body.data_nascimento);
      await this.clientModel.create(clientEntity);
      return { status: 201, data: this.clientView.show(clientEntity) };
    } catch (error) {
      if (error.message === "UserAlreadyExists") {
        return { status: 400, data: { message: "Usuário já existe" } };
      }
      throw error;
    }
  };

  update = async (req: HttpRequest): Promise<HttpResponse> => {
    const clientEntity = new ClientEntity();
    clientEntity.id = req.params.id;
    clientEntity.document = req.body.cpf;
    clientEntity.fullName = req.body.nome_completo;
    clientEntity.birthDate = new Date(req.body.data_nascimento);
    await this.clientModel.update(clientEntity);
    return { status: 200, data: this.clientView.show(clientEntity) };
  };

  delete = async (req: HttpRequest): Promise<HttpResponse> => {
    try {
      await this.clientModel.delete(req.params.id);
      return { status: 200, data: { id: req.params.id } };
    } catch (error) {
      if (error.message === "UserNotExists") {
        return { status: 400, data: { message: "Usuário não existe" } };
      }
      throw error;
    }
  };

  findAll = async (req: HttpRequest): Promise<HttpResponse> => {
    const clients = await this.clientModel.findAll();
    return { status: 200, data: clients.map(this.clientView.show) };
  };

  findById = async (req: HttpRequest): Promise<HttpResponse> => {
    const client = await this.clientModel.findById(req.params.id);
    if (!client) {
      return { status: 404, data: { message: "Usuário não encontrado" } };
    }
    return { status: 200, data: this.clientView.show(client) };
  };

  findByName = async (req: HttpRequest): Promise<HttpResponse> => {
    const client = await this.clientModel.findByName(req.params.name);
    if (!client) {
      return { status: 404, data: { message: "Usuário não encontrado" } };
    }
    return { status: 200, data: this.clientView.show(client) };
  };

  count = async (req: HttpRequest): Promise<HttpResponse> => {
    const total = await this.clientModel.count();
    return { status: 200, data: { total } };
  };
}

export type ClientData = {
  cpf: string;
  nome_completo: string;
  data_nascimento: string;
};
