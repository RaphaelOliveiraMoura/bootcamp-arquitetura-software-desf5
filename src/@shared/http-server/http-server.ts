export interface HttpServer {
  listen(port: number): Promise<void>;

  post(path: string, fn: HttpFunction): void;
  get(path: string, fn: HttpFunction): void;
  put(path: string, fn: HttpFunction): void;
  delete(path: string, fn: HttpFunction): void;
}

export type HttpRequest = {
  body: any;
  params: any;
};

export type HttpResponse = {
  status: number;
  data: object;
};

export type HttpFunction = (req: HttpRequest) => Promise<HttpResponse>;
