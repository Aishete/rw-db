"use client";
import Candidate from "./candidate";
import { Helmet } from "react-helmet";
<Helmet>
  <meta
    name="viewport"
    content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover"
  />
</Helmet>;
export default function page() {
  return (
    <div className="space-y-5 w-full overflow-y-auto px-3">
      <h1 className="text-3xl font-bold">Candidate</h1>
      <Candidate />
    </div>
  );
}
