import { NextFunction, Request, Response } from "express";
import { IIssue } from "interfaces/issue.interface";
import { fetchIssues } from "service/issue.service";

export const issueController = {
    async getIssues(req: Request, res: Response, next: NextFunction) {
        try {
            const issues: IIssue[] = await fetchIssues();
            res.status(200).json(issues);
        } catch (error: any) {
            next(error);
        }
    }
}