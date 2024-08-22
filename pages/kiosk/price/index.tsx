import { useRouter } from "next/router";
import Layout from "../kioskLayout";

const Page = () => {
  const router = useRouter();
  return (
    <Layout>
      <div className="text-[64px] flex flex-col gap-y-10  px-10">
        <div className="uppercase pagetitle ">ҮНИЙН МЭДЭЭЛЭЛ</div>
        <div className="flex flex-col  w-4/5 mx-auto  space-y-4 ">
          <div
            className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
            onClick={() => router.push("/kiosk/price/poolPrice")}
          >
            БАССЕЙН
          </div>
          <div
            className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
            onClick={() => router.push("/kiosk/price/fitnessPrice")}
          >
            ФИТНЕСС
          </div>
          <div
            className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
            onClick={() => router.push("/kiosk/price/saunaPrice")}
          >
            САУН
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Page;
