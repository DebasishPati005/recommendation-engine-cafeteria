import SocketServer from './src/core/socket-server';
import dbConn from './src/core/database/connection';
import { LOGGING_MESSAGE, CONFIG_NAMES } from './src/common/constants';
import { environment } from './src/common/env-reader';

async function main() {
    try {
        await dbConn.getConnection();
        const server = new SocketServer(
            environment.getConfig(CONFIG_NAMES.SERVER_PORT, 9099)
        );
        server.startServer();
    } catch (error) {
        console.log(LOGGING_MESSAGE.serverError, { error });
    }
}

main();
