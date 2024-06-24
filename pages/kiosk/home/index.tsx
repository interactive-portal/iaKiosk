import KioskLayout from "../kioskLayout";
import { useRouter } from "next/router";
import React from "react";

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
      path: "/kiosk/member",
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
      className="rounded-[76px] py-[40px] cursor-pointer"
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );

  return (
    <KioskLayout>
      <div className="text-[#A68B5C] text-[96px] mt-[250px]">welcome</div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-8 text-[64px] mt-[150px]">
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
    </KioskLayout>
  );
};

export default Home;
