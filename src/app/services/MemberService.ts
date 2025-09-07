import axios from "axios";
import { serverApi } from "../lib/config";
import {LoginInput, Member, MemberInput, MemberUpdateInput} from "../lib/types/member";
import { mockFounder, mockTopUsers } from "../lib/data/mockMembers";

class MemberService {
	static logoutMember() {
		throw new Error("Method not implemented.");
	}
  private readonly path: string;
  private useMockData: boolean = false;

  constructor() {
    this.path = serverApi;
  }

  public async getTopUsers(): Promise<Member[]> {
    try {
      // Try API first
      if (!this.useMockData) {
      const url = this.path + "/member/top-users";
      const result = await axios.get(url);
      console.log("getTopUsers:", result);
      return result.data;
      }
    } catch (err) {
      console.log("API not available, using mock data for top users:", err);
      this.useMockData = true;
    }

    // Use mock data
    console.log("Using mock data for top users");
    return mockTopUsers;
  }

  public async getFounder(): Promise<Member> {
    try {
      // Try API first
      if (!this.useMockData) {
      const url = this.path + "/member/founder";
      const result = await axios.get(url);
      console.log("getFounder:", result);
      const founder: Member = result.data;
      return founder;
      }
    } catch (err) {
      console.log("API not available, using mock data for founder:", err);
      this.useMockData = true;
    }

    // Use mock data
    console.log("Using mock data for founder");
    return mockFounder;
  }

  public async signup(input: MemberInput): Promise<Member> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = this.path + "/member/signup";
        const result = await axios.post(url, input, { withCredentials: true });
        console.log("signup:", result);

        const member: Member = result.data.member;
        console.log("member:", member);
        localStorage.setItem("memberData", JSON.stringify(member));

