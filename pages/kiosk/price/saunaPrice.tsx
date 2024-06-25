import PriceLayout from "./priceLayout";

const SaunaPrice = () => {
  return (
    <PriceLayout>
      <div>
        <div>
          <p className="flex justify-center text-[#A68B5C] text-[64px]">САУН</p>
        </div>
        <div className="mt-[70px] ">
          <img
            src="/images/saunTarip1.png"
            alt="Fitness Price"
            className="h-[300px]"
          />
          <img
            src="/images/saunTarip.png"
            alt="Fitness Price"
            className="h-[300px]"
          />
          <div className="grid justify-center w-full">
            <img
              src="/images/fitnessSanamj.png"
              alt="Fitness Sanamj"
              className="h-[316px]"
            />
            <img
              src="/images/fitnessHunglult.png"
              alt="Fitness Hunglult"
              className="h-[316px] "
            />
          </div>
        </div>
      </div>
    </PriceLayout>
  );
};

export default SaunaPrice;
