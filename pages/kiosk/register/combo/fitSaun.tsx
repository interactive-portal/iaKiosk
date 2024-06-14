import Layout from "../../kioskLayout";

const FitSaun = () => {
  return (
    <Layout>
      <div className="">
        <div className="text-center">
          <p className="text-[64px] text-[#A68B5C]">ХОСОЛСОН БАГЦ</p>
          <p className="text-[96px] text-white mt-20">БАССЕЙН ФИТНЕСС</p>
        </div>
        <div className="flex flex-col gap-y-20 text-white mt-20">
          <div className="">
            <div className="border-b-4 border-white">
              <p className="text-[48px] text-start pb-2">6 САР</p>
            </div>
            <div className="text-end">
              <p className="text-[48px]">6х316,666₮</p>
              <p className="text-[96px] leading-[40px]">2,100,000₮</p>
            </div>
          </div>
          <div className="">
            <div className="border-b-4 border-white">
              <p className="text-[48px] text-start pb-2">12 САР</p>
            </div>
            <div className="text-end">
              <p className="text-[48px]">12х258,333₮</p>
              <p className="text-[96px] leading-[40px]">3,100,000₮</p>
            </div>
          </div>
        </div>
        <div className="text-center text-white mt-[200px]">
          <p className="text-[64px]">САНАМЖ</p>
          <p className="text-[40px]">БАССЕЙН 7 ХОНОГТ 4 УДАА ОРОХ ХЯЗГААРТАЙ</p>
        </div>
      </div>
    </Layout>
  );
};

export default FitSaun;