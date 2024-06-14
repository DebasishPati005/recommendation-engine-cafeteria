import { Server, Socket, createServer } from 'net';
import { LOGGING_MESSAGE } from '../../common/constants';

class SocketServer {
    private readonly server: Server;
    private readonly serverPort: number;

    constructor(port: number) {
        this.serverPort = port;
        this.server = this.createSocketServer();
    }

    private createSocketServer(): Server {
        return createServer((client: Socket) => {
            console.log(LOGGING_MESSAGE.clientConnected);
            console.log(LOGGING_MESSAGE.clientIP, client.remoteAddress);

            client.on('data', async (data) => {
                console.log(
                    LOGGING_MESSAGE.clientReceivedData,
                    data.toString()
                );
                // client.write('Hello from server');
                const serverResponse = await this.handleClientResponse(
                    data.toString()
                );
                client.write(serverResponse.toString());
            });

            client.on('end', () => {
                console.log(LOGGING_MESSAGE.clientDisconnected);
            });
        });
    }

    async handleClientResponse(dataResponse: string): Promise<string> {
        console.log({ dataJSon: JSON.parse(JSON.stringify(dataResponse)) });
        return 'Hello from Server' + dataResponse;
    }

    public startServer(): void {
        this.server.on('error', (err) => {
            console.error(LOGGING_MESSAGE.serverError, err);
            this.server.close(); // Close server on error
        });

        this.server.listen(this.serverPort, () => {
            console.log(`Server started on port ${this.serverPort}`);
        });
    }
}

export default SocketServer;
