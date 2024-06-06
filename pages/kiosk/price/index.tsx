import Layout from "../kioskLayout";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mb-10">
        үнийн мэдээлэл
      </div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-14 text-[64px]">
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/pool")}
        >
          БАССЕЙН
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/fitness")}
        >
          ФИТНЕСС
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/saun")}
        >
          САУН
        </div>
        <div
          className="bg-white rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price/skovsh")}
        >
          СКВОШ
        </div>
        <div
          className="bg-[#A68B5C] rounded-[76px] text-[#FFFFFF] py-[40px]"
          onClick={() => router.push("/kiosk/price/combo")}
        >
          ХОСОЛСОН БАГЦ
        </div>
      </div>
    </Layout>
  );
};

export default Page;
