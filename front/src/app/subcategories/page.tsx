import CardCategory from "@/components/UI/Cards/CardCategory";
import {ICard} from "@/interfaces";
import React from "react";

const subCategories: ICard[] = [
  {
    name: "ZAPATILLAS DEPORTIVAS",
    image: "/zapdeportivas.jpg",
  },
  {
    name: "BOTAS DE CUERO",
    image: "/botasc-tacon.jpg",
  },
  {
    name: "SANDALIAS CON PLATAFORMA",
    image: "/sandplataforma.jpg",
  },
];

export default async function Home() {
    return (
        <div className="bg-base1 rounded-xl text-black p-14 border-base3 border-opacity-30 border-l-2 border-t-2">
            <div className="mx-auto flex flex-wrap justify-center gap-y-10 gap-x-10 mt-20 ml-60">
                {subCategories.map((category, index) => (
                    <CardCategory key={index}
                    name={category.name}
                    image={category.image}/>
                ))}
            </div>
        </div>
    );
};