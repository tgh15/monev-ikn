"use client";

import { Pie } from "react-chartjs-2";
import { Category } from "@/type/CategoryType";
import { formatCurrency } from "@/lib/utils";

interface AlokasiAnggaranPerKlasifikasi {
  categories?: Category[]
}

export default function AlokasiAnggaranPerKlasifikasi({ categories }: AlokasiAnggaranPerKlasifikasi) {

  const colors = [
    ["rgba(255,218,224,0.8)", "rgb(255,218,224)"], // Soft Pink
    ["rgba(230,224,255,0.8)", "rgb(230,224,255)"], // Soft Lavender
    ["rgba(209,250,229,0.8)", "rgb(209,250,229)"], // Soft Mint
    ["rgba(254,226,214,0.8)", "rgb(254,226,214)"], // Soft Peach
    ["rgba(224,242,254,0.8)", "rgb(224,242,254)"], // Soft Sky
    ["rgba(254,249,231,0.8)", "rgb(254,249,231)"], // Soft Cream
    ["rgba(243,232,255,0.8)", "rgb(243,232,255)"], // Soft Lilac
    ["rgba(207,250,254,0.8)", "rgb(207,250,254)"], // Soft Aqua
  ];
  // Data untuk grafik
  const budgetAllocationData = {
    labels: categories?.map((category) => category.name),
    datasets: [
      {
        label: "Alokasi Anggaran (Miliar Rupiah)",
        data: categories?.map((category) => category.plannedAmount),
        backgroundColor: colors.map((c) => c[0]),
        borderColor: colors.map((c) => c[1]),
        borderWidth: 2,
      },
    ],
  };
  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Alokasi Anggaran per Klasifikasi Rincian Output
      </h3>
      <div className="h-80">
        <Pie
          data={budgetAllocationData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    let label = context.label || "";
                    if (label) {
                      label += ": ";
                    }
                    label += formatCurrency(context.parsed);
                    return label;
                  },
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
