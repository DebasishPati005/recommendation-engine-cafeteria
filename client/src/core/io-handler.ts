import readline from 'readline';

class IOHandler {
    private readonly reader: readline.Interface;
    private static ioHandler: IOHandler;

    private constructor() {
        this.reader = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });
    }

    static getInstance(): IOHandler {
        if (this.ioHandler) {
            return this.ioHandler;
        }
        return new IOHandler();
    }

    async getInput(message: string): Promise<string> {
        console.log(message);
        return new Promise<string>((resolve) => {
            this.reader.question(message, (data) => {
                resolve(data.trim());
            });
        });
    }

    showOutput(message: string): void {
        console.log(message);
    }

    closeReader() {
        this.reader.close();
    }
}

const ioInstance = IOHandler.getInstance();
export default ioInstance;
