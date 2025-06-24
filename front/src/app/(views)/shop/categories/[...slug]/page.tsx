"use client";

import { useParams } from "next/navigation";
import ProductList from "@/components/Products/ProductList";
import SubcategoryList from "@/components/Products/SubcategoryList"; // Si no existe, lo creamos

const Page = () => {
  const params = useParams();
  const slug = params.slug as string[];

  if (!slug) return <p>Cargando...</p>;

  // /shop/categories/[categoria]
  if (slug.length === 1) {
    return <SubcategoryList categorySlug={slug[0]} />;
  }

  // /shop/categories/[categoria]/[subcategoria]
  if (slug.length === 2) {
    return <ProductList category={slug[0]} subcategory={slug[1]} />;
  }

  return <p>Ruta no válida</p>;
};

export default Page;
