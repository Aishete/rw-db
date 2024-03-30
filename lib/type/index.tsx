export type AdminPer = {
  id: string;
  created_at: string;
  role: "Super-Admin" | "Admin";
  admin_id: string;
  Status: "active" | "resigned";
  admin: {
    id: string;
    email: string;
    name: string;
    updated_at: string;
  };
}[];

export type RecruiterPer = {
  id: string;
  created_at: string;
  role: "Recruiter";
  Status: "active" | "resigned";
  recruiter_id: string;
  recruiter: {
    id: string;
    email: string;
    created_at: string;
    recruiter_code: string;
    recruiter_name: string;
  };
};

export type CandidatePer = {
  id: string;
  created_at: string;
  referral: string;
  recruiterCID: string;
  candidatenameeng: string;
  candidatenamekh: string;
  phone: string;
  dateOfbirth: Date;
  gender: "Male" | "Female";
  province: string;
  district: string;
  commune: string;
  village: string;
  recruiter: {
    id: string;
    email: string;
    created_at: string;
    recruiter_code: string;
    recruiter_name: string;
  };
};
export type recruiter = {
  id: string;
  email: string;
  created_at: string;
  recruiter_code: string;
  recruiter_name: string;
};
export type user_metadata = {
  name: string;
  email: string;
  role: "Super-Admin" | "Admin" | "Recruiter";
};
