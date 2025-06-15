import React from "react";
import SubCategoryList from "./components/CategoryList";

export default function SubCategoriesPage() {
  return (
    <div className="bg-white rounded-lg shadow-xl p-8 min-w-[90vw] max-w-[1100px] min-h-[80vh] max-h-[800px] overflow-auto">
      <SubCategoryList />
    </div>
  );
}
