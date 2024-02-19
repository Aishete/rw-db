"use client";

import React, { useState, useEffect } from "react";
import MemberTable from "./components/TodoTable";
import SearchTodo from "./components/SearchTodo";
import CreateCandidatePH, { CreateCandidateDT } from "./components/CreateTodo";

function CreateC() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  if (windowWidth < 768) {
    return <>{CreateCandidatePH()}</>;
  } else {
    return <>{CreateCandidateDT()}</>;
  }
}

export default function Todo() {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Candidate</h1>
      <div className="flex gap-2">
        <SearchTodo />
        <CreateC />
      </div>
      <MemberTable />
    </div>
  );
}
