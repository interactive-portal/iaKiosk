import PriceLayout from "./priceLayout";
import useSWR from "swr";
import { useRouter } from "next/router";
import _ from "lodash";
import Cookies from "js-cookie";

const Pool = () => {
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
  /api/get-data?metaid=1701156148201731&criteria=${criteria}
  `);

  const readyData = data ? data?.result : [];

  Cookies.set("customer", { customerId: "1587024272980" });

  const groupByData = _.chain(readyData)
    .groupBy("classificationname")
    .map((value, key, wrapped) => {
      return { [key]: value };
    })
    .value();

  return (
    <PriceLayout coverImagePath="/images/pool.png" title={router.query?.n}>
      <div className="flex flex-col gap-y-6 max-h-[1200px] overflow-auto">
        {groupByData?.map((obj: any, ind: number) => {
          const rowData = _.values(obj)?.[0];
          return (
            <div
              className="flex flex-col gap-y-3 text-white uppercase"
              key={ind}
            >
              <div className="text-[40px]">{_.keys(obj)?.[0]}</div>
              <div className="flex items-center gap-x-4">
                {rowData?.map((rowItem: any, rowInd: number) => {
                  console.log(rowItem);
                  return (
                    <div
                      className="flex flex-col items-center text-[40px] rounded-[87px] bg-white/30 px-10"
                      key={rowInd}
                      onClick={() =>
                        router.push({
                          pathname: "/kiosk/form",
                          query: {
                            i: rowItem?.id,
                          },
                        })
                      }
                    >
                      <span>{rowItem?.monthname}</span>
                      <span>{rowItem?.saleprice}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </PriceLayout>
  );
};

export default Pool;
