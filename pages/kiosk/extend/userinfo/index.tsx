import useSWR from "swr";
import Layout from "../../kioskLayout";
import { useRouter } from "next/router";

const UserInfo = () => {
  const router = useRouter();
  const param = JSON.stringify({
    customerId: router.query?.c || "17176708640733",
  });
  let { data: readyData } = useSWR(
    `/api/get-process?command=fit_ContractPackage_DV_004&parameters=${param}`
  );

  const fields = [
    { label: "ГЭРЭЭНИЙ ДУГААР", key: "contractNumber" },
    { label: "ОВОГ", key: "lastName" },
    { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },
    { label: "НЭР", key: "firstName" },
    { label: "РЕГИСТЕР", key: "registration" },
    { label: "БАЙГУУЛСАН ОГНОО", key: "contractDate" },
    { label: "ТӨЛӨВ", key: "status" },
    { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", key: "serviceName" },
    { label: "БАГЦЫН ХУГАЦАА", key: "packageDuration" },
    { label: "ЭХЛЭХ ДУУСАХ ОГНОО", key: "startEndDate" },
  ];

  const fields2 = [
    { label: "ГЭРЭЭНИЙ ДУГААР", key: "contractNumber" },
    { label: "ОВОГ", key: "lastName" },
    { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },
    { label: "НЭР", key: "firstName" },
    { label: "РЕГИСТЕР", key: "registration" },
    { label: "БАЙГУУЛСАН ОГНОО", key: "contractDate" },
    { label: "ТӨЛӨВ", key: "status" },
    { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", key: "serviceName" },
    { label: "БАГЦЫН ХУГАЦАА", key: "packageDuration" },
    { label: "ЭХЛЭХ ДУУСАХ ОГНОО", key: "startEndDate" },
  ];

  const getFieldValue = (key: string) => {
    return readyData?.result?.[key] || "Null";
  };

  return (
    <Layout>
      <div>
        <div className="text-center text-[#A68B5C] text-[64px]">ИЛЭРЦ</div>
        <div className="text-white flex items-center justify-center min-w-[800px]">
          <div className="grid grid-cols-2 gap-4 rounded-lg w-full text-[32px] text-start">
            {fields.map((field) => (
              <div
                key={field.key}
                className="flex justify-between flex-col gap-y-2"
              >
                <span>{field.label}</span>
                <span className="bg-white px-5  rounded-[20px] text-[#525050]">
                  {getFieldValue(field.key)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button className="mt-5 flex text-[40px] items-center h-[64px] bg-[#A68B5C] rounded-full w-[349px] text-white justify-center gap-10">
            СУНГАЛТ ХИЙХ
          </button>
        </div>
        <div className="text-center text-white mt-5 text-[40px]">СКОВШ</div>
        <div className="text-white flex items-center justify-center min-w-[800px]">
          <div className="grid grid-cols-2 gap-4  rounded-lg w-full text-[32px] text-start">
            {fields.map((field) => (
              <div
                key={field.key}
                className="flex justify-between flex-col gap-y-2"
              >
                <span>{field.label}</span>
                <span className="bg-white px-5 rounded-[20px] text-[#525050]">
                  {getFieldValue(field.key)}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="mt-5  flex text-[40px] items-center h-[64px] bg-[#A68B5C] rounded-full w-[349px] text-white justify-center gap-10"
            onClick={() => router.push("riosk/extend/stretch")}
          >
            СУНГАЛТ ХИЙХ
          </button>
        </div>
        {/* <div className="text-white">
        {JSON.stringify(readyData?.result, undefined, 4)}
      </div> */}
      </div>
    </Layout>
  );
};

export default UserInfo;
