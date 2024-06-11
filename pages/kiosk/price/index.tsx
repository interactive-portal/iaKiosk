import useSWR from "swr";
import Layout from "../kioskLayout";
import { useRouter } from "next/router";
import _ from "lodash";

const Page = () => {
  const { data, error, mutate } = useSWR(`
  /api/get-data?metaid=1701156148201731
`);

  const readyData = data ? data?.result : [];

  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  const router = useRouter();
  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mb-10">бүртгэл</div>
      <div className="w-[836px] mx-auto flex flex-col gap-y-14 text-[64px] max-h-[1200px] overflow-auto">
        {groupByData?.map((item: any, ind: number) => {
          const rowItem = _.keys(item)?.[0];
          return (
            <div
              key={ind}
              className="bg-white rounded-[76px] text-[#525050] py-[40px]"
              onClick={() =>
                router.push({
                  pathname: "/kiosk/price/pool",
                  query: {
                    n: rowItem,
                  },
                })
              }
            >
              {rowItem}
            </div>
          );
        })}
      </div>
    </Layout>
  );
};

export default Page;
