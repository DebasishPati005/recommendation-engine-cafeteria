export type TDatabaseConnectionParams = {
   host: string;
   port: number;
   user: string;
   password: string;
   database: string;
};

export type TDatabaseConfig = {
   client: string;
   connection: TDatabaseConnectionParams;
};