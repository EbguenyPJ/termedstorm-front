// import { ICard } from "@/interfaces";
import React from "react";
import CategoryList from "./components/CategoryList";

// const categories: ICard[] = [
//   {
//     name: "ZAPATILLAS",
//     image: "/zapatilla.jpg",
//   },
//   {
//     name: "BOTAS",
//     image: "/bota.jpg",
//   },
//   {
//     name: "SANDALIAS",
//     image: "/sandalia.jpg",
//   },
// ];

// export default async function Home() {
//   return (
//     <div className="bg-base1 rounded-xl text-black p-14 border-base3 border-opacity-30 border-l-2 border-t-2">
//       <div className="mx-auto flex flex-wrap justify-center gap-y-10 gap-x-10 mt-20 ml-60">
//         {categories.map((category, index) => (
//           <CardCategory
//             key={index}
//             name={category.name}
//             image={category.image}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

export default function CategoriesPage() {
  return (
    <div className="bg-white rounded-lg shadow-xl relative min-h-[80dvh]">
      <CategoryList />
    </div>
  );
}
