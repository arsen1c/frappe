/* User Interface */
export interface IUserInput {
    name: string;
    username: string;
    password: string;
}
export interface IUserUpdate {
    _id: string;
    name: string;
    username: string;
    isAdmin: boolean;
    debt: number;
}