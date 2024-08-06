import Layout from "../kioskLayout";
import PriceLayout from "./priceLayout";

const SaunaPrice = () => {
  return (
    <Layout>
      <div>
        <p className="flex justify-center text-[#A68B5C] text-[64px]">САУН</p>
      </div>
      <div className="mt-[70px] ">
        <img
          src="/images/saunTarip1.png"
          alt="Fitness Price"
          className="h-[300px] hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <img
          src="/images/saunTarip.png"
          alt="Fitness Price"
          className="h-[300px] hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        <div className="grid justify-center w-full">
          <img
            src="/images/fitnessSanamj.png"
            alt="Fitness Sanamj"
            className="h-[316px]  hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src="/images/fitnessHunglult.png"
            alt="Fitness Hunglult"
            className="h-[316px]  hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </Layout>
  );
};

export default SaunaPrice;
