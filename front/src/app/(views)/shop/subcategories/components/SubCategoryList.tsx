"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { ICard } from "@/interfaces";
import CardCategory from "@/components/UI/Cards/CardCategory";

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/sub-categories`)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error("Error al obtener subcategorías:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center mt-10">Cargando subcategorías...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
      {subCategories.length > 0 ? (
        subCategories.map((category, index) => (
          <CardCategory key={index} name={category.name} image={category.image} />
        ))
      ) : (
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay subcategorías disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubCategoryList;
