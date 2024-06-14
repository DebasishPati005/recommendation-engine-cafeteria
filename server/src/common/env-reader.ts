/* eslint-disable @typescript-eslint/no-explicit-any */
import dotenv from 'dotenv';
import { CONFIG_NAMES, ENV_DEFAULTS } from './constants';
import { TDatabaseConnectionParams } from './types';
import path from 'path';
import fs from 'fs';

class EnvironmentReader {
    private static instance: EnvironmentReader;
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

    public static getInstance(): EnvironmentReader {
        if (!EnvironmentReader.instance) {
            EnvironmentReader.instance = new EnvironmentReader();
        }
        return EnvironmentReader.instance;
    }

    public getConfig(key: string, defaultValue: any = undefined): any {
        return this.config[key] || defaultValue;
    }

    public getDatabaseConfig(): TDatabaseConnectionParams {
        return {
            host: this.getConfig(`${CONFIG_NAMES.DB_HOST}`, ''),
            port: parseInt(this.getConfig(`${CONFIG_NAMES.DB_PORT}`, 0)),
            user: this.getConfig(`${CONFIG_NAMES.DB_USER}`, ''),
            password: this.getConfig(`${CONFIG_NAMES.DB_PASSWORD}`, ''),
            database: this.getConfig(`${CONFIG_NAMES.DB_NAME}`, ''),
        };
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

const environment: EnvironmentReader = EnvironmentReader.getInstance();
export { environment };
