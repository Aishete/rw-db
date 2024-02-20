export type AdminPer = {
  id: string;
  created_at: string;
  role: "Super-Admin" | "Admin";
  admin_id: string;
  Status: "active" | "resigned";
  admin: {
    id: string;
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
    created_at: string;
    recruiter_code: string;
    recruiter_name: string;
  };
}[];
