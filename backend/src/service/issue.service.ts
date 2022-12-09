import { IIssue } from "interfaces/issue.interface";
import IssueModel from "models/Issue.model";

export const fetchIssues = async (): Promise<Array<IIssue>> => {
    const issues: IIssue[] = await IssueModel.find();

    return issues;
}