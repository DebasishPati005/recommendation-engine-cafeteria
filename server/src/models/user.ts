export interface IUserModel {
    name: string;
    email: string;
    password: string;
    hash: string;
    salt: string;
    role: RoleModel;
}

export enum RoleModel {
    'ADMIN',
    'USER',
    'CHEf',
}
