"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const Breadcrumbs = () => {
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    const name = decodeURIComponent(segment).replace(/-/g, " ");

    return { name, href };
  });

  return (
    <div className="content">
      <div className="text-sm text-gray-400 space-x-2 mt-22 px-3 font-[ubuntu] first-letter:uppercase">
        <Link href="/" className="text-amber-500 hover:underline">
          home
        </Link>
        {breadcrumbs.map((crumb, index) => (
          <span key={crumb.href}>
            <span className="mx-1">/</span>
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-500 uppercase">{crumb.name}</span>
            ) : (
              <Link
                href={crumb.href}
                className="text-blue-500 first-letter:uppercase hover:underline capitalize"
              >
                {crumb.name}
              </Link>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};
