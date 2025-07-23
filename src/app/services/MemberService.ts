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

   public async updateMember(input: MemberUpdateInput): Promise<Member> {
    try {
      const formData = new FormData();
     formData.append("memberNick", input.memberNick || "");
      formData.append("memberPhone", input.memberPhone || "");
      formData.append("memberAddress", input.memberAddress || "");
     formData.append("memberDesc", input.memberDesc || "")
     formData.append("memberImage", input.memberImage || "");

     const result = await axios(`${this.path}/member/update`, {
      method: "POST",
      data: formData,
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
     console.log("updateMember:", result);

      const member: Member = result.data;
       localStorage.setItem("memberData", JSON.stringify(member));
      return member;
   } catch (err) {
     console.log("Error, updateMember:", err);
     throw err;
   }
  }
}


export default MemberService;