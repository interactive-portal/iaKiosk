import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <div
      className="max-w-[1080px] h-screen 2xl:w-[1000px]  2xl:h-[1800px] overflow-hidden"
      onClick={() => router.push("/kiosk/home")}
      style={{
        backgroundImage: "url(/images/layout.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      Get start
    </div>
  );
};

export default Page;
