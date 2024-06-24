import React from "react";
import { useRouter } from "next/router";
import PriceLayout from "../price/priceLayout";

const Sauna: React.FC = () => {
  const router = useRouter();

  const packages = [
    {
      title: "ТОМ ХҮН",
      options: [
        { duration: "6 САР", price: "1,150,000₮" },
        { duration: "12 САР", price: "1,800,000₮" },
      ],
    },
    {
      title: "ГЭР БҮЛ /4 ГИШҮҮН/",
      options: [
        { duration: "6 САР", price: "2,650,000₮" },
        { duration: "12 САР", price: "4,450,000₮" },
      ],
    },
  ];

  return (
    <PriceLayout coverImagePath="/images/sauna.jpeg" title="САУН">
      <div className="flex flex-col gap-y-6 max-h-[1200px] overflow-auto p-6">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-3 text-white uppercase py-10"
          >
            <div className="text-[40px] text-start ">{pkg.title}</div>
            <div className="grid grid-cols-2 gap-4">
              {pkg.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-[40px] rounded-[87px] bg-white/30 px-10 py-5 cursor-pointer"
                  onClick={() =>
                    router.push({
                      pathname: "/kiosk/form",
                      query: { i: `${pkg.title}-${option.duration}` },
                    })
                  }
                >
                  <span>{option.duration}</span>
                  <span>{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </PriceLayout>
  );
};

export default Sauna;
