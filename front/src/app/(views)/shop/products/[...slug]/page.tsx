import React from "react";
// import { redirect } from "next/navigation";
import Image from "next/image";
import { ButtonPrimary } from "@/components/UI/Buttons/Buttons";

// async function getProductById(id: number) {
//   const mockProducts = [
//     {
//       id: 1,
//       name: "Zapatilla Pro",
//       image: "/zapatilla.jpg",
//       description: "Zapatillas deportivas de alta gama para running",
//       sale_price: 12000,
//       colors: ["Rojo", "Negro"],
//       sizes: ["38", "40", "42"],
//       stock: 10,
//     },
//     {
//       id: 2,
//       name: "Campera Eco",
//       image: "/campera.jpg",
//       description: "Campera térmica impermeable ideal para el invierno",
//       sale_price: 18000,
//       colors: ["Azul", "Gris"],
//       sizes: ["S", "M", "L"],
//       stock: 5,
//     },
//   ];

//   return mockProducts.find((p) => p.id === id) || null;
// }

interface Props {
    params: { slug: string[] };
}

const ProductDetailPage = async ({ params }: Props) => {
    //   const [idStr] = params.slug;
    const id = params.slug[0];

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

    // if (!product) redirect("/404");

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto bg-white shadow p-6 rounded-md grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                    <div className="w-40 h-40 relative border rounded overflow-hidden mt-4">
                        {product.image && (
                            <Image src={product.image} alt={product.name} fill
                                className="object-cover" />
                        )}
                    </div>
                    <h1>{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl text-purple-600 font-semibold mb-2">
                        ${product.sale_price}
                    </p>
                    {product.colors && product.colors.length > 0 && (
                        <p className="mb-2">
                            Colores:{" "}
                            {product.colors.map((color: string) => (
                                <span key={color} className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                                    {color}
                                </span>
                            ))}
                        </p>
                    )}
                    {product.sizes && product.sizes.length > 0 && (
                        <p className="mb-2">
                            Talles:{" "}
                            {product.sizes.map((size: string) => (
                                <span key={size} className="inline-block bg-gray-200 px-2 py-1 rounded mr-2">
                                    {size}
                                </span>
                            ))}
                        </p>
                    )}
                    <p className="mb-4">Stock: {product.stock}</p>

                    <ButtonPrimary textContent="Añadir al carrito" />
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
