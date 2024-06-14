import { NetConnectOpts, Socket, connect } from 'net';
import ioInstance from './src/core/io-handler';
import { environment } from './src/common/env-reader';
import { CONFIG_NAMES } from './src/common/constants';

const serverPort = environment.getConfig(CONFIG_NAMES.SERVER_PORT) || 9099; // Use environment variable or default port
const server = environment.getConfig(CONFIG_NAMES.SERVER_PORT) || 'localhost'; // Use environment variable or default host

// async function getInput(message: string): Promise<string> {
//     const rl = readline.createInterface({
//         input: process.stdin,
//         output: process.stdout,
//     });

//     return new Promise<string>((resolve) => {
//         rl.question(message, (data) => {
//             console.table({ data: data });
//             resolve(data);
//             rl.close(); // Close readline after each input
//         });
//     });
// }

// function combineMessages(messages: string[]): string {
//     const combinedData: { [key: string]: string } = {};
//     for (const message of messages) {
//         try {
//             const [key, value] = message.trim().split('=', 1); // Split on '=' with limit of 1
//             combinedData[key.trim()] = value.trim(); // Trim both key and value
//         } catch (err) {
//             console.warn(`Error parsing message: ${message}`, err);
//             // Handle parsing errors gracefully (e.g., ignore the message or log it)
//         }
//     }
//     return JSON.stringify(combinedData); // Convert object to JSON string
// }

async function sendMessageBatch(client: Socket, messages: string[]) {
    if (client.writable) {
        // const combinedMessage = combineMessages(messages);
        client.write(`${messages}\n`);
    } else {
        console.error('Client not writable. Could not send data.');
    }
}

async function main() {
    const client: Socket = connect(
        { server, port: serverPort } as NetConnectOpts,
        () => {
            console.log('Client connected');
        }
    );

    let messageQueue: string[] = [];

    while (true) {
        try {
            const message = await ioInstance.getInput(
                'Enter your message for the server: '
            );

            if (message === 'send') {
                await sendMessageBatch(client, messageQueue);
                messageQueue = []; // Reset queue for next batch
            }
            if (message) {
                messageQueue.push(message);
            }
        } catch (err) {
            console.error('Error getting user input:', err);
            break;
        }
    }

    client.on('data', (data) => {
        console.log('Received data from server:', data.toString());
    });

    client.on('error', (err) => {
        console.error('Client error:', err);
    });

    client.on('end', () => {
        console.log('Client disconnected');
    });
}

main();
