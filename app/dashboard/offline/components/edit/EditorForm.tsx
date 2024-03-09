import CreateForm, { UpdateCreateFormAdmin } from "./upCandidateform";

import { CandidatePer, RecruiterPer } from "@/lib/type";
import { role } from "../../actions";
import { useEffect, useState } from "react";
export default function EditForm({
  Candidates,
  fetchData,
}: {
  Candidates: CandidatePer;
  fetchData: () => void;
}) {
  const [isAdmin, setIsAdmin] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    const fetchUserRole = async () => {
      const userIsAdmin = await role();
      setIsAdmin(userIsAdmin);
    };

    fetchUserRole();
  }, []);
  return (
    <div>
      {isAdmin && <CreateForm Candidates={Candidates} fetchData={fetchData} />}
      {!isAdmin && (
        <UpdateCreateFormAdmin Candidates={Candidates} fetchData={fetchData} />
      )}
    </div>
  );
}
