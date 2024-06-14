/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { CONFIG_NAMES, ENV_DEFAULTS } from './constants';
import path from 'path';
import fs from 'fs';

class Environment {
    private static instance: Environment;
    private config: { [key: string]: string };
    private rootDirectory!: string;
    private envFilePath: string;

    private constructor() {
        this.initializeProjectRoot();

        this.envFilePath = fs.existsSync(this.getRootDirectoryPath('.env.dev'))
            ? this.getRootDirectoryPath('.env.dev')
            : this.getRootDirectoryPath('.env');

        dotenv.config({ path: this.envFilePath });

        this.config = process.env as { [key: string]: string };
    }

    public static getInstance(): Environment {
        if (!Environment.instance) {
            Environment.instance = new Environment();
        }
        return Environment.instance;
    }

    public getConfig(key: string, defaultValue: any = undefined): any {
        return this.config[key] || defaultValue;
    }

    public getRootDirectoryPath(...appendPathList: string[]): string {
        return path.join(this.rootDirectory, ...appendPathList);
    }

    public getDownloadDirectoryPath(filename = ''): string {
        return this.getRootDirectoryPath('public', 'downloads', filename);
    }

    public getLogsDirectoryPath(filename = ''): string {
        return this.getRootDirectoryPath('public', 'logs', filename);
    }

    public getDefaultTimezone(): string {
        return this.getConfig(CONFIG_NAMES.TIME_ZONE, ENV_DEFAULTS.TIME_ZONE);
    }

    private initializeProjectRoot(): void {
        let cd: string = process.cwd();

        if (cd.indexOf('src') > 0) {
            cd = cd.substring(0, cd.indexOf('src'));
        }
        this.rootDirectory = cd;
    }
}

const environment: Environment = Environment.getInstance();
export { environment };
