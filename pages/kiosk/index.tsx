import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <div
      className="max-w-[1080px] h-screen 2xl:w-[1000px]  2xl:h-[1800px] overflow-hidden"
      onClick={() => router.push("/kiosk/home")}
      style={{
        backgroundImage: "url(/images/homeLayout.png)",
        // backgroundImage: "url(/images/layout.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="flex justify-center md:mt-[700px] xs:mt-[300px]">
        <img
          src="/images/logo.png"
          alt=""
          className="md:h-[150px] xs:h-[50px] "
        />
      </div>
      <div className="flex justify-center">
        <p className="md:text-[60px] xs:text-[30px]  text-white flex justify-center md:mt-[650px] xs:mt-[270px] uppercase items-center h-[150px] w-[600px] font-medium">
          Get start
        </p>
      </div>
    </div>
  );
};

export default Page;
