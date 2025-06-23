"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axiosInstance";
import { ICard } from "@/interfaces";
import CardCategory from "@/components/UI/Cards/CardCategory";

interface Props {
  categorySlug: string;
}

const SubcategoryList: React.FC<Props> = ({ categorySlug }) => {
  const [subCategories, setSubCategories] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/categories/${categorySlug}/subcategories`)
      .then((res) => setSubCategories(res.data))
      .catch((err) => console.error("Error al obtener subcategorías:", err))
      .finally(() => setLoading(false));
  }, [categorySlug]);

  if (loading)
    return <p className="text-center mt-10">Cargando subcategorías...</p>;

  return (
    <div className="flex flex-wrap justify-center gap-y-10">
      {subCategories.length > 0 ? (
        subCategories.map((sub, index) => (
          <CardCategory key={index} name={sub.name} image={sub.image} slug={sub.slug} />
        ))
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay subcategorías disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default SubcategoryList;
