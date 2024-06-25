import React from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/navigation";

const Ebarimt = () => {
  const router = useRouter();
  return (
    <Layout>
      <div>
        <div className="mt-[350px] ">
          <p className="text-[90px] text-[#A68B5C]">e-barimt</p>
          <button
            className="h-[174px] w-[844px] bg-white rounded-full text-[64px] mt-[80px]"
            onClick={() => router.push("/kiosk/sell/warning")}
          >
            ХУВЬ ХҮН
          </button>
          <button className="h-[174px] w-[844px] bg-white rounded-full text-[64px] mt-[50px]">
            БАЙГУУЛЛАГА
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Ebarimt;
