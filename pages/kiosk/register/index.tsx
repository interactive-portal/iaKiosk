import { useRouter } from "next/router";
import Layout from "../kioskLayout";
import useSWR from "swr";
import Cookies from "js-cookie";
import _ from "lodash";

const Register = () => {
  const router = useRouter();
  const { userdata } = router.query;
  console.log("aaaaaaa===========>?", userdata);

  const criteria = JSON.stringify({
    classificationname: [
      {
        operator: "=",
        operand: router.query.n,
      },
    ],
  });

  let { data, error, mutate } = useSWR(`
  /api/get-data?metaid=1722848580347088&criteria=${criteria}
  `);

  const readyData = data ? data?.result : [];

  Cookies.set("customer", { customerId: "1587024272980" });

  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((items, key) => ({
      classificationname: key,
      items: items.map(({ itemtypename, id }) => ({ itemtypename, id })),
    }))
    .value();

  const handleItemClick = (id: string) => {
    router.push(`/kiosk/item/${id}`);
  };

  return (
    <Layout>
      <div className="text-6xl flex flex-col gap-y-10 mt-[300px]">
        <div className="uppercase text-[90px] text-[#A68B5C] mb-[110px] font-bold ">
          БҮРТГЭЛ
        </div>
        {groupByData.map((group) => (
          <div key={group.classificationname} className="flex flex-col gap-10">
            {group.items.map((item) => (
              <div
                key={item.id}
                className="bg-[#D9D9D9] rounded-full text-[#525050] py-[60px] px-[220px] "
                onClick={() => handleItemClick(item.id)}
              >
                {item.itemtypename}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Register;
