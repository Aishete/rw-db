import Breadcrumbs from "@/components/ui/otherUI/breadcrumbs";
// import { fetchCustomers } from '@/app/lib/data';
import { ProfileFormR } from "@/app/router/form/recruiterform";

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Recruiter", href: "/home/recruiter" },
          {
            label: "Add Recruiter",
            href: "/home/recruiter/create",
            active: true,
          },
        ]}
      />

      <ProfileFormR />
    </main>
  );
}
