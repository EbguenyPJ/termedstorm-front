"use client";

import React, { useEffect, useState } from "react";
import ProductDetailClient from "../../../../../../components/ProductDetail/ProductDetailClient";
import api from "@/lib/axiosInstance";

interface Props {
  slug: string[];
}

const DetailProduct: React.FC<Props> = ({ slug }) => {
  const [product, setProduct] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  const productSlug = slug[2]; // o ID si usás eso

  useEffect(() => {
    async function fetchData() {
      try {
        const [sizesRes, colorsRes, productRes] = await Promise.all([
          api.get("/sizes"),
          api.get("/colors"),
          api.get(`/products/${productSlug}`),
        ]);

        setSizes(sizesRes.data ?? []);
        setColors(colorsRes.data ?? []);
        setProduct(productRes.data ?? null);
      } catch (error) {
        console.error("Error al cargar datos del producto:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [productSlug]);

  if (loading) return <p className="text-center mt-10">Cargando producto...</p>;
  if (!product) return <p className="text-center mt-10">Producto no encontrado</p>;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <ProductDetailClient product={product} sizes={sizes} colors={colors} />
      </div>
    </div>
  );
};

export default DetailProduct;
