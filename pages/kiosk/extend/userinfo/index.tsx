import Layout from "../../kioskLayout";
import { useRouter } from "next/router";

const FIELDS = [
  { label: "ГЭРЭЭНИЙ ДУГААР", key: "contractcode" },
  { label: "СЕРИАЛ ДУГААР", key: "serialNumber" },
  { label: "ОВОГ", key: "lastname" },
  { label: "НЭР", key: "customername" },
  { label: "РЕГИСТЕР", key: "stateregnumber" },
  { label: "ҮЙЛЧИЛГЭЭНИЙ НЭР", key: "itemname" },
  { label: "БАГЦЫН ХУГАЦАА", key: "durationtype" },
  { label: "ТӨЛӨВ", key: "wfmstatusname" },
  { label: "БАЙГУУЛСАН ОГНОО", key: "contractdate" },
  { label: "ЭХЛЭХ ДУУСАХ ОГНОО", key: "startdate" },
];

const UserInfo = () => {
  const router = useRouter();
  const { user } = router.query;
  const userString = Array.isArray(user) ? user[0] : user;
  let userData = null;
  try {
    userData = userString ? JSON.parse(decodeURIComponent(userString)) : null;
  } catch (error) {
    console.error("Error parsing user data:", error);
    userData = null;
  }

  if (Array.isArray(userData)) {
    userData = userData[0];
  }

  const contractData = userData?.result || [];

  if (!userData) return <div>No user data available</div>;

  const renderField = (field: any, data: any) => {
    const value = data[field.key] || "No data";
    return (
      <div key={field.key} className="flex justify-between flex-col gap-y-2">
        <span>{field.label}</span>
        <span className="bg-white px-5 rounded-[20px] text-[#525050]">
          {value}
        </span>
      </div>
    );
  };

  const handleExtendClick = (contract: any) => {
    router.push({
      pathname: "/kiosk/extend/userinfo/stretch",
      query: {
        contractid: contract.contractid,
        itemname: contract.itemname,
        customername: contract.customername,
        stateregnumber: contract.stateregnumber,
        lastname: contract.lastname,
        serialNumber: contract.serialNumber,
      },
    });
  };

  return (
    <Layout>
      <div className="flex flex-col ">
        <div className="text-center text-[#A68B5C] text-[64px]">ИЛЭРЦ</div>
        {contractData.length > 0 ? (
          contractData.map((contract: any, index: number) => (
            <div key={index} className="mb-10 px-[120px] overscroll-contain ">
              <div className="text-center text-[#A68B5C] text-[48px]">
                {contract.itemname || "No item name available"}
              </div>
              <div className="text-white flex items-center justify-center min-w-[800px]">
                <div className="grid grid-cols-2 gap-4 rounded-lg w-full text-[32px] text-start items-start">
                  {FIELDS.map((field) => renderField(field, contract))}
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  onClick={() => handleExtendClick(contract)} // Pass the contractId here
                  className="mt-5 flex text-[40px] items-center h-[64px] bg-[#A68B5C] rounded-full w-[349px] text-white justify-center gap-10"
                >
                  СУНГАЛТ ХИЙХ
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-[#A68B5C] text-[32px] mt-8">
            No contracts available.
          </div>
        )}
      </div>
    </Layout>
  );
};

export default UserInfo;
