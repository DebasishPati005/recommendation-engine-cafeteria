export type TDatabaseConnectionParams = {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
};

export interface ClientResponse {
    currentRoute: ClientRoutes;
    responseData: unknown;
}

type ClientRoutes = 'auth' | 'user' | 'chef' | 'admin';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface userResponse {
    email: string;
    password: string;
}
