import React from "react";
import { useRouter } from "next/router";
import ComboLayout from "./comboLayout";

const BasseinSauna: React.FC = () => {
  const router = useRouter();

  const datas = [
    {
      options: [{ duration: "6 САР", price: "1,150,000₮" }],
    },
    {
      options: [{ duration: "12 САР", price: "4,450,000₮" }],
    },
  ];

  const warningToCostumer = ["БАССЕЙН 7 ХОНОГТ 4 УДАА ОРОХ ХЯЗГААРТАЙ"];

  return (
    <ComboLayout coverImagePath="/images/pool.png" title="БАССЕЙН САУН">
      <div className="flex flex-col max-h-[1200px] overflow-auto p-6 mt-[100px]">
        <p className="text-[64px] text-[#A68B5C] text-center">ХОСОЛСОН БАГЦ</p>
        {datas.map((data, index) => (
          <div
            key={index}
            className="flex flex-col text-white uppercase mt-[70px]"
          >
            <div className="grid grid-cols justify-center">
              {data.options.map((option, idx) => (
                <div
                  key={idx}
                  className="flex  flex-col w-[876px] items-center text-[40px] rounded-[87px] bg-white/30 cursor-pointer"
                  onClick={() =>
                    router.push({
                      pathname: "/kiosk/form",
                    })
                  }
                >
                  <span className="text-[64px]">{option.duration}</span>
                  <span className="text-[90px]">{option.price}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className=" text-center text-white mt-[200px] ">
        <h1 className="text-[64px]">САНАМЖ</h1>
        <p className="text-[40px] ">{warningToCostumer}</p>
      </div>
    </ComboLayout>
  );
};

export default BasseinSauna;
