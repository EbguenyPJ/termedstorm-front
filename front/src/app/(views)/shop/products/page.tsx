import React from "react";
import ProductList from "./components/Productlist";
import BreadcrumbClient from "../../../../components/UI/Breadcrumb";

export default function Home() {
  return (
    <div className="bg-white rounded-lg shadow-xl relative min-h-[80dvh]">
      <BreadcrumbClient />
      <ProductList />
    </div>
  );
}
