import { useRouter } from "next/router";
import useSWR from "swr";
import Cookies from "js-cookie";
import _ from "lodash";
import RegisterLayout from "../register/registerLayout";

const ItemDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log("id-========>?>?????", id);
  const criteria = JSON.stringify({
    filterItemTypeId: [
      {
        operator: "=",
        operand: id,
      },
    ],
  });

  const { data, error, isValidating } = useSWR(
    id
      ? `/api/get-data?metaid=1722854127801134&criteria=${encodeURIComponent(
          criteria
        )}`
      : null
  );

  // Check if data is being loaded
  const isLoading = isValidating && !data && !error;
  const readyData = data ? data.result : [];

  Cookies.set("customer", JSON.stringify({ customerId: "1587024272980" }));

  // Grouping data by the 'name' property
  const groupByData = _.chain(readyData)
    .groupBy("name")
    .map((items, name) => ({
      name,
      image: items[0]?.image,
      title: items[0]?.title,
      items,
    }))
    .value();
  console.log("first", readyData);

  const ddd = process.env.IMAGEROOTURL || "http://172.169.200.57:85/";
  const body = groupByData[0]?.image || "";
  const imgUrlReplaceData = body.replaceAll(
    "storage/uploads",
    `${ddd}storage/uploads`
  );

  // Function to determine grid columns and item width
  const getGridClasses = (itemsCount: any) => {
    if (itemsCount > 3) {
      return "grid-cols-2";
    }
    return "grid-cols-3";
  };

  const getItemWidth = (itemsCount: any) => {
    return itemsCount > 3 ? "w-[400px]" : "w-[290px]";
  };

  if (isLoading) {
    return (
      <RegisterLayout coverImagePath="" title="">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-[32px] text-white">Loading...</div>
        </div>
      </RegisterLayout>
    );
  }

  if (error) {
    return (
      <RegisterLayout coverImagePath="" title="">
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-[32px] text-red-500">Error loading data.</div>
        </div>
      </RegisterLayout>
    );
  }

  return (
    <RegisterLayout coverImagePath={ddd + body} title={groupByData[0]?.title}>
      <div className="mt-[20px] px-[100px]">
        {groupByData.map((group, index) => (
          <div
            className="flex flex-col gap-y-1 text-white uppercase mt-[80px] text-start"
            key={index}
          >
            <div className="text-[40px] text-white">{group.name}</div>
            <div
              className={`grid justify-center gap-10 ${getGridClasses(
                group.items.length
              )}`}
            >
              {group.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className={`flex justify-center ${getItemWidth(
                    group.items.length
                  )}`}
                >
                  <button
                    className={`flex justify-center text-[40px] uppercase rounded-[87px] bg-white/30 px-14 py-2 text-center ${getItemWidth(
                      group.items.length
                    )}`}
                    onClick={() =>
                      router.push({
                        pathname: "/kiosk/form",
                        query: {
                          i: item.id,
                        },
                      })
                    }
                  >
                    {item.durationtype} <br /> {item.saleprice}₮
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </RegisterLayout>
  );
};

export default ItemDetails;
