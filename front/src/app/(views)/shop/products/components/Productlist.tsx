"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICardProduct } from "@/interfaces";
import CardProduct from "@/components/UI/Cards/CardProduct";

const ProductList = () => {
    const [products, setProducts] = useState<ICardProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
            .then((res) => setProducts(res.data))
            .catch((err) => console.error("Error al obtener productos:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div className="flex flex-wrap justify-center gap-y-10">
            {products.length > 0 ? (
                products.map((product, index) => (
                    <CardProduct
                        key={index}
                        name={product.name}
                        image={product.image}
                        sale_price={product.sale_price}
                    />
                ))
            ) : (
                <div className="w-full h-60 flex justify-center items-center">
                    <p className="text-center text-gray-500 text-lg w-full">
                        No hay productos disponibles.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProductList;
