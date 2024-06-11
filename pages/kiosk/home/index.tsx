import KioskLayout from "../kioskLayout";
import { useRouter } from "next/router";

const Home = () => {
  const router = useRouter();
  return (
    <KioskLayout>
      <div className="text-[#A68B5C] text-[96px] mb-[300px]">welcome</div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-14 text-[64px]">
        <div
          className="bg-[#D9D9D9] rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register")}
        >
          үнийн мэдээлэл
        </div>
        <div
          className="bg-[#D9D9D9] rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/price")}
        >
          ШИНЭ БҮРТГЭЛ
        </div>
        <div
          className="bg-[#D9D9D9] rounded-[76px] text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/extend")}
        >
          БҮРТГЭЛ СУНГАЛТ
        </div>
        <div
          className="bg-[#A68B5C] rounded-[76px] text-[#FFFFFF] py-[40px]"
          onClick={() => router.push("/kiosk/help")}
        >
          ТУСЛАМЖ
        </div>
      </div>
    </KioskLayout>
  );
};

export default Home;
