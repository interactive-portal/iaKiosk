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
<<<<<<< Updated upstream
      className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
=======
      className="rounded-full md:text-[64px] xs:text-[30px] md:py-5 xs:py-4 xs:px-6 cursor-pointer obtn xs:w-full"
      style={{ backgroundColor: bgColor, color: textColor }}
>>>>>>> Stashed changes
      onClick={() => handleNavigation(path)}
    >
      {pageName}
    </div>
  );
};

export default ButtonList;
