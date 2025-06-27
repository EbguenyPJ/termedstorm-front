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
    getColorHexCode: (id: string) => string;
    getSizeLabel: (id: string) => string;
}

const ProductViewerClient: React.FC<Props> = ({ product, variants, getColorLabel, getSizeLabel, getColorHexCode }) => {
    if (!variants || variants.length === 0) {
        return <p className="text-center text-red-500 font-semibold">No hay variantes disponibles.</p>;
    }
    const [activeColor, setActiveColor] = useState<string>(variants[0].color_id);
    const [selectedImage, setSelectedImage] = useState<string>(variants[0].image[0] || "/placeholder-image.jpg");
    const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

    const currentVariant = variants.find(v => v.color_id === activeColor) || variants[0];

    useEffect(() => {
        if (currentVariant && currentVariant.image.length > 0) {
            if (!currentVariant.image.includes(selectedImage)) {
                setSelectedImage(currentVariant.image[0]);
            }
        }
    }, [activeColor, currentVariant, selectedImage]);

    const handleColorClick = (colorId: string) => {
        const found = variants.find(v => v.color_id === colorId);
        if (found) {
            setActiveColor(colorId);
            setSelectedImage(found.image[0] || "/placeholder-image.jpg");
            setSelectedSizes([]);
        }
    };

    const toggleSize = (sizeId: string) => {
        setSelectedSizes(prev =>
            prev.includes(sizeId)
                ? prev.filter(id => id !== sizeId)
                : [...prev, sizeId]
        );
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-8 md:gap-12 lg:gap-16">

            {/* Columna de Miniaturas */}
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible">
                {currentVariant.image.map((img, idx) => (
                    <div
                        key={idx}
                        onClick={() => setSelectedImage(img)}
                        className={`w-20 h-20 sm:w-24 sm:h-24 relative rounded-lg overflow-hidden border-2 transition-all duration-200 cursor-pointer 
                            ${img === selectedImage ? "border-primary-500 ring-2 ring-primary-500 ring-offset-2" : "border-gray-300 hover:border-gray-400"}`
                        }
                    >
                        <Image src={img} alt={`Thumbnail ${idx}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                    </div>
                ))}
            </div>

            {/* Columna de Detalles del Producto */}
            <div className="flex flex-col gap-4">
                {/* Imagen principal */}
                <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden shadow-lg border border-gray-200">
                    <Image src={selectedImage} alt={product.name} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw" className="object-cover" />
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-2">{product.name}</h1>
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                <p className="text-3xl font-semibold text-primary-600">${product.sale_price}</p>
                {/* Selección de colores */}
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3">
                        Color: <span className="font-normal text-gray-600">{getColorLabel(activeColor)}</span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                        {/* Iterar sobre los colores únicos */}
                        {Array.from(new Set(variants.map(v => v.color_id))).map((colorId: string) => (
                            <button
                                key={colorId}
                                onClick={() => handleColorClick(colorId)}
                                className={`w-10 h-10 rounded-full border-2 transition-all duration-200 
                                    ${colorId === activeColor ? "border-primary-500 ring-2 ring-primary-500 ring-offset-2" : "border-gray-300 hover:border-gray-400"}`
                                }
                                style={{
                                    backgroundColor: getColorHexCode(colorId),
                                }}
                                title={getColorLabel(colorId)}
                            />
                        ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-semibold text-gray-800 mb-3 mt-4">Talles y Stock:</h3>
                    <div className="flex flex-wrap gap-2">
                        {currentVariant?.variantSizes?.map((vs) => {
                            const isOutOfStock = vs.stock <= 0;
                            const isSelected = selectedSizes.includes(vs.size_id);

                            return (
                                <label
                                    key={vs.size_id}
                                    onClick={() => !isOutOfStock && toggleSize(vs.size_id)}
                                    className={`
                                         px-4 py-2 rounded-lg border-2 font-medium transition-all duration-200
                                         ${isSelected
                                            ? "bg-primary-500 text-white border-primary-500"
                                            : isOutOfStock
                                                ? "bg-gray-200 text-gray-400 cursor-not-allowed border-gray-200 line-through"
                                                : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100 cursor-pointer"
                                        }`}
                                >
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={isSelected}
                                        // *** MODIFICACIÓN: Agregamos la prop readOnly ***
                                        readOnly
                                        disabled={isOutOfStock}
                                    />
                                    {getSizeLabel(vs.size_id)}
                                    <span className="ml-2 font-normal text-sm opacity-80">
                                        (Stock: {isOutOfStock ? "Agotado" : vs.stock})
                                    </span>
                                </label>
                            );
                        })}
                    </div>
                </div>
                <button
                    className="mt-8 w-full sm:w-auto px-8 py-3 bg-primary-600 text-white font-bold rounded-lg shadow-md hover:bg-primary-700 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={selectedSizes.length === 0}
                >
                    Añadir al carrito
                </button>
            </div>
        </div>
    );
};

export default ProductViewerClient;