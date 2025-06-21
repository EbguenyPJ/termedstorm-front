import React from "react";
import ProductList from "./components/Productlist";
import BreadcrumbClient from "../../../../components/UI/Breadcrumb";

export default function Home() {
  return (
    <>
      <BreadcrumbClient />
      <ProductList />
    </>
  );
}
