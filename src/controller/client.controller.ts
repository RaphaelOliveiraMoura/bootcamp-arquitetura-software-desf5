export interface ClientController<ControllerFunctionInterface> {
  create: ControllerFunctionInterface;
  update: ControllerFunctionInterface;
  delete: ControllerFunctionInterface;
  findAll: ControllerFunctionInterface;
  findById: ControllerFunctionInterface;
  findByName: ControllerFunctionInterface;
  count: ControllerFunctionInterface;
}
