export interface IConnectDatabase<T> {
    getConnection(): Promise<T>
}
