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
      <div className=" flex flex-col gap-y-10 ">
        <div className="uppercase  pagetitle">БҮРТГЭЛ</div>
        {groupByData.map((group) => (
          <div
            key={group.classificationname}
            className="w-4/5 mx-auto flex flex-col gap-6 text-center  px-4"
          >
            {group.items.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="rounded-full text-[64px] sm:text-[48px] py-5 cursor-pointer obtn"
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
