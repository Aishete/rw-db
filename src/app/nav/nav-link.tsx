"use client";
import {
  UserGroupIcon,
  HomeIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";
import { count } from "console";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  // { name: "Home", href: "/home", icon: HomeIcon },
  {
    name: "Candidate",
    href: "/home/candidate",
    icon: UserPlusIcon,
  },
  { name: "Recruiter", href: "/home/recruiter", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-black hover:text-white hover:shadow-2xl md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-gray-950 text-white shadow-2x1 ": pathname === link.href,
              }
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
