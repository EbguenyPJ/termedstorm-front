"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { displayNames } from "./Names";

export const Breadcrumb = () => {
  const pathname = usePathname();

  const segments = pathname
    .split("/")
    .filter(Boolean)
    .map((seg) => decodeURIComponent(seg));

  const breadcrumbs = segments.map((seg, index) => {
    const href = "/" + segments.slice(0, index + 1).join("/");
    const isLast = index === segments.length - 1;
    const isNonLink = seg === "add" && "settings-manager" && "shop" && "user";

    return (
      <li key={`${index}-${href}`} className="flex items-center gap-1">
        {index > 0 && <span className="text-gray-400">/</span>}
        {isNonLink ? (
          <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
            {displayNames[seg] ?? seg.replace(/-/g, " ")}
          </span>
        ) : (
          <Link
            href={href}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              isLast
                ? "bg-indigo-200 text-indigo-800"
                : "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
            }`}
          >
            {displayNames[seg] ?? seg.replace(/-/g, " ")}
          </Link>
        )}
      </li>
    );
  });

  return (
    <nav className="mb-6" aria-label="Breadcrumb text-uppercase">
      <ol className="flex flex-wrap items-center space-x-1">{breadcrumbs}</ol>
    </nav>
  );
};

// "use client";

// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { displayNames } from "./Names"

// export const Breadcrumb = () => {
//   const pathname = usePathname();

//   const segments = pathname
//     .split("/")
//     .filter(Boolean) // saca los vacíos
//     .map((seg) => decodeURIComponent(seg)); // decodifica %20, etc.

//   const breadcrumbs = segments.map((seg, index) => {
//     const href = "/" + segments.slice(0, index + 1).join("/");

//     return (
//       <li key={href} className="inline-flex items-center gap-1">
//         {index !== 0 && <span>/</span>}
//         <Link
//           href={href}
//           className="text-secondary font-semibold hover:underline capitalize"
//         >
//           {displayNames[seg] ?? seg.replace(/-/g, " ")}
//         </Link>
//       </li>
//     );
//   });

//   return (
//     <nav className="text-sm text-gray-600 mb-4" aria-label="Breadcrumb">
//       <ol className="flex flex-wrap items-center">
//         <li className="inline-flex items-center gap-1">
//           <Link href="/" className="text-primary mr-2 hover:underline">
//             Inicio /
//           </Link>
//         </li>
//         {breadcrumbs}
//       </ol>
//     </nav>
//   );
// };
