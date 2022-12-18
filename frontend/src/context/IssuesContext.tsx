import create from "zustand";
import { IIssue } from "../interfaces/Issue.interface";
import { getRequest } from "../utils/AxiosInstance";

export interface IssueState {
    issues: IIssue[] | [],
    newIssue: (issue: IIssue[]) => void;
    removeIssue: (issueId: string, userId: string) => void;
    fetchIssues: () => void;
}

export const useIssueStore = create<IssueState>((set) => ({
    issues: [],
    newIssue: (newIssueData: IIssue[]) => set((state) => ({ issues: [...newIssueData, ...state.issues] })),
    removeIssue: (userId, issueId) => set((state) => ({ issues: [...state.issues.filter(issue => issue._id != issueId)] })),
    fetchIssues: async () => {
        // const { data } = await getRequest("/issue/al");
        // if (!data) throw new Error("Couldn't fetch")

        // set({ issues: data })
        getRequest("/issue/all")
            .then(({ data }: { data: IIssue[] }) => {
                set({ issues: data })
            }).catch(error => {
                throw new Error(error.message)
            })
    }
}))