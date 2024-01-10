import { AddCanadidate } from "@/app/ui/buttons";
import Search from "@/components/ui/otherUI/search";
// import Table from "@/components/ui/otherUI/table";
import Pagination from "@/components/ui/otherUI/pagination";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchInvoicesPages(query);

  return (
    <main>
      <h1
        className={`mb-4 text-xl md:text-2xl flex h-15 items-end justify-start rounded-md bg-black shadow-2xl p-4 md:h-15 text-white`}
      >
        Candidate
      </h1>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <AddCanadidate />
      </div>
      {/* <Table query={query} currentPage={currentPage} /> */}
      <div className="mt-5 flex w-full justify-center">
        {/* <Pagination totalPages={totalPages} /> */}
      </div>
    </main>
  );
}
