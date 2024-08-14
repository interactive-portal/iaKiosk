import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div
      className="w-screen h-screen flex flex-col  justify-center items-center  "
      style={{
        backgroundImage: "url(/images/home1.png)",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="w-full py-6 md:py-10 flex items-center justify-center uppercase">
        <img
          src="/images/logo.png"
          alt="home"
          className="max-w-[100px] md:max-w-[400px]"
          onClick={() => router.push("/kiosk/home")}
        />
      </div>
      <div className="flex justify-center uppercase h-screen text-center lg:items-start w-full overflow-y-auto">
        <div>{children}</div>
      </div>
      <div>
        <button
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 text-white uppercase text-[24px] md:text-[48px]"
          onClick={() => router.push("/kiosk")}
        >
          home
        </button>
        <button
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-white uppercase text-[24px] md:text-[48px]"
          onClick={() => router.back()}
        >
          back
        </button>
      </div>
    </div>
  );
};

export default Layout;
