import CardCategory from "@/components/ui/Cards/CardCategory";
import { ICard } from "@/interfaces";
import React from "react";

const categories: ICard[] = [
  {
    name: "ZAPATILLAS",
    image: "/zapatilla.jpg",
  },
  {
    name: "BOTAS",
    image: "/bota.jpg",
  },
  {
    name: "SANDALIAS",
    image: "/sandalia.jpg",
  },
];

export default async function Home() {
  return (
    <section className="bg-white rounded-lg shadow-xl p-8 min-w-[90vw] max-w-[1100px] min-h-[80vh] max-h-[800px] overflow-auto">
      <div className="mx-auto flex flex-wrap justify-center gap-10">
        {categories.map((category, index) => (
          <CardCategory
            key={index}
            name={category.name}
            image={category.image}
          />
        ))}
      </div>
    </section>
  );
}
