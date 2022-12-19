export interface IUser {
    _id: string;
    name: string;
    username: string;
    booksIssued?: (number)[];
    debt: number;
    isAdmin: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
