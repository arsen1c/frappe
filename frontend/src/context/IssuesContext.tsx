import create from "zustand";
import { IIssue } from "../interfaces/Issue.interface";
import { getRequest } from "../utils/AxiosInstance";

export interface IssueState {
    issues: IIssue[] | [],
    newIssue: (issue: IIssue) => void;
    removeIssue: (issueId: string) => void;
    fetchIssues: () => void;
    loading: boolean;
    error: any;
}

export const useIssueStore = create<IssueState>((set) => ({
    issues: [],
    loading: false,
    error: null,
    newIssue: (newIssueData: IIssue) => set((state) => ({ issues: [...state.issues, newIssueData] })),
    removeIssue: (issueId: string) => set((state) => ({ issues: [...state.issues.filter(issue => issue._id != issueId)] })),
    fetchIssues: async () => {
        set({ loading: true })
        getRequest<IIssue[]>("/issue/all")
            .then(({ data }: { data: IIssue[] }) => {
                set({ loading: false, issues: data });
            }).catch(error => {
                set({ loading: false, error })
            })
    },
}))