export interface IUser {
    _id: string;
    name: string;
    username: string;
    booksIssued?: (string)[] | null;
    debt: number;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
