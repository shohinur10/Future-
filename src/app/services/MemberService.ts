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
      const url = this.path + "/member/signup";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("signup:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, signup:", err);
      throw err;
    }
  }

  public async login(input: LoginInput): Promise<Member> {
    try {
      const url = this.path + "/member/login";
      const result = await axios.post(url, input, { withCredentials: true });
      console.log("login:", result);

      const member: Member = result.data.member;
      console.log("member:", member);
      localStorage.setItem("memberData", JSON.stringify(member));

      return member;
    } catch (err) {
      console.log("Error, login:", err);
      throw err;
    }
  }

  public async logout(): Promise<void> {
    try {
      const url = this.path + "/member/logout";
      const result = await axios.post(url, {}, { withCredentials: true });
      console.log("logout:", result);

      localStorage.removeItem("memberData");
    } catch (err) {
      console.log("Error, logout:", err);
      throw err;
    }
  }

  // Update profile image only
  public async updateMemberImage(imageFormData: FormData): Promise<Member> {
    try {
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
    } catch (err: any) {
      console.log("Error, updateMemberImage:", err);
      if (err.response) {
        console.log("Server error details:", err.response.data);
        console.log("Server status:", err.response.status);
      }
      throw err;
    }
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
      const url = this.path + "/member/update";
      const result = await axios.post(url, input, { withCredentials: true });
      
      console.log("updateMember:", result);
      const member: Member = result.data;
      localStorage.setItem("memberData", JSON.stringify(member));
      return member;
    } catch (err) {
      console.log("Error, updateMember:", err);
      throw err;
    }
  }

  // Legacy method for backward compatibility
  public async updateMemberLegacy(input: MemberUpdateInput): Promise<Member> {
    try {
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
    } catch (err) {
      console.log("Error, updateMemberLegacy:", err);
      throw err;
    }
  }
}

export default MemberService;