import React from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <Layout>
      <p className="text-[64px] font-medium text-[#A68B5C]">ИЛЭРЦ</p>
      <div className="flex gap-16">
        <div>
          <p className="text-[32px] text-white text-start ">НЭР</p>
          <input
            type="text"
            placeholder="Та нэрээ оруулна уу..."
            className="flex justify-end items-center rounded-xl px-4 h-[43px] w-[349px]"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start "> РЕГИСТЕР</p>
          <input
            type="text"
            placeholder="Та peгистэрээ оруулна уу..."
            className="flex justify-end items-center rounded-xl px-4 h-[43px] w-[349px]"
          />
        </div>
      </div>
      <div className="mt-[700px] ">
        <div
          className="bg-white rounded-[76px] text-[#525050] text-[64px] h-[152px] w-[836px] flex justify-center items-center font-semibold "
          onClick={() => router.push("/kiosk/member/contract")}
        >
          <p>БҮРТГЭЛТЭЙ ГЭРЭЭ</p>
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] mt-[50px] h-[152px] w-[836px] flex justify-center items-center font-semibold text-[64px]"
          onClick={() => router.push("/kiosk/price/saunaPrice")}
        >
          ШИНЭ БАГЦ
        </div>
      </div>
    </Layout>
  );
};

export default Page;
