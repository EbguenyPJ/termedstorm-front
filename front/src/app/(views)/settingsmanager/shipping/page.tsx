import React from "react";
import ShippingTable from "./components/ShippingTable";
import BreadcrumbClient from "../../../../components/UI/Breadcrumb";

const ShippingStockPage = () => {
  return (
    <div>
      <BreadcrumbClient />
      <ShippingTable />
    </div>
  );
};

export default ShippingStockPage;
