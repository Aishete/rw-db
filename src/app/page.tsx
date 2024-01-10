"use client";

import AcmeLogo from "@/components/ui/rw_db_logo";
import PageSignIn from "./router/signin/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className=" items-end justify-end rounded-lg w-48 bg-black p-4 md:h-20 z-0 ">
        <AcmeLogo />
      </div>
      <div className="flex flex-col items-center justify-center p-6 my-36">
        <div className="flex flex-col items-center justify-center mt-8 z-10 ">
          <PageSignIn />
        </div>
      </div>
    </main>
  );
}
