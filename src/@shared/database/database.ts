export interface Database {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  query<T = any>(sql: string, params?: string[]): Promise<{ data: T[] }>;
  runMigrations(): Promise<void>;
}
