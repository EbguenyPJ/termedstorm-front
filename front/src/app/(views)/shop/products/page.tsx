import React from "react";
import ProductList from "@/components/Products/ProductList";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function Home() {
  return (
    <>
      <BreadcrumbClient />
      <ProductList />
    </>
  );
}