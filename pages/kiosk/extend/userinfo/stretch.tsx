import useSWR from "swr";
import Layout from "../../kioskLayout";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

interface UserField {
  label: string;
  key: string;
}

interface ContractField {
  label: string;
  key: string;
}

interface ReadyData {
  result: {
    [key: string]: any;
    contracts?: any[];
  };
}

const Stretch: React.FC = () => {
  const router = useRouter();
  const param = JSON.stringify({
    customerId: router.query?.c || "17176708640733",
  });

  const { data: readyData } = useSWR<ReadyData>(
    `/api/get-process?command=fit_ContractPackage_DV_004&parameters=${param}`
  );

  const userFields: UserField[] = [
    { label: "ОВОГ", key: "lastName" },
    { label: "НЭР", key: "firstName" },
    { label: "РЕГИСТЕР", key: "registration" },
    { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },
  ];

  const contractFields: ContractField[] = [
    { label: "ҮЙЛЧИЛГЭЭ", key: "service" },
    { label: "ХУГАЦАА СОНГОХ", key: "chooseWhen" },
    { label: "ҮНИЙН МЭДЭЭЛЭЛ", key: "priceInfo" },
    { label: "ХӨНГӨЛӨЛТ", key: "discount" },
    { label: "ХӨНГӨЛӨЛДСӨН ҮНИЙН ДҮН", key: "discountedPrice" },
    { label: "ЭХЛЭХ ОГНОО", key: "startDate" },
    { label: "ДУУСАХ ОГНОО", key: "endDate" },
  ];

  const getFieldValue = (data: any, key: string) => {
    return data?.[key] || "N/A";
  };

  const [userData, setUserData] = useState<{ [key: string]: string }>({});
  const [contractData, setContractData] = useState<
    Array<{ [key: string]: string }>
  >([]);

  useEffect(() => {
    if (readyData) {
      const userInfo: { [key: string]: string } = {};
      userFields.forEach((field) => {
        userInfo[field.key] = getFieldValue(readyData.result, field.key);
      });
      setUserData(userInfo);

      const contracts =
        readyData.result.contracts?.map((contract: any) => {
          const contractInfo: { [key: string]: string } = {};
          contractFields.forEach((field) => {
            contractInfo[field.key] = getFieldValue(contract, field.key);
          });
          return contractInfo;
        }) || [];
      setContractData(contracts);
    }
  }, [readyData]);

  return (
    <Layout>
      <div className="text-center text-[#A68B5C] text-[64px]">СУНГАЛТ</div>

      <div className="text-white px-[100px] flex items-center justify-center min-w-[800px]">
        <div className="grid grid-cols-2 gap-4 p-6 rounded-lg w-full text-[32px] text-start">
          {userFields.map((field) => (
            <div key={field.key} className="flex flex-col gap-y-2">
              <span>{field.label}</span>
              <input
                type="text"
                value={userData[field.key]}
                readOnly
                className="bg-white px-3 py-1 rounded-[20px] text-[#525050]"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="px-[100px]  mt-[100px] w-full text-[40px] text-start ">
        {contractFields.map((field) => (
          <div className="flex justify-between items-center text-white mt-[25px] ">
            <p>{field.label}</p>
            <input
              type="text"
              className="bg-[#D9D9D94D] border-white border-2 px-3 py-1 rounded-2xl text-[#525050] w-[430px] h-[86px]"
            />
          </div>
        ))}
      </div>

      {/* {contractData.length > 0 &&
        contractData.map((contract, index) => (
          <div
            key={index}
            className="text-white flex items-center justify-center min-w-[800px] mb-8"
          >
            <div className="grid grid-cols-2 gap-4 p-6 rounded-lg w-full text-[32px] text-start">
              {contractFields.map((field) => (
                <div key={field.key} className="flex flex-col gap-y-2">
                  <span>{field.label}</span>
                  <input
                    type="text"
                    value={contract[field.key]}
                    readOnly
                    className="bg-white px-3 py-1 rounded-full text-[#525050]"
                  />
                </div>
              ))}
            </div>
          </div>
        ))} */}

      <div className="flex mt-[80px] justify-center">
        <button
          className="flex text-[64px] items-center  bg-[#A68B5C] h-[120px] rounded-2xl w-[619px] text-white justify-center gap-10"
          onClick={() => router.push("/kiosk/sell/pay/")}
        >
          ТӨЛБӨР ТӨЛӨХ
        </button>
      </div>
    </Layout>
  );
};

export default Stretch;
