import React, { useState, useEffect } from "react";
import Layout from "../kioskLayout";
import Members from "./members";
import { useRouter } from "next/router";
import { Modal, Input, Button } from "antd";

const Stretch = () => {
  const router = useRouter();
  const [members, setMembers] = useState([
    { name: "", registration: "", serial: "" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    registration: "",
    serial: "",
  });

  useEffect(() => {
    if (router.isReady) {
      const { itemname, customername, stateregnumber, serialNumber } =
        router.query;

      const getStringValue = (value: string | string[] | undefined): string => {
        if (Array.isArray(value)) {
          return value[0];
        }
        return value ?? "No data";
      };

      setMembers([
        {
          name: getStringValue(customername),
          registration: getStringValue(stateregnumber),
          serial: getStringValue(serialNumber),
        },
      ]);
    }
  }, [router.isReady, router.query]);

  const handleChange = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember({ ...newMember, [name]: value });
  };

  const handleAddMember = () => {
    setMembers([...members, newMember]);
    setNewMember({ name: "", registration: "", serial: "" });
    setShowModal(false);
  };

  return (
    <Layout>
      <p className="text-[64px] font-medium text-[#A68B5C] text-center mb-8">
        {router.query.itemname || "No item name"}
      </p>
      <div className="self-start">
        {members.map((member, index) => (
          <Members
            key={index}
            number={index + 1}
            name={member.name}
            registration={member.registration}
            serial={member.serial}
            handleChange={() => {}} // Provide a no-op function here
          />
        ))}
      </div>

      <div className="flex justify-center mb-8 mt-[80px]">
        <button
          className="text-black bg-white text-[40px] h-[80px] w-[378px] rounded-2xl"
          onClick={handleChange}
        >
          ГИШҮҮН НЭМЭХ
        </button>
      </div>
      <div className="flex justify-center">
        <button
          onClick={() => router.push("/kiosk/extend/userinfo")}
          className="bg-[#A68B5C] text-white h-[80px] rounded-2xl text-[40px] w-[378px]"
        >
          СУНГАЛТ ХИЙХ
        </button>
      </div>
      <div className="flex justify-center mt-6">
        <p className="text-[#525050] text-[40px] mt-[50px]">
          НЭГ БАГЦ 3-5 ГИШҮҮНТЭЙ БАЙНА.
        </p>
      </div>

      {/* Ant Design Modal */}
      <Modal
        title="Шинэ гишүүн нэмэх"
        visible={showModal}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Хаах
          </Button>,
          <Button key="submit" type="primary" onClick={handleAddMember}>
            Нэмэх
          </Button>,
        ]}
      >
        <Input
          name="name"
          value={newMember.name}
          onChange={handleInputChange}
          placeholder="Гишүүний нэр"
          className="mb-4"
        />
        <Input
          name="registration"
          value={newMember.registration}
          onChange={handleInputChange}
          placeholder="Бүртгэлийн дугаар"
          className="mb-4"
        />
        <Input
          name="serial"
          value={newMember.serial}
          onChange={handleInputChange}
          placeholder="Серийн дугаар"
          className="mb-4"
        />
      </Modal>
    </Layout>
  );
};

export default Stretch;
