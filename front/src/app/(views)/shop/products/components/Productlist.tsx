"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ApiProduct, ICardProduct } from "@/interfaces";
import CardProduct from "@/components/UI/Cards/CardProduct";

const ProductList = () => {
    const [products, setProducts] = useState<ICardProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.NEXT_PUBLIC_API_URL}/products`)
            .then((res) => {
                const fetchedProducts: ApiProduct[] = res.data; 

                const mappedProducts: ICardProduct[] = fetchedProducts.map((product: ApiProduct) => {
                    let imageUrl: string = "";

                    if (product.image && product.image !== "") {
                        imageUrl = product.image;
                    }
                    else if (product.variants && product.variants.length > 0 && product.variants[0].image && product.variants[0].image !== "") {
                        imageUrl = product.variants[0].image;
                    }
                    else {
                        imageUrl = '/placeholder-image.jpg'; // buscar foto/
                    }

                    return {
                        id: product.id,
                        name: product.name,
                        image: imageUrl, 
                        sale_price: product.sale_price,
                    };
                });
                setProducts(mappedProducts);
            })
            .catch((err) => console.error("Error al obtener productos:", err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>Cargando productos...</p>;

    return (
        <div className="flex flex-wrap justify-center gap-y-10">
            {products.length > 0 ? (
                products.map((product) => (
                    <CardProduct
                        key={product.id} 
                        id={product.id} 
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
