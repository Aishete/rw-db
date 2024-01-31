import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

import firebase_app from "@/app/firebase/config";
import { doc, deleteDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(firebase_app);
export function AddCanadidate() {
  return (
    <Link
      href="/home/candidate/create"
      className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white shadow-2xl border-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white "
    >
      <span className="hidden md:block">Add Candidate</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}
export function AddRecuriter() {
  return (
    <Link
      href="/home/recruiter/create"
      className="flex h-10 items-center rounded-lg bg-white px-4 text-sm font-medium text-black transition-colors hover:bg-black hover:text-white shadow-2xl border-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white "
    >
      <span className="hidden md:block">Add Recuriter</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateCandidate({ id }: { id: string }) {
  return (
    <Link
      href="/home/candidate/$[id]/edit"
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}
