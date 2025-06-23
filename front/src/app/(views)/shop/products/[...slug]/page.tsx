import React from "react";
import { redirect } from "next/navigation";
import ProductDetailClient from "../components/ProductDetailClient";

interface Props {
    params: { slug: string[] };
}

async function getSizes() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sizes`, { cache: "no-store" });
        return res.ok ? await res.json() : [];
    } catch (err) {
        console.error("Error al obtener sizes:", err);
        return [];
    }
}

async function getColors() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/colors`, { cache: "no-store" });
        return res.ok ? await res.json() : [];
    } catch (err) {
        console.error("Error al obtener colors:", err);
        return [];
    }
}

const ProductDetailPage = async ({ params }: Props) => {
    const id = params.slug[0];

    const sizes = await getSizes();
    const colors = await getColors();

    console.log("TALLES >>>", sizes);  
    console.log("COLORES >>>", colors);  


    async function getProductById(id: string) {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`, {
                cache: "no-store",
            });
            if (!res.ok) return null;
            return await res.json();
        } catch (error) {
            console.error("Error al obtener producto por ID:", error);
            return null;
        }
    }

    const product = await getProductById(id);
    console.log("PRODUCTO OBTENIDO >>>", JSON.stringify(product, null, 2));   

    if (!product) {
        redirect("/404");
    }
    
    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-6xl mx-auto">
                <ProductDetailClient
                    product={product}
                    sizes={sizes}
                    colors={colors}
                />
            </div>
        </div>
    );
};

export default ProductDetailPage;