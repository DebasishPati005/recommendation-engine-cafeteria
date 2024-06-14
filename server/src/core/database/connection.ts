import mariadb, { Pool, PoolConnection } from 'mariadb';
import { IConnectDatabase } from './connection.contract';
import { LOGGING_MESSAGE } from '../../common/constants';
import { TDatabaseConnectionParams } from '../../common/types';
import { environment } from '../../common/env-reader';

class SqlConnection implements IConnectDatabase<PoolConnection> {
    private static instance: SqlConnection;
    private pool: Pool;
    private poolConnection?: PoolConnection;
    private connectionParams: TDatabaseConnectionParams =
        environment.getDatabaseConfig();

    private constructor() {
        this.pool = mariadb.createPool(this.connectionParams);
    }

    static getInstance(): SqlConnection {
        if (!SqlConnection.instance) {
            SqlConnection.instance = new SqlConnection();
        }
        return SqlConnection.instance;
    }

    async getConnection(): Promise<PoolConnection> {
        try {
            if (this.poolConnection) {
                return this.poolConnection;
            }
            console.log(LOGGING_MESSAGE.connectionSqlDB);
            this.poolConnection = await this.pool.getConnection();
            console.log(LOGGING_MESSAGE.sqlDBConnectionSuccessful);
            return this.poolConnection;
        } catch (error) {
            console.error(LOGGING_MESSAGE.errorInDBConnection, error);
            throw error;
        }
    }

    async releaseConnection(connection: PoolConnection): Promise<void> {
        try {
            await connection.end();
        } catch (error) {
            console.error(LOGGING_MESSAGE.errorInReleaseConnection, error);
        }
    }
}

export default SqlConnection.getInstance();
