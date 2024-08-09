import { Modal } from "antd";
import KioskLayout from "../kioskLayout";
import { useRouter } from "next/router";
import React, { useState } from "react";

import BlockDiv from "@/components/common/Block/BlockDiv";
import Layout from "../kioskLayout";
import CheckUser from "../member/checkUser";
// import CheckUser from "../extend/checkUser";

interface HomeData {
  pageName: string;
  path: string;
  bgColor: string;
  textColor: string;
}

const Home = () => {
  const homeData: HomeData[] = [
    {
      pageName: "БҮРТГЭЛТЭЙ ГИШҮҮН",
      path: "/kiosk/extend",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
    {
      pageName: "ШИНЭЭР БҮРТГҮҮЛЭХ",
      path: "/kiosk/register",
      bgColor: "#D9D9D9",
      textColor: "#525050",
    },
    {
      pageName: "ҮНИЙН МЭДЭЭЛЭЛ",
      path: "/kiosk/price",
      bgColor: "#A68B5C",
      textColor: "#ffffff",
    },
  ];

  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const Button: React.FC<HomeData> = ({
    pageName,
    path,
    bgColor,
    textColor,
  }) => (
    <div
      className="rounded-[76px] py-6 cursor-pointer"
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );

  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      <div className="text-[#A68B5C] text-[48px] md:text-[96px] mt-[100px] md:mt-[250px] text-center ">
        welcome
      </div>
      <div className="w-[80%] md:w-[836px] mx-auto flex flex-col gap-y-8 md:gap-y-14 text-[32px] md:text-[64px] mt-[50px] md:mt-[200px] text-center">
        {homeData.map((item, index) => (
          <Button
            key={index}
            pageName={item.pageName}
            path={item.path}
            bgColor={item.bgColor}
            textColor={item.textColor}
          />
        ))}
      </div>
      {/* <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={false}
        footer={false}
        destroyOnClose
      >
        <CheckUser setOpenModal={setOpenModal} />
      </Modal> */}
    </Layout>
  );
};

export default Home;
