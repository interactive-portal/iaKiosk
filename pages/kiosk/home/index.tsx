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

  const ButtonList: React.FC<HomeData> = ({
    pageName,
    path,
    bgColor,
    textColor,
  }) => (
    <div
      className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
      // style={{ backgroundColor: bgColor, color: textColor }}
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );

  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      <div className="mx-auto  flex flex-col gap-10">
        <div className="text-[#A68B5C] pagetitle  text-center  uppercase  mb-6">
          welcome
        </div>
        <div className="w-3/5 mx-auto flex flex-col gap-6 text-center  px-8">
          {homeData.map((item, index) => (
            <ButtonList
              key={index}
              pageName={item.pageName}
              path={item.path}
              bgColor={item.bgColor}
              textColor={item.textColor}
            />
          ))}
        </div>
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
