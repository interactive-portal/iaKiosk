import Layout from "../../kioskLayout";
import { useRouter } from "next/router";

const Combo = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mb-10">
        ХОСОЛСОН БАГЦ
      </div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-14 text-[64px]">
        <div className="bg-white rounded-[76px] text-[#525050] py-[40px]">
          БАССЕЙН ФИТНЕСС
        </div>
        <div className="bg-white rounded-[76px] text-[#525050] py-[40px]">
          ФИТНЕСС САУН
        </div>
        <div className="bg-white rounded-[76px] text-[#525050] py-[40px]">
          БАССЕЙН САУН
        </div>
      </div>
    </Layout>
  );
};

export default Combo;
