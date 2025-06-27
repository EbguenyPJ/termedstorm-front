"use client";

import { useMembershipTypes } from "@/hooks/useMembershipTypes";
import { createCheckoutSession } from "@/lib/subscriptionService";
import { useAuthStore } from "@/stores/authStore";
import { CheckIcon } from "lucide-react";
import { useState } from "react";

export default function PricingPage() {
  const { types, loading, error } = useMembershipTypes();
  const [isAnnual, setIsAnnual] = useState(false);
  const user = useAuthStore((state) => state.user);

  const handleSubscribe = async (price_id: string) => {
    if (!user) return alert("Debes iniciar sesión primero.");

    try {
      const url = await createCheckoutSession({
        email: user.email,
        name: user.name,
        price_id,
      });

      window.location.href = url;
    } catch (err) {
      console.error(err);
      alert("Error al crear la sesión de pago.");
    }
  };

  if (loading) return <p className="text-center mt-20">Cargando planes...</p>;
  if (error) return <p className="text-center text-red-600 mt-20">{error}</p>;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto text-center space-y-6">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Elegí el plan ideal para tu{" "}
          <span className="text-primary">empresa</span>
        </h2>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-sm">Mensual</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={isAnnual}
              onChange={() => setIsAnnual(!isAnnual)}
            />
            <div className="w-[40px] h-[20px] bg-neutral-500 peer-checked:bg-[#6e5cc4] rounded-full transition-all duration-200" />
            <div className="absolute top-[2px] left-[2px] h-[16px] w-[16px] bg-white rounded-full shadow-md transition-all duration-200 peer-checked:translate-x-[20px]" />
          </label>
          <span className="text-sm">Anual</span>
        </div>

        <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
          {types.map((plan) => (
            <div
              key={plan.id}
              className="relative flex flex-col items-start rounded-xl p-6 bg-white border border-gray-200 shadow-sm"
            >
              <h3 className="text-2xl font-semibold mb-1">{plan.name}</h3>
              <p className="text-4xl font-bold mt-2">
                {/* NO OLVIDAR consultar precios temporales en realción a plan.name */}
                {isAnnual ? "$990/año" : "$99/mes"}
              </p>
              <ul className="space-y-3 mt-4 text-left text-sm w-full">
                <li className="flex items-start gap-2">
                  <CheckIcon className="h-4 w-4 mt-1 text-primary" />
                  Acceso a funcionalidades según plan
                </li>
              </ul>
              <button
                onClick={() => handleSubscribe(plan.stripe_price_id)}
                className="mt-6 py-2 px-4 w-full bg-primary text-white rounded-2xl hover:bg-primary/90 transition-all duration-200"
              >
                Elegir {plan.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};