import React from "react";
import { useRouter } from "next/router";

interface ButtonListProps {
  pageName: string;
  path: string;
  bgColor: string;
  textColor: string;
}

const ButtonList: React.FC<ButtonListProps> = ({
  pageName,
  path,
  bgColor,
  textColor,
}) => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <div
      className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );
};

export default ButtonList;
