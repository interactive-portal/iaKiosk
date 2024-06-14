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

  console.log(readyData);

  return (
    <Layout>
      <div className="text-center text-[#A68B5C] text-[64px]">ИЛЭРЦ</div>
      <div className="text-white flex items-center justify-center min-w-[800px]">
        <div className="grid grid-cols-2 gap-4  p-6 rounded-lg w-full text-[32px] text-start">
          <div className="flex justify-between flex-col gap-y-2">
            <span>ГЭРЭЭНИЙ ДУГААР</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              2400123
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>ОВОГ</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              ЦЭЦЭГ
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>СЕРИАЛ ДУГААР</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              463135
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>НЭР</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              НОМИНЗАЯА
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>РЕГИСТЕР</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              НЭ56220345
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>БАЙГУУЛСАН ОГНОО</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              2024.02.27
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>ТӨЛӨВ</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              ШИНЭ
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>ҮЙЛЧИЛГЭЭНИЙ НЭР</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              ФИТНЕСС
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>БАГЦЫН ХУГАЦАА</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              3 САР
            </span>
          </div>
          <div className="flex justify-between flex-col gap-y-2">
            <span>ЭХЛЭХ ДУУСАХ ОГНОО</span>
            <span className="bg-white px-3 py-1 rounded-[20px] text-[#525050]">
              2024.02.27 - 2024.06.27
            </span>
          </div>
        </div>
      </div>
      <div className="text-white">
        {JSON.stringify(readyData?.result, undefined, 4)}
      </div>
    </Layout>
  );
};

export default UserInfo;
