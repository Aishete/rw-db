import { clsx } from "clsx";
import Link from "next/link";
import { lusitana } from "@/components/ui/fonts";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}

export default function Breadcrumbs({
  breadcrumbs,
}: {
  breadcrumbs: Breadcrumb[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol
        className={clsx(
          inter.className,
          "mb-4 text-xl md:text-2xl flex h-15 items-end justify-start rounded-md bg-black shadow-2xl p-4 md:h-15 text-white"
        )}
      >
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={clsx(breadcrumb.active ? "text-white" : "text-gray-400")}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
