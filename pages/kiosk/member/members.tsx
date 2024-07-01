import React, { ChangeEvent } from "react";
import { FaExchangeAlt, FaTrash } from "react-icons/fa";

interface MembersProps {
  number: number;
  name: string;
  registration: string;
  serial: string;
  handleChange: (index: number, field: string, value: string) => void;
}

const Members: React.FC<MembersProps> = ({
  number,
  name,
  registration,
  serial,
  handleChange,
}) => {
  const handleInputChange =
    (field: string) => (e: ChangeEvent<HTMLInputElement>) => {
      handleChange(number - 1, field, e.target.value);
    };

  return (
    <div className="p-4 w-full text-white mb-4">
      <p className="text-[40px] mb-4 text-start">ГИШҮҮН {number}</p>
      <div className="grid grid-cols-2 gap-4 items-center">
        <div>
          <p className="text-[32px] text-white text-start">ОВОГ</p>
          <input
            type="text"
            value={name}
            onChange={handleInputChange("name")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white text-black"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start">РЕГИСТЕР</p>
          <input
            type="text"
            value={registration}
            onChange={handleInputChange("registration")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white text-black"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start">СЕРИАЛ ДУГААР</p>
          <input
            type="text"
            value={serial}
            onChange={handleInputChange("serial")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white text-black"
          />
        </div>
        <div className="flex justify-center gap-8 mt-10">
          <button className="text-[30px] p-2 rounded-full">
            <FaExchangeAlt />
          </button>
          <button className="text-[30px] p-2 rounded-full">
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Members;
