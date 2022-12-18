import create from "zustand";
import IIssue from "../interfaces/Issue.interface";

export const useIssueStore = create((set) => ({
    issues: [],
    newIssue: (newIssueData: IIssue) => set((state: any) => ({ issues: [newIssueData, ...state.issues,] }))
}))