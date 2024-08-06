import Layout from "../kioskLayout";

const PoolPrice = () => {
  return (
    <Layout>
      <div className="mt-[100px]">
        <p className="flex justify-center text-[#A68B5C] text-[64px]">
          БАССЕЙН
        </p>
      </div>
      <div className="mt-[70px]">
        <div className="flex justify-center p-2 h-[300px]">
          <img
            src="/images/PoolPrice.png"
            alt="Fitness Price"
            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="flex justify-center h-[300px] p-2">
          <img
            src="/images/3,4peoplePrice.png"
            alt="Fitness Hunglult"
            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="flex justify-center h-[300px] p-2">
          <img
            src="/images/5peoplePrice.png"
            alt="Fitness Hunglult"
            className="hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
        <div className="flex">
          <img
            src="/images/fitnessSanamj.png"
            alt="Fitness Sanamj"
            className="h-[168px] w-[506px] hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
          <img
            src="/images/fitnessHunglult.png"
            alt="Fitness Hunglult"
            className="h-[168px] w-[506px] hover:transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        </div>
      </div>
    </Layout>
  );
};

export default PoolPrice;
