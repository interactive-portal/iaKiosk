import React, { useEffect, useState } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/router";
import fetchJson from "@/util/helper";

const Page = () => {
  const router = useRouter();
  const firstName = router.query.firstName as string | undefined;
  const lastName = router.query.lastName as string | undefined;
  const customerId = router.query.customerId as string | undefined;
  const fullName = `${firstName ? firstName : ""} ${lastName ? lastName : ""}`;
  return (
    <Layout>
      <p className="text-[64px] font-medium text-[#A68B5C] mb-8">ИЛЭРЦ</p>
      <div className="flex gap-16 mb-8 px-[80px]">
        <div>
          <p className="text-[32px] text-white text-start">ОВОГ, НЭР</p>
          <input
            type="text"
            value={fullName}
            // onChange={(e) => handleInputChange(e, "lastName")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start">РЕГИСТЕР</p>
          <input
            type="text"
            // value={data.registration}
            // onChange={(e) => handleInputChange(e, "registration")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white"
          />
        </div>
      </div>
      <div className="mt-[700px] px-[100px] ">
        <div
          className="bg-white rounded-[76px] text-[#525050] text-[64px] h-[152px] w-[836px] flex justify-center items-center "
          onClick={() => router.push("/kiosk/member/contract")}
        >
          <p>БҮРТГЭЛТЭЙ ГЭРЭЭ</p>
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] mt-[50px] h-[152px] w-[836px] flex justify-center items-center text-[64px]"
          onClick={() => router.push("/kiosk/price/")}
        >
          ШИНЭ БАГЦ
        </div>
      </div>
    </Layout>
  );
};

export default Page;
