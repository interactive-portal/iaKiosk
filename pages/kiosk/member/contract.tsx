import React, { useState, ChangeEvent } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/navigation";

interface Field {
  label: string;
  value: string;
}

interface ContractData {
  title: string;
  fields: Field[];
}

interface Data {
  lastName: string;
  registration: string;
  contracts: ContractData[];
}

const Contract: React.FC = () => {
  const router = useRouter();
  const [data, setData] = useState<Data>({
    lastName: "ЦЭЦЭГ",
    registration: "НЭ56220345",
    contracts: [
      {
        title: "ФИТНЕСС",
        fields: [
          { label: "ГЭРЭЭНИЙ ДУГААР", value: "2400123" },
          { label: "БАЙГУУЛСАН ОГНОО", value: "2024.02.27" },
          { label: "СЕРИАЛ ДУГААР", value: "463135" },
          { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", value: "ФИТНЕСС" },
        ],
      },
      {
        title: "БАССЕЙН БАГЦ",
        fields: [
          { label: "ГЭРЭЭНИЙ ДУГААР", value: "2400123" },
          { label: "БАЙГУУЛСАН ОГНОО", value: "2024.02.27" },
          { label: "СЕРИАЛ ДУГААР", value: "463135" },
          { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", value: "ФИТНЕСС" },
        ],
      },
    ],
  });

  const handleChange = (
    contractIndex: number,
    fieldIndex: number,
    value: string
  ) => {
    const newContracts = [...data.contracts];
    newContracts[contractIndex].fields[fieldIndex].value = value;
    setData({ ...data, contracts: newContracts });
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    key: keyof Data
  ) => {
    setData({ ...data, [key]: event.target.value });
  };

  return (
    <Layout>
      <p className="text-[64px] font-medium text-[#A68B5C] text-center mb-8">
        ИЛЭРЦ
      </p>
      <div className="flex gap-16 mb-8">
        <div>
          <p className="text-[32px] text-white text-start">ОВОГ</p>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => handleInputChange(e, "lastName")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white"
          />
        </div>
        <div>
          <p className="text-[32px] text-white text-start">РЕГИСТЕР</p>
          <input
            type="text"
            value={data.registration}
            onChange={(e) => handleInputChange(e, "registration")}
            className="flex text-[30px] justify-end items-center rounded-3xl px-4 h-[43px] w-[349px] bg-white"
          />
        </div>
      </div>

      {data.contracts.map((contract, contractIndex) => (
        <div key={contractIndex} className="p-8 rounded-3xl text-white mb-8 ">
          <p className="text-[40px] p-4">{contract.title}</p>
          <div className="grid grid-cols-2 gap-4">
            {contract.fields.map((field, fieldIndex) => (
              <div key={fieldIndex}>
                <p className="text-[32px] text-start">{field.label}</p>
                <input
                  type="text"
                  value={field.value}
                  onChange={(e) =>
                    handleChange(contractIndex, fieldIndex, e.target.value)
                  }
                  className="bg-white rounded-3xl font-medium text-[30px] px-4 h-[43px] w-full text-black"
                />
              </div>
            ))}

            <div>
              <p className="text-[32px] text-start">ЭХЛЭХ ДУУСАХ ОГНОО</p>
              <input
                type="date"
                className="bg-white rounded-3xl font-medium text-[30px] px-4 h-[43px] w-full text-black"
              />
            </div>

            <button
              onClick={() => router.push("/kiosk/member/stretch")}
              className=" h-[64px] text-center bg-[#A68B5C] text-white text-[40px] w-[349px] rounded-3xl mt-[40px]"
            >
              <p className="flex justify-center items-center">СУНГАЛТ ХИЙХ</p>
            </button>
          </div>
        </div>
      ))}
    </Layout>
  );
};

export default Contract;
