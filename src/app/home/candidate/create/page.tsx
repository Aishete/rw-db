import Breadcrumbs from "@/components/ui/otherUI/breadcrumbs";
// import { fetchCustomers } from '@/app/lib/data';
import { ProfileForm } from "@/app/router/form/form";

export default async function Page() {
  // const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Candidate", href: "/home/candidate" },
          {
            label: "Add Candidate",
            href: "/home/candidate/create",
            active: true,
          },
        ]}
      />
      <ProfileForm />
    </main>
  );
}
