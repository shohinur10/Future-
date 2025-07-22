import { MemberStatus, MemberType } from "../enums/member.enum";

export interface Member {
    _id: string;
        memberType: MemberType; // Optional
        memberStatus: MemberStatus; // Optional
        memberNick: string; // Required
        memberEmail?: string; // Optional - for email support
        memberPhone: string; // Required
        memberPassword?: string; // Required
        memberDesc?: string; // Optional
        memberAddress?: string; // Optional
        memberImage?: string; // Optional
        memberPoints: number; // Optional
        createAt: Date; // Required
        updatedAt: Date; // Optional (corrected from 'updete')
    } 
export interface MemberInput {
    memberType?: MemberType; // Optional
    memberStatus?: MemberStatus; // Optional
    memberNick: string; // Required
    memberEmail?: string; // Optional - for email support
    memberPhone: string; // Required
    memberPassword: string; // Required
    memberDesc?: string; // Optional
    memberAddress?: string; // Optional
    memberImage?: string; // Optional
    memberPoints?: number; // Optional
}

export interface LoginInput {
    memberNick?: string; // Optional - can login with username OR email
    memberEmail?: string; // Optional - can login with username OR email
    memberPassword: string; // Required
}
export interface MemberUpdateInput {
        memberNick?: string; // Required
        memberEmail?: string; // Optional - for email support
        memberPhone?: string; // Required
        memberPassword?: string; // Required
        memberDesc?: string; // Optional
        memberAddress?: string; // Optional
        memberImage?: string; // Optional
        memberPoints?: number; // Optional
}