import { useRouter } from "next/router";
import Layout from "../kioskLayout";

const Page = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="text-[64px] flex flex-col gap-y-10 mt-[150px]">
        <div className="uppercase text-[90px] text-[#A68B5C]  ">
          ҮНИЙН МЭДЭЭЛЭЛ
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/poolPrice")}
        >
          БАССЕЙН
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/fitnessPrice")}
        >
          ФИТНЕСС
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/saunaPrice")}
        >
          САУН
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/squashPrice")}
        >
          СКВОШ
        </div>
        <div
          className="bg-[#A68B5C] rounded-[76px] text-[#FFFFFF] py-[40px]"
          onClick={() => router.push("/kiosk/register/combo")}
        >
          ХОСОЛСОН БАГЦ
        </div>
      </div>
    </Layout>
  );
};

export default Page;
