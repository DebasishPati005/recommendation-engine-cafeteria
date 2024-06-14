import { PoolConnection } from 'mariadb';
import { LoginRequest } from '../common/types';
import crypto from 'crypto';
import { IUserModel } from '../models/user';

interface IAuthentication {
    login(authRequest: LoginRequest): Promise<string>;
}

export class Authentication implements IAuthentication {
    constructor(private dbPool: PoolConnection) {}

    async login(authRequest: LoginRequest): Promise<string> {
        try {
            const userData: IUserModel = await this.dbPool.query(
                `select * from User where email = ${authRequest.email};`
            );
            if (!userData) {
                const error = new Error('No user Exist with this email!');
                throw error;
            }
            if (this.validPassword(userData.hash, userData.salt)) {
                const error = new Error(
                    'No user Exist with this email and password!'
                );
                throw error;
            }
            return 'Successfully loggedIn';
        } catch (error) {
            throw error;
        }
    }

    generatePassword(password: string) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto
            .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
            .toString('hex');
        return hash;
    }

    validPassword(hashedPassword: string, salt: string): boolean {
        const hash = crypto
            .pbkdf2Sync(hashedPassword, salt, 1000, 64, 'sha512')
            .toString('hex');
        return hashedPassword === hash;
    }
}
