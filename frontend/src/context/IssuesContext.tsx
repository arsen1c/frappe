import create from "zustand";
import IIssue from "../interfaces/Issue.interface";

export interface IssueState {
    issues: IIssue[] | [],
    newIssue: (issue: IIssue[]) => void;
}

export const useIssueStore = create<IssueState>((set) => ({
    issues: [],
    newIssue: (newIssueData: IIssue[]) => set((state) => ({ issues: [...newIssueData, ...state.issues,] }))
}))