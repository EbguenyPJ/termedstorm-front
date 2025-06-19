import React from "react";
import ShippingTable from "./components/ShippingTable";
import BreadcrumbClient from "../../../../components/UI/Breadcrumb";

const ShippingStockPage = () => {
  return (
    <div className="p-4">
      <BreadcrumbClient />
      <ShippingTable />
    </div>
  );
};

export default ShippingStockPage;
