import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();
  return (
    <div
      className="max-w-[1080px] h-screen  overflow-hidden"
      onClick={() => router.push("/kiosk/home")}
      style={{
        backgroundImage: "url(/images/layout.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    ></div>
  );
};

export default Page;
