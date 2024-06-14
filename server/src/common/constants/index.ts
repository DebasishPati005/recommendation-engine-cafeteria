export const ENV_NAMES = {};

export const ENV_DEFAULTS = {
    TIME_ZONE: 'Asia/Kolkata',
};

export const CONFIG_NAMES = {
    ENVIRONMENT: 'development',
    TIME_ZONE: 'Asia/Kolkata',

    DB_CLIENT: 'db-client',
    DB_HOST: 'db-host',
    DB_PORT: 'db-port',
    DB_USER: 'db-user',
    DB_PASSWORD: 'db-password',
    DB_NAME: 'db-name',
    SERVER: 'server',
    SERVER_PORT: 'server-port',
};

export const LOGGING_MESSAGE = {
    connectionSqlDB: 'Connecting to Sql Database',
    sqlDBConnectionSuccessful: 'Connected to Sql Database. Successfully!!!',
    errorInDBConnection: 'Error acquiring database connection:',
    errorInReleaseConnection: 'Error releasing database connection:',
    clientConnected: 'Client connected',
    clientIP: 'Client IP Address:',
    clientReceivedData: 'Client Received data:',
    clientDisconnected: 'Client disconnected',
    serverError: 'Server error:',
};
