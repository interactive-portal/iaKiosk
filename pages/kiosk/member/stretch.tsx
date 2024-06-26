import React, { useState } from "react";
import Layout from "../kioskLayout";
import Members from "./members";
import { useRouter } from "next/navigation";

const Stretch = () => {
  const router = useRouter();
  const [members, setMembers] = useState([
    { name: "ЦЭЦЭГ", registration: "НЭ56220345", serial: "463135" },
    { name: "ЦЭЦЭГ", registration: "НЭ56220345", serial: "463135" },
    { name: "ЦЭЦЭГ", registration: "НЭ56220345", serial: "463135" },
  ]);

  const handleChange = () => {
    const newMembers = [...members];
    // newMembers[index][field] = value;
    setMembers(newMembers);
  };

  return (
    <Layout>
      <p className="text-[64px] font-medium text-[#A68B5C] text-center mb-8">
        БАССЕЙН БАГЦ
      </p>
      <div>
        {members.map((member, index) => (
          <Members
            key={index}
            number={index + 1}
            name={member.name}
            registration={member.registration}
            serial={member.serial}
            handleChange={handleChange}
          />
        ))}
      </div>
      <div className="flex justify-center mb-8 mt-[100px]">
        <button
          className="text-black bg-white text-[40px] py-2 px-4 rounded-2xl"
          onClick={() =>
            setMembers([...members, { name: "", registration: "", serial: "" }])
          }
        >
          ГИШҮҮН НЭМЭХ
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => router.push("/kiosk/extend")}
          className="bg-[#A68B5C] text-white h-[64px] px-4 rounded-2xl text-[40px] w-[378px]"
        >
          СУНГАЛТ ХИЙХ
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <p className="text-[#525050] text-[40px] mt-[50px]">
          НЭГ БАГЦ 3-5 ГИШҮҮНТЭЙ БАЙНА.
        </p>
      </div>
    </Layout>
  );
};

export default Stretch;
