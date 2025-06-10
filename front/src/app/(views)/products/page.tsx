import CardProduct from "@/components/UI/Cards/CardProduct";
import {ICardProduct} from "@/interfaces";
import React from "react";

const products: ICardProduct[] = [
  {
    name: "Zapatillas Deportivas",
    image: "/zapdeportivas.jpg",
    price: 28999,
    stock: 15,
  },
  {
    name: "Botas de Cuero con Tacón",
    image: "/botasc-tacon.jpg",
    price: 45999,
    stock: 8,
  },
  {
    name: "Sandalias con Plataforma",
    image: "/sandplataforma.jpg",
    price: 21999,
    stock: 20,
  },
];

export default async function Home() {
    return (
        <div className="bg-base1 rounded-xl text-black p-14 border-base3 border-opacity-30 border-l-2 border-t-2">
            <div className="mx-auto flex flex-wrap justify-center gap-y-10 gap-x-10 mt-20 ml-60">
                {products.map((category, index) => (
                    <CardProduct key={index}
                    name={category.name}
                    image={category.image}
                    price={category.price}/>
                ))}
            </div>
        </div>
    );
};