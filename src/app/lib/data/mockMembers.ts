import { Member } from "../types/member";
import { MemberStatus, MemberType } from "../enums/member.enum";

export const mockFounder: Member = {
  _id: "founder1",
  memberType: MemberType.FOUNDER,
  memberStatus: MemberStatus.ACTIVE,
  memberNick: "Future Furniture",
  memberEmail: "info@futurefurniture.com",
  memberPhone: "+1 (555) 123-4567",
  memberDesc: "Premium furniture store specializing in modern and contemporary designs.",
  memberAddress: "123 Furniture Street, Design District, NY 10001",
  memberImage: "/icons/furniture-logo-design-vector-26988909.jpg",
  memberPoints: 0,
  createAt: new Date("2023-01-01"),
  updatedAt: new Date()
};

export const mockTopUsers: Member[] = [
  {
    _id: "user1",
    memberType: MemberType.USER,
    memberStatus: MemberStatus.ACTIVE,
    memberNick: "John Smith",
    memberEmail: "john.smith@email.com",
    memberPhone: "+1 (555) 234-5678",
    memberDesc: "Furniture enthusiast and interior designer",
    memberAddress: "456 Design Ave, Style City, CA 90210",
    memberImage: "/img/Cowboy.webp",
    memberPoints: 1250,
    createAt: new Date("2023-02-15"),
    updatedAt: new Date()
  },
  {
    _id: "user2",
    memberType: MemberType.USER,
    memberStatus: MemberStatus.ACTIVE,
    memberNick: "Sarah Johnson",
    memberEmail: "sarah.johnson@email.com",
    memberPhone: "+1 (555) 345-6789",
    memberDesc: "Home decorator and lifestyle blogger",
    memberAddress: "789 Comfort Lane, Cozy Town, TX 75001",
    memberImage: "/img/scarlet.webp",
    memberPoints: 980,
    createAt: new Date("2023-03-20"),
    updatedAt: new Date()
  },
  {
    _id: "user3",
    memberType: MemberType.USER,
    memberStatus: MemberStatus.ACTIVE,
    memberNick: "Michael Brown",
    memberEmail: "michael.brown@email.com",
    memberPhone: "+1 (555) 456-7890",
    memberDesc: "Architecture student and furniture collector",
    memberAddress: "321 Modern St, Minimalist City, WA 98101",
    memberImage: "/img/Adele.webp",
    memberPoints: 750,
    createAt: new Date("2023-04-10"),
    updatedAt: new Date()
  },
  {
    _id: "user4",
    memberType: MemberType.USER,
    memberStatus: MemberStatus.ACTIVE,
    memberNick: "Emily Davis",
    memberEmail: "emily.davis@email.com",
    memberPhone: "+1 (555) 567-8901",
    memberDesc: "Interior design consultant",
    memberAddress: "654 Elegant Blvd, Luxury Heights, FL 33101",
    memberImage: "/img/Jameson.webp",
    memberPoints: 1100,
    createAt: new Date("2023-05-05"),
    updatedAt: new Date()
  }
]; 