import create from "zustand";
import { IMember } from "../interfaces/Member.interface";
import { getRequest } from "../utils/AxiosInstance";

export interface MembersState {
    members: IMember[] | [],
    newMember: (member: IMember) => void;
    removeMember: (memberId: string) => void;
    fetchMembers: () => void;
    loading: boolean;
    error: any;
}

export const useMembersStore = create<MembersState>((set) => ({
    members: [],
    loading: false,
    error: null,
    newMember: (newMemberData: IMember) => set((state) => ({ members: [...state.members, newMemberData] })),
    removeMember: (memberId: string) => set((state) => ({ members: [...state.members.filter(member => member._id != memberId)] })),
    fetchMembers: async () => {
        set({ loading: true })
        getRequest<IMember[]>("/user/all")
            .then(({ data }: { data: IMember[] }) => {
                set({ loading: false, members: data });
            }).catch(error => {
                set({ loading: false, error })
            })
    },
}))