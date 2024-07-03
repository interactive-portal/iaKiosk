import React from "react";
import { useRouter } from "next/router";

import RegisterLayout from "./registerLayout";

const Fitness: React.FC = () => {
  const router = useRouter();

  const datas = [
    {
      title: "ЦАГЫН ХЯЗГААРТАЙ /07:00-16:00/",
      options: [
        { month: "1 САР", price: "260,000₮" },
        { month: "3 САР", price: "600,000₮" },
        { month: "6 САР", price: "830,000₮" },
        { month: "12 САР", price: "1,400,000₮" },
      ],
    },
    {
      title: "ЦАГЫН ХЯЗГААРГҮЙ",
      options: [
        { month: "1 САР", price: "320,000₮" },
        { month: "3 САР", price: "780,000₮" },
        { month: "6 САР", price: "1,100,000₮" },
        { month: "12 САР", price: "1,900,000₮" },
      ],
    },
    {
      title: "НАЙЗУУДЫН БАГЦ /07:00-16:00/",
      options: [
        { month: "3 САР", price: "1,500,000₮" },
        { month: "6 САР", price: "2,100,000₮" },
        { month: "12 САР", price: "3,900,000₮" },
      ],
    },
    {
      title: "НАЙЗУУДЫН БАГЦ /ХЯЗГААРГҮЙ/",
      options: [
        { month: "3 САР", price: "1,800,000₮" },
        { month: "6 САР", price: "2,850,000₮" },
        { month: "12 САР", price: "4,500,000₮" },
      ],
    },
  ];

  return (
    <RegisterLayout coverImagePath="/images/fitness.jpeg" title="ФИТНЕСС">
      <div className="mt-[80px] px-[50px]">
        {datas.map((data, index) => (
          <div
            key={index}
            className="flex flex-col gap-y-1 text-white uppercase mt-[30px] text-start  "
          >
            <div className="text-[40px] ">{data.title}</div>
            <div className="items-center gap-x-4 grid grid-cols-3 gap-4">
              {data.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex flex-col py-1 items-center text-[40px] rounded-[87px] bg-white/30 px-10 "
                  onClick={() =>
                    router.push({
                      pathname: "/kiosk/form",
                      query: { i: `${data.title}-${option.month}` },
                    })
                  }
                >
                  <span>{option.month}</span>
                  <span className="mb-[20px]">{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RegisterLayout>
  );
};

export default Fitness;
