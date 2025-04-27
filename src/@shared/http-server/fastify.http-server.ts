import Fastify, { FastifyReply, FastifyRequest } from "fastify";

import { HttpFunction, HttpServer } from "./http-server";

import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import * as YAML from "yamljs";

const swaggerDocument = YAML.load("./swagger.yaml");

export class FastifyHttpServer implements HttpServer {
  fastify = Fastify({
    logger: true,
  });

  constructor() {
    this.fastify.register(swagger, {
      mode: "static",
      specification: {
        document: swaggerDocument,
      },
    });

    this.fastify.register(swaggerUI, {
      routePrefix: "/docs",
      uiConfig: {
        docExpansion: "list",
        deepLinking: false,
        tryItOutEnabled: true,
      },
    });
  }

  async listen(port: number): Promise<void> {
    await this.fastify.listen({ port, host: "0.0.0.0" });
  }

  private mapRequest(fn: HttpFunction) {
    return async (req: FastifyRequest, res: FastifyReply) => {
      const result = await fn({ body: req.body, params: req.params });
      return res.status(result.status).send(result.data);
    };
  }

  post(path: string, fn: HttpFunction): void {
    this.fastify.post(path, this.mapRequest(fn));
  }

  get(path: string, fn: HttpFunction): void {
    this.fastify.get(path, this.mapRequest(fn));
  }

  put(path: string, fn: HttpFunction): void {
    this.fastify.put(path, this.mapRequest(fn));
  }

  delete(path: string, fn: HttpFunction): void {
    this.fastify.delete(path, this.mapRequest(fn));
  }
}
