import React from "react";
import ProductList from "./components/Productlist";
import BreadcrumbClient from "@/components/UI/Breadcrumb";

export default function Home() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <BreadcrumbClient />
      <ProductList />
    </div>
  );
}
