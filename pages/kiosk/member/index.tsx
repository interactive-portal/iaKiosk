import React, { useEffect, useState } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/router";
import { Spin } from "antd"; // Import the Spin component
import { LoadingOutlined } from "@ant-design/icons";

const FIELDS = [
  { label: "ОВОГ", key: "lastname" },
  { label: "НЭР", key: "customername" },
];

const Page = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true); // Add loading state

  const { user } = router.query;
  const userString = Array.isArray(user) ? user[0] : user;
  let userData = null;

  try {
    userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    userData = null;
  }

  if (Array.isArray(userData)) {
    userData = userData[0];
  }

  const contractData = userData?.result?.[0] || {};

  if (!userData) return <div>No user data available</div>;

  const renderField = (field: any) => {
    const value = contractData[field.key] || "No data";

    return (
      <div key={field.key} className="flex justify-between flex-col gap-y-2">
        <span>{field.label}</span>
        <span className="bg-white px-5 rounded-[20px] text-[#525050]">
          {value}
        </span>
      </div>
    );
  };

  return (
    <Layout>
      <div className="mt-[100px]">
        <p className="text-[64px] font-medium text-[#A68B5C] mb-8">ИЛЭРЦ</p>
        <div className="flex gap-16 mb-8 px-[80px]">
          <div className="text-[32px] text-white text-start grid grid-cols-2 w-full gap-4">
            {FIELDS.map(renderField)}
          </div>
        </div>
        <div className="mt-[700px] px-[100px] ">
          <div
            className="bg-white rounded-[76px] text-[#525050] text-[64px] h-[152px] w-[836px] flex justify-center items-center cursor-pointer"
            onClick={() =>
              router.push({
                pathname: "/kiosk/extend/userinfo",
                query: { user: JSON.stringify(userData) }, // Pass user data as query parameter
              })
            }
          >
            <p>БҮРТГЭЛТЭЙ ГЭРЭЭ</p>
          </div>
          <div
            className="bg-white rounded-[76px] text-[#525050] mt-[50px] h-[152px] w-[836px] flex justify-center items-center text-[64px] cursor-pointer"
            onClick={() => router.push("/kiosk/register/")}
          >
            ШИНЭ БАГЦ
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
