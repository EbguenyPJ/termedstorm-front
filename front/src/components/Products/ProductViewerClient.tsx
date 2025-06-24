"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";

interface VariantSize {
    size_id: string;
    stock: number;
}

export interface Variant {
    image: string[];
    color_id: string;
    description: string;
    variantSizes: VariantSize[];
}

interface Props {
    product: {
        name: string;
        description: string;
        sale_price: number;
    };
    variants: Variant[];
    getColorLabel: (id: string) => string;
    getSizeLabel: (id: string) => string;
}

const ProductViewerClient: React.FC<Props> = ({ product, variants, getColorLabel, getSizeLabel }) => {
  const initialImage = variants?.[0]?.image?.[0] || "/placeholder-image.jpg";
  const [selectedImage, setSelectedImage] = useState<string>(initialImage);
  const [activeColor, setActiveColor] = useState<string>(variants?.[0]?.color_id || "");
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);


    useEffect(() => {
        if (variants.length > 0) {
            setSelectedImage(variants[0]?.image?.[0] || "/placeholder-image.jpg");
            setActiveColor(variants[0]?.color_id || "");
        }
    }, [variants]);

      if (!variants || variants.length === 0) {
    return <p className="text-center text-red-500 font-semibold">No hay variantes disponibles.</p>;
  }

    const currentVariant = variants.find(v => v.color_id === activeColor);

    const toggleSize = (sizeId: string) => {
        setSelectedSizes(prev =>
            prev.includes(sizeId)
                ? prev.filter(id => id !== sizeId)
                : [...prev, sizeId]
        );
    };

    return (
        <div className="grid grid-cols-[auto_1fr] gap-8">
            <div className="flex flex-col gap-3">
                {variants.map((v, i) =>
                    v.image.map((img, idx) => (
                        <div
                            key={`${i}-${idx}`}
                            onClick={() => {
                                setSelectedImage(img);
                                setActiveColor(v.color_id);
                            }}
                            className={`w-20 h-20 relative rounded overflow-hidden border cursor-pointer ${img === selectedImage ? "border-primary" : "border-gray-300"
                                }`}
                        >
                            <Image src={img} alt={`Variante ${i}`} fill className="object-cover" />
                        </div>
                    ))
                )}
            </div>

            <div className="flex flex-col gap-4">
                <div className="w-full aspect-[4/3] relative border rounded overflow-hidden">
                    <Image src={selectedImage} alt={product.name} fill className="object-cover" />
                </div>

                <h1 className="text-3xl font-bold text-secondary">{product.name}</h1>
                <p className="text-gray-700">{product.description}</p>
                <p className="text-2xl font-semibold text-primary">${product.sale_price}</p>

                <div>
                    <h3 className="font-semibold text-base-300 mb-2">Colores disponibles:</h3>
                    <div className="flex gap-2">
                        {Array.from(new Set(variants.map(v => v.color_id))).map((colorId, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    const found = variants.find(v => v.color_id === colorId);
                                    if (found && found.image.length > 0) {
                                        setSelectedImage(found.image[0]);
                                        setActiveColor(colorId);
                                        setSelectedSizes([]); 
                                    }
                                }}
                                className={`w-8 h-8 rounded-full border-2 ${colorId === activeColor ? "border-primary" : "border-gray-300"
                                    }`}
                                style={{ backgroundColor: (getColorLabel(colorId) || "#cccccc").toLowerCase() }}
                                title={getColorLabel(colorId)}
                            ></button>
                        ))}
                    </div>
                </div>

                <div>
                    <h3 className="font-semibold text-base-300 mb-2 mt-4">Talles disponibles:</h3>
                    <div className="flex flex-wrap gap-2">
                        {currentVariant?.variantSizes?.map((vs, index) => (
                            <label
                                key={index}
                                className={`px-3 py-1 rounded border cursor-pointer ${selectedSizes.includes(vs.size_id)
                                        ? "bg-primary text-white"
                                        : "bg-base-100 hover:bg-primary-20"
                                    }`}
                            >
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={selectedSizes.includes(vs.size_id)}
                                    onChange={() => toggleSize(vs.size_id)}
                                />
                                {getSizeLabel(vs.size_id)} (Stock: {vs.stock})
                            </label>
                        ))}
                    </div>
                </div>

                <button className="mt-6 px-5 py-2 bg-primary text-white rounded hover:bg-secondary transition">
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductViewerClient;
