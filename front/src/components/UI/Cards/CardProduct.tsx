"use client"

import { ICardProduct } from "@/interfaces";
import Image from "next/image";
import React from "react";
import { ButtonPrimary } from "../Buttons/Buttons";
import Link from "next/link";


export const CardProduct: React.FC<ICardProduct> = ({ id, name, image, sale_price }) => {
    const link = `/shop/products/${id}/${encodeURIComponent(name)}`;
    return (
        <div className="w-xs bg-white p-4 border border-gray-300 hover:border-[#6e5cc4] rounded-lg transition-colors duration-300">
            <div className="w-full aspect-square relative overflow-hidden">
                {image ? (
                    <Image
                        src={image}
                        alt={name}
                        fill
                        className="max-h-64 aspect-auto object-cover rounded-md"
                    />
                ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-sm text-gray-500">
                        Sin imagen
                    </div>
                )}
            </div>
            <div className="text-xl capitalize font-semibold text-gray-800">
               <strong> {name} </strong>
            </div>
            <div className="mt-2 flex justify-between items-center text-sm font-semibold text-gray-800">
                <p className="text-xl semi-bold">${sale_price}</p>
                <Link href={link}>
                    <ButtonPrimary textContent="Ver más" />
                </Link>
            </div>
        </div>
    )
}

export default CardProduct;