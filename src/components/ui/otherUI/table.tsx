"use client";
import { UpdateCandidate } from "@/app/ui/buttons";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrashIcon } from "@heroicons/react/24/outline";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";
import firebase_app from "@/app/firebase/config";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
const db = getFirestore(firebase_app);
import { fetchCandidateData, fetchRecruiterData } from "@/app/router/Data/data";
import { toast } from "sonner";
import { FormValuesR } from "@/components/utils/action";
interface Candidate {
  id: string;
  referral: string;
  recuitercode: string;
  recuitername: string;
  candidatenameeng: string;
  candidatenamekh: string;
  phone: string;
  dateOfbirth: Date;
  gender: string;
  province: string;
  district: string;
  commune: string;
  village: string;
}

const CandidateTable: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    fetchCandidateData(setCandidates);
  }, []);
  // Run the effect only once on component mount
  function DeleteCandidate({ id }: { id: string }) {
    const handleDelete = async ({ id }: { id: string }) => {
      try {
        console.log("Deleting candidate with ID:", id);
        await deleteDoc(doc(db, "candidate", id));
        fetchCandidateData(setCandidates);
        toast("Deleted the Candidate");
        console.log("Candidate deleted successfully!");
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    };

    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="rounded-md border p-2 hover:bg-gray-100">
              <span className="sr-only">Delete</span>
              <TrashIcon className="w-5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Candidate data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="hover:bg-red-500"
                onClick={() => handleDelete({ id })}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div>
          <div>
            <Table>
              <TableCaption>A list of Candidate.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Referral</TableHead>
                  <TableHead>Recuiter Name</TableHead>
                  <TableHead>Recuiter Code</TableHead>
                  <TableHead>Candidate Name (ENG)</TableHead>
                  <TableHead>Candidate Name (KHM)</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Date of Birth</TableHead>
                  <TableHead>Gender</TableHead>
                  <TableHead>Province</TableHead>
                  <TableHead>District</TableHead>
                  <TableHead>Commune</TableHead>
                  <TableHead>Village</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {candidates.map((candidate) => (
                  <TableRow key={candidate.id}>
                    <TableCell>{candidate.referral}</TableCell>
                    <TableCell>{candidate.recuitername}</TableCell>
                    <TableCell>{candidate.recuitercode}</TableCell>
                    <TableCell>{candidate.candidatenameeng}</TableCell>
                    <TableCell>{candidate.candidatenamekh}</TableCell>
                    <TableCell>{candidate.phone}</TableCell>
                    <TableCell>
                      {candidate.dateOfbirth?.toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                      //{" "}
                    </TableCell>
                    <TableCell>{candidate.gender}</TableCell>
                    <TableCell>{candidate.province}</TableCell>
                    <TableCell>{candidate.district}</TableCell>
                    <TableCell>{candidate.commune}</TableCell>
                    <TableCell>{candidate.village}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        {/* <UpdateCandidate id={candidate.id} /> */}
                        <DeleteCandidate id={candidate.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

const RecruiterTable: React.FC = () => {
  const [recruiter, setrecruiter] = useState<FormValuesR[]>([]);

  useEffect(() => {
    fetchRecruiterData(setrecruiter);
  }, []);
  // Run the effect only once on component mount
  function DeleteCandidate({ id }: { id: string }) {
    const handleDelete = async ({ id }: { id: string }) => {
      try {
        console.log("Deleting candidate with ID:", id);
        await deleteDoc(doc(db, "candidate", id));
        fetchRecruiterData(setrecruiter);
        toast("Deleted the Candidate");
        console.log("Candidate deleted successfully!");
      } catch (error) {
        console.error("Error deleting candidate:", error);
      }
    };
    return (
      <>
        <AlertDialog>
          <AlertDialogTrigger>
            <button className="rounded-md border p-2 hover:bg-gray-100">
              <span className="sr-only">Delete</span>
              <TrashIcon className="w-5" />
            </button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                Candidate data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="hover:bg-red-500"
                onClick={() => handleDelete({ id })}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </>
    );
  }

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="md:hidden">
          {recruiter?.map((recruiter) => (
            <div
              key={recruiter.id}
              className="mb-2 w-full rounded-md bg-white p-4"
            >
              <div className="flex items-center justify-between border-b pb-4">
                <div>
                  <div className="mb-2 flex items-center">
                    <p>{recruiter.referral}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {recruiter.recuitername}
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  {recruiter.recuitercode}
                </p>
              </div>
              <div className="flex w-full items-center justify-between pt-4">
                <div className="flex justify-end gap-2">
                  <UpdateCandidate id={recruiter.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div>
            <Table className="hidden min-w-full text-gray-900 md:table">
              <TableCaption>A list of Candidate.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Referral</TableHead>
                  <TableHead>Recuiter Name</TableHead>
                  <TableHead>Recuiter Code</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recruiter.map((recruiter) => (
                  <TableRow key={recruiter.id}>
                    <TableCell>{recruiter.referral}</TableCell>
                    <TableCell>{recruiter.recuitername}</TableCell>
                    <TableCell>{recruiter.recuitercode}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <UpdateCandidate id={recruiter.id} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export { CandidateTable, RecruiterTable };
