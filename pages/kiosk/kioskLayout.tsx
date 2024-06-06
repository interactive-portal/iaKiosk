import { useRouter } from "next/router";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <div
      className="w-full h-screen flex flex-col justify-between relative"
      style={{
        backgroundImage: "url(/images/home1.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        fontFamily: "AG",
      }}
    >
      <div className="w-full py-10 flex items-center justify-center uppercase">
        <img src="/images/logo.png" alt="home" />
      </div>
      <div className="flex items-center my-20 w-full justify-center uppercase h-full text-center">
        <div>{children}</div>
      </div>
      <button
        className="absolute bottom-10 left-10 text-white uppercase text-[48px]"
        onClick={() => router.push("/kiosk")}
      >
        home
      </button>
      <button
        className="absolute bottom-10 right-10 text-white uppercase text-[48px]"
        onClick={() => router.back()}
      >
        back
      </button>
    </div>
  );
};

export default Layout;
