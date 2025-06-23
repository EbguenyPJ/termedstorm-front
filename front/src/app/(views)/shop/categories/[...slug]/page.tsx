"use client";

import { useParams } from "next/navigation";
import dynamic from "next/dynamic";
import ProductList from "@/components/Productlist";
import SubcategoryList from "@/components/SubcategoryList";

const DynamicProductDetail = dynamic(() => import("./components/DetailProduct"));

const Page = () => {
  const params = useParams();
  const slug = params.slug as string[];

  if (!slug) return <p>Cargando...</p>;

  // /shop/categories/[categoria-slug]
  if (slug.length === 1) {
    return <SubcategoryList categorySlug={slug[0]} />;
  }

  // /shop/categories/[categoria-slug]/[subcategoria-slug]
  if (slug.length === 2) {
    return <ProductList category={slug[0]} subcategory={slug[1]} />;
  }

  // /shop/categories/[categoria-slug]/[subcategoria-slug]/[producto-slug]
  if (slug.length === 3) {
    return <DynamicProductDetail slug={slug} />;
  }

  return <p>Ruta no válida</p>;
};

export default Page;