        return member;
      }
    } catch (err) {
      console.log("API not available, using mock data for signup:", err);
      this.useMockData = true;
    }

    // Use mock data for signup
    console.log("Using mock data for signup");
    const mockMember: Member = {
      _id: `user_${Date.now()}`,
      memberType: input.memberType || "USER" as any,
      memberStatus: "ACTIVE" as any,
      memberNick: input.memberNick || "New User",
      memberEmail: input.memberEmail || "newuser@example.com",
      memberPhone: input.memberPhone || "",
      memberDesc: input.memberDesc || "",
      memberAddress: input.memberAddress || "",
      memberImage: "/icons/default-user.svg",
      memberPoints: 0,
      createAt: new Date(),
      updatedAt: new Date()
    };
    
    localStorage.setItem("memberData", JSON.stringify(mockMember));
    return mockMember;
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = this.path + "/member/login";
        const result = await axios.post(url, input, { withCredentials: true });
        console.log("login:", result);

        const member: Member = result.data.member;
        console.log("member:", member);
        localStorage.setItem("memberData", JSON.stringify(member));

        return member;
      }
    } catch (err) {
      console.log("API not available, using mock data for login:", err);
      this.useMockData = true;
    }

    // Use mock data for login
    console.log("Using mock data for login");
    const mockMember: Member = {
      _id: "mock_user_1",
      memberType: "USER" as any,
      memberStatus: "ACTIVE" as any,
      memberNick: input.memberNick || "Demo User",
      memberEmail: input.memberEmail || "demo@example.com",
      memberPhone: "+1 (555) 123-4567",
      memberDesc: "Demo user for testing purposes",
      memberAddress: "123 Demo Street, Test City, TC 12345",
      memberImage: "/icons/default-user.svg",
      memberPoints: 500,
      createAt: new Date("2023-01-01"),
      updatedAt: new Date()
    };
    
    localStorage.setItem("memberData", JSON.stringify(mockMember));
    return mockMember;
  }

  public async logout(): Promise<void> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = this.path + "/member/logout";
        const result = await axios.post(url, {}, { withCredentials: true });
        console.log("logout:", result);
      }
    } catch (err) {
      console.log("API not available, using mock data for logout:", err);
      this.useMockData = true;
    }

    // Always remove local data regardless of API availability
    localStorage.removeItem("memberData");
    console.log("User logged out successfully (mock mode)");
  }

  // Update profile image only
  public async updateMemberImage(imageFormData: FormData): Promise<Member> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = this.path + "/member/update-image";
        console.log("Uploading to:", url);
        console.log("FormData with image file ready for upload");
        
        const result = await axios.post(url, imageFormData, {
          withCredentials: true,
          // Don't set Content-Type header - let browser set it automatically for FormData
          // This ensures proper boundary is set for multipart/form-data
        });
        
        console.log("updateMemberImage success:", result);
        const member: Member = result.data;
        localStorage.setItem("memberData", JSON.stringify(member));
        return member;
      }
    } catch (err: any) {
      console.log("API not available, using mock data for updateMemberImage:", err);
      this.useMockData = true;
    }

    // Use mock data for image update
    console.log("Using mock data for updateMemberImage");
    const existingMemberData = localStorage.getItem("memberData");
    let member: Member;
    
    if (existingMemberData) {
      member = JSON.parse(existingMemberData);
      member.memberImage = "/icons/default-user.svg"; // Mock image update
      member.updatedAt = new Date();
    } else {
      // Create a new mock member if none exists
      member = {
        _id: "mock_user_1",
        memberType: "USER" as any,
        memberStatus: "ACTIVE" as any,
        memberNick: "Demo User",
        memberEmail: "demo@example.com",
        memberPhone: "+1 (555) 123-4567",
        memberDesc: "Demo user for testing purposes",
        memberAddress: "123 Demo Street, Test City, TC 12345",
        memberImage: "/icons/default-user.svg",
        memberPoints: 500,
        createAt: new Date("2023-01-01"),
        updatedAt: new Date()
      };
    }
    
    localStorage.setItem("memberData", JSON.stringify(member));
    return member;
  }

  // Update member profile information
  public async updateMember(input: {
    memberNick?: string;
    memberEmail?: string;
    memberPhone?: string;
    memberAddress?: string;
    memberDesc?: string;
  }): Promise<Member> {
    try {
      // Try API first
      if (!this.useMockData) {
        const url = this.path + "/member/update";
        const result = await axios.post(url, input, { withCredentials: true });
        
        console.log("updateMember:", result);
        const member: Member = result.data;
        localStorage.setItem("memberData", JSON.stringify(member));
        return member;
      }
    } catch (err) {
      console.log("API not available, using mock data for updateMember:", err);
      this.useMockData = true;
    }

    // Use mock data for member update
    console.log("Using mock data for updateMember");
    const existingMemberData = localStorage.getItem("memberData");
    let member: Member;
    
    if (existingMemberData) {
      member = JSON.parse(existingMemberData);
      // Update fields with provided input
      if (input.memberNick) member.memberNick = input.memberNick;
      if (input.memberEmail) member.memberEmail = input.memberEmail;
      if (input.memberPhone) member.memberPhone = input.memberPhone;
      if (input.memberAddress) member.memberAddress = input.memberAddress;
      if (input.memberDesc) member.memberDesc = input.memberDesc;
      member.updatedAt = new Date();
    } else {
      // Create a new mock member if none exists
      member = {
        _id: "mock_user_1",
        memberType: "USER" as any,
        memberStatus: "ACTIVE" as any,
        memberNick: input.memberNick || "Demo User",
        memberEmail: input.memberEmail || "demo@example.com",
        memberPhone: input.memberPhone || "+1 (555) 123-4567",
        memberDesc: input.memberDesc || "Demo user for testing purposes",
        memberAddress: input.memberAddress || "123 Demo Street, Test City, TC 12345",
        memberImage: "/icons/default-user.svg",
        memberPoints: 500,
        createAt: new Date("2023-01-01"),
        updatedAt: new Date()
      };
    }
    
    localStorage.setItem("memberData", JSON.stringify(member));
    return member;
  }

  // Legacy method for backward compatibility
  public async updateMemberLegacy(input: MemberUpdateInput): Promise<Member> {
    try {
      // Try API first
      if (!this.useMockData) {
        const formData = new FormData();
        formData.append("memberNick", input.memberNick || "");
        formData.append("memberPhone", input.memberPhone || "");
        formData.append("memberAddress", input.memberAddress || "");
        formData.append("memberDesc", input.memberDesc || "");
        formData.append("memberImage", input.memberImage || "");

        const result = await axios(`${this.path}/member/update`, {
          method: "POST",
          data: formData,
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        console.log("updateMemberLegacy:", result);
        const member: Member = result.data;
        localStorage.setItem("memberData", JSON.stringify(member));
        return member;
      }
    } catch (err) {
      console.log("API not available, using mock data for updateMemberLegacy:", err);
      this.useMockData = true;
    }

    // Use mock data for legacy update
    console.log("Using mock data for updateMemberLegacy");
    const existingMemberData = localStorage.getItem("memberData");
    let member: Member;
    
    if (existingMemberData) {
      member = JSON.parse(existingMemberData);
      // Update fields with provided input
      if (input.memberNick) member.memberNick = input.memberNick;
      if (input.memberPhone) member.memberPhone = input.memberPhone;
      if (input.memberAddress) member.memberAddress = input.memberAddress;
      if (input.memberDesc) member.memberDesc = input.memberDesc;
      if (input.memberImage) member.memberImage = input.memberImage;
      member.updatedAt = new Date();
    } else {
      // Create a new mock member if none exists
      member = {
        _id: "mock_user_1",
        memberType: "USER" as any,
        memberStatus: "ACTIVE" as any,
        memberNick: input.memberNick || "Demo User",
        memberEmail: "demo@example.com",
        memberPhone: input.memberPhone || "+1 (555) 123-4567",
        memberDesc: input.memberDesc || "Demo user for testing purposes",
        memberAddress: input.memberAddress || "123 Demo Street, Test City, TC 12345",
        memberImage: input.memberImage || "/icons/default-user.svg",
        memberPoints: 500,
        createAt: new Date("2023-01-01"),
        updatedAt: new Date()
      };
    }
    
    localStorage.setItem("memberData", JSON.stringify(member));
    return member;
  }
}

export default MemberService;