"use client";
import Breadcrumbs from "@/components/ui/otherUI/breadcrumbs";
import { Candidate, fetchCandidateDataR } from "@/app/router/Data/data";
import { ProfileEditForm } from "@/app/router/form/editform";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function EditCandidatePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [candidate, setCandidate] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCandidateDataR(id, setCandidate);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
        // Handle error (e.g., redirect to an error page)
      }
    };

    fetchData();
  }, [id]);

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Candidate", href: "/home/candidate" },
          {
            label: "Edit Candidate",
            href: `/home/candidate/${id}/edit`,
            active: true,
          },
        ]}
      />
      <ProfileEditForm candidate={candidate} />
    </main>
  );
}
