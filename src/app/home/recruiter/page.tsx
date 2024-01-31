import { AddRecuriter } from "@/app/ui/buttons";
import Search from "@/components/ui/otherUI/search";
// import Table from "@/components/ui/otherUI/table";
import Pagination from "@/components/ui/otherUI/pagination";
import { RecruiterTable } from "@/components/ui/otherUI/table";
import { collection, getDocs, getFirestore } from "firebase/firestore";

export default async function page() {
  return (
    <main>
      <h1
        className={`mb-4 text-xl md:text-2xl flex h-15 items-end justify-start rounded-md bg-black shadow-2xl p-4 md:h-15 text-white`}
      >
        Recruiter
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search Recruiter ..." />
        <AddRecuriter />
      </div>
      <RecruiterTable />
      {/* <Table query={query} currentPage={currentPage} /> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </main>
  );
}
