import { useRouter } from "next/router";
import Layout from "../kioskLayout";

const Register = () => {
  const router = useRouter();

  return (
    <Layout>
      <div className="text-[64px] flex flex-col gap-y-10 mt-[120px]">
        <div className="uppercase text-[90px] text-[#A68B5C] mb-10 w-[844px]">
          БҮРТГЭЛ
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/pool")}
        >
          БАССЕЙН
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/fitness")}
        >
          ФИТНЕСС
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/sauna")}
        >
          САУН
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/squash")}
        >
          СКВОШ
        </div>
        <div
          className="bg-[#A68B5C] rounded-full text-[#FFFFFF] py-[40px]"
          onClick={() => router.push("/kiosk/register/combo")}
        >
          ХОСОЛСОН БАГЦ
        </div>
      </div>
    </Layout>
  );
};

export default Register;
