import React from "react";
// import { redirect } from "next/navigation";
import Image from "next/image";
import { ButtonPrimary } from "@/components/UI/Buttons/Buttons";

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

    console.log("TALLES >>>", sizes);  //QUITAR LUEGO
    console.log("COLORES >>>", colors);  //QUITAR LUEGO

    function getSizeLabel(id: string): string {
        const size = sizes.find((s: any) => s.id === id);
        if (!size) return id;
        return [
            size.size_us ? `US: ${size.size_us}` : null,
            size.size_eur ? `EUR: ${size.size_eur}` : null,
            size.size_cm ? `CM: ${size.size_cm}` : null,
        ]
            .filter(Boolean)
            .join(" - ");
    }

    function getColorLabel(id: string): string {
        const color = colors.find((c: any) => c.id === id);
        return color ? color.name : id;
    }

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
    console.log("PRODUCTO OBTENIDO >>>", JSON.stringify(product, null, 2));   //QUITAR LUEGO

    if (!product) {
        redirect("/404");
    }

    let displayImageUrl: string = "";

    if (product.image && product.image !== "") {
        displayImageUrl = product.image;
    }
    else if (product.variants && product.variants.length > 0 && product.variants[0].image && product.variants[0].image !== "") {
        displayImageUrl = product.variants[0].image;
    }
    else {
        displayImageUrl = '/placeholder-image.jpg'; // Asegúrate de tener este archivo en tu carpeta public/
    }

    const uniqueColors: string[] =
        product.variants?.length > 0
            ? Array.from(new Set(product.variants.map((v: any) => getColorLabel(v.color))))
            : [];

    const uniqueSizes: string[] =
        product.variants?.length > 0
            ? Array.from(
                new Set(
                    product.variants.flatMap((v: any) =>
                        v.variants2?.map((v2: any) => getSizeLabel(v2.talle)) ?? []
                    )
                )
            )
            : [];

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-md grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Columna de imagen y básicos */}
                <div>
                    <div className="w-40 h-40 relative border rounded overflow-hidden mt-4">
                        <Image
                            src={displayImageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <h1 className="text-2xl font-bold mt-4">{product.name}</h1>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-xl text-purple-600 font-semibold mb-4">
                        ${product.sale_price}
                    </p>

                    <ButtonPrimary textContent="Añadir al carrito" />
                </div>

                {/* Columna de variantes */}
                <div>
                    <h2 className="text-lg font-bold text-[#4e4090] mb-4">Variantes Disponibles</h2>

                    {product.variants && product.variants.length > 0 && (
                        <div className="grid grid-cols-1 gap-4">
                            {product.variants.map((variant: any, index: number) => (
                                <div key={index} className="border p-4 rounded-md bg-gray-100">
                                    <div className="flex items-center gap-4 mb-2">
                                        <div className="w-20 h-20 relative">
                                            <Image
                                                src={variant.image}
                                                alt="Variante"
                                                fill
                                                className="object-cover rounded-md"
                                            />
                                        </div>
                                        <div>
                                            <p><strong>Color:</strong> {getColorLabel(variant.color_id)}</p>
                                            <p><strong>Descripción:</strong> {variant.description}</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-[#4e4090] mb-1">Talles y Stock:</p>
                                        <ul className="list-disc pl-5">
                                            {variant.variantSizes?.map((v2: any, idx: number) => (
                                                <li key={idx}>
                                                    {getSizeLabel(v2.size_id)} - Stock: {v2.stock}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
