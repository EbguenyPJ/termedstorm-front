"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ICard } from "@/interfaces";
import CardCategory from "../../../../../../components/UI/Cards/CardCategory";

const CategoryList = () => {
  const [categories, setCategories] = useState<ICard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/categories`)
      .then((res) => {
        setCategories(res.data);
        console.log("categories", res.data);
      })
      .catch((err) => console.error("Error al obtener categorías:", err))
      .finally(() => setLoading(false));
  }, []);

  if (loading)
    return <p className="text-center mt-10">Cargando categorías...</p>;

  return (
    <div className="flex flex-wrap justify-center gap-y-10">
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <CardCategory
            key={index}
            name={category.name}
            image={category.image}
          />
        ))
      ) : (
        <div className="w-full h-60 flex justify-center items-center">
          <p className="text-center text-gray-500 text-lg w-full">
            No hay categorías disponibles.
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryList;
