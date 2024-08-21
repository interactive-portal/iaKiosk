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
      className="rounded-full lg:py-14 lg:px-10 xs:px-4 xs:py-6 cursor-pointer "
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );

  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      <div className="text-[#A68B5C] lg:text-8xl xs:text-5xl  text-center lg:mt-[300px] ">
        welcome
      </div>
      <div className="w-full flex flex-col lg:gap-y-10  xs:gap-y-5  lg:text-6xl xs:text-3xl text-center lg:mt-[150px] ">
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
