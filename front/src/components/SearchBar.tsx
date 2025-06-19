"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDebounce } from "../hooks/useDebounce";
import { IProduct } from "../interfaces/index";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<IProduct[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedSearch = useDebounce(search, 400);
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      if (debouncedSearch.trim().length < 2) return setResults([]);

      try {
        const { data } = await axios.get(
          `/products/search?query=${debouncedSearch}`
        );
        setResults(data);
        setShowSuggestions(true);
      } catch (err) {
        console.error("Error buscando productos", err);
        setResults([]);
      }
    };

    fetchResults();
  }, [debouncedSearch]);

  const handleSelect = (id: string) => {
    router.push(`/products/${id}`);
    setSearch("");
    setResults([]);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full max-w-xs mx-auto">
      <input
        type="text"
        placeholder="Buscar productos..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setShowSuggestions(true)}
        className="w-full p-2 border bg-base-100 border-gray-300 rounded-lg"
      />

      {showSuggestions && results.length > 0 && (
        <ul className="absolute z-50 w-full bg-white border border-gray-300 rounded-md shadow mt-1 max-h-60 overflow-y-auto">
          {results.map((product) => (
            <li
              key={product.id}
              onClick={() => handleSelect(product.id)}
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex gap-2 items-center"
            >
              <span>{product.name}</span>
            </li>
          ))}
        </ul>
      )}

      {showSuggestions && search && results.length === 0 && (
        <div className="absolute w-full mt-1 bg-white border border-gray-300 text-center text-gray-500 p-2 rounded-md">
          No se encontraron resultados
        </div>
      )}
    </div>
  );
};
export default SearchBar;
