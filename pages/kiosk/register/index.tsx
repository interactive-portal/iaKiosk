import { useRouter } from "next/router";
import Layout from "../kioskLayout";
import useSWR from "swr";
import Cookies from "js-cookie";
import _ from "lodash";

const Register = () => {
  const router = useRouter();
  const criteria = JSON.stringify({
    classificationname: [
      {
        operator: "=",
        operand: router.query.n,
      },
    ],
  });

  let { data, error, mutate } = useSWR(`
  /api/get-data?metaid=1565658520388&criteria=${criteria}
  `);

  const readyData = data ? data?.result : [];

  Cookies.set("customer", { customerId: "1565658520388" });

  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  console.log("register-------->", groupByData);
  return (
    <Layout>
      <div className="text-[64px] flex flex-col gap-y-10 mt-[120px]">
        <div className="uppercase text-[90px] text-[#A68B5C] mb-10 w-[844px]">
          БҮРТГЭЛ
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/pool")}
        >
          БАССЕЙН
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/fitness")}
        >
          ФИТНЕСС
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/sauna")}
        >
          САУН
        </div>
        <div
          className="bg-white rounded-full text-[#525050] py-[40px]"
          onClick={() => router.push("/kiosk/register/squash")}
        >
          СКВОШ
        </div>
        <div
          className="bg-[#A68B5C] rounded-full text-[#FFFFFF] py-[40px]"
          onClick={() => router.push("/kiosk/register/combo")}
        >
          ХОСОЛСОН БАГЦ
        </div>
      </div>
    </Layout>
  );
};

export default Register;
