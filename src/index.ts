import { config } from "dotenv";
config({ path: ".env.dev" });

import { Database } from "./@shared/database/database";
import { PostgresDatabase } from "./@shared/database/postgres.database";
import { FastifyHttpServer } from "./@shared/http-server/fastify.http-server";
import { HttpServer } from "./@shared/http-server/http-server";
import { ClientHttpController } from "./controller/client.http.controller";
import { ClientPostgresRepository } from "./model/client.postgres.repository";
import { ClientRepository } from "./model/client.repository";
import { CLientHttpView } from "./view/client.http.view";
import { ClientView } from "./view/client.view";

const db: Database = new PostgresDatabase();

const model: ClientRepository = new ClientPostgresRepository(db);
const view: ClientView = new CLientHttpView();
const controller = new ClientHttpController(model, view);

const SERVER_PORT = 3000;
const httpServer: HttpServer = new FastifyHttpServer();

httpServer.post("/clients", controller.create);
httpServer.put("/clients/:id", controller.update);
httpServer.delete("/clients/:id", controller.delete);
httpServer.get("/clients", controller.findAll);
httpServer.get("/clients/:id", controller.findById);
httpServer.get("/clients/by-name/:name", controller.findByName);
httpServer.get("/clients/count", controller.count);

db.runMigrations().then(() => {
  httpServer
    .listen(SERVER_PORT)
    .then(() => console.log(`Server running on port ${SERVER_PORT}`));
});
