export class HttpErrorException extends Error {
    public status: number;
    public message: string;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.message = message;
    }

    /* Custom Error messages */

    static unAuthorized(msg: string) {
        return new HttpErrorException(401, msg);
    }

    static booksAlreaydImported() {
        return new HttpErrorException(409, "Books already imported");
    }
}