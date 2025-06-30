import React from "react";
import ProductDetailClient from "@/components/Products/ProductDetailClient";
import api from "@/lib/axiosInstance";
import { redirect } from "next/navigation";
import { Params } from "@/interfaces/index";


async function getSizes() {
  try {
    const res = await api.get("/sizes", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data ?? [];
  } catch (err) {
    console.error("Error al obtener sizes:", err);
    return [];
  }
}


async function getColors() {
  try {
    const res = await api.get("/colors", {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data ?? [];
  } catch (err) {
    console.error("Error al obtener colors:", err);
    return [];
  }
}


async function getProductById(id: string) {
  try {
    const res = await api.get(`/products/${id}`, {
      headers: { "Cache-Control": "no-store" },
    });
    return res.data ?? null;
  } catch (error) {
    console.error("Error al obtener producto:", error);
    return null;
  }
}


const ProductDetailPage = async ({ params }: { params: Params }) => {
  const id = (await params as any)?.id;
  // const productId = parseInt(id, 10);

  // const product = isNaN(productId) ? null : await getProductById(productId);


  const [sizes, colors, product] = await Promise.all([
    getSizes(),
    getColors(),
    getProductById(id),
  ]);


  if (!product) redirect("/404");


  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <ProductDetailClient product={product} sizes={sizes} colors={colors} />
      </div>
    </div>
  );
};


export default ProductDetailPage;