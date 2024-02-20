import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import moment from "moment";
import { useContext } from "react";

const Events = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const colors = [
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
    "#F3E686",
    "#B6CCBC",
    "#D7D0C5",
    "#AEC1D1",
  ];
  return (
    <div className="flex flex-col gap-y-4 mx-10">
      {readyDatasrc.map((item: any, index: number) => {
        let left = true;
        if (index % 2) {
          left = true;
        } else {
          left = false;
        }
        return (
          <div
            className={` bg-[${colors[index]}] flex ${
              left && "flex-row-reverse"
            } gap-x-5 `}
            style={{
              background: colors[index],
            }}
            key={index}
          >
            <div
              className={`${
                left ? "text-left" : "text-right"
              }  flex flex-col gap-y-4 justify-center`}
            >
              <p className="text-[20px] uppercase font-medium">{item?.title}</p>
              <p className="text-[16px] uppercase">{item.description}</p>
              <p className="text-[16px] uppercase">
                {moment(item?.startdate).format("YYYY-MM-DD")} -{" "}
                {moment(item?.endate).format("YYYY-MM-DD")}
              </p>
              {/* <p className="text-[16px] uppercase">Tax : free</p> */}
            </div>
            <img
              src={`http://riverclub.veritech.mn:85/${item?.photo}`}
              className="w-[237px] h-[237px] object-cover"
            />
            <div
              className={`${
                left ? "pl-5" : "pr-5"
              } h-full flex flex-col items-start mt-4 text-[20px] font-medium min-w-[73px]`}
            >
              <p>{moment(item?.startdate).format("MM-DD")}</p>
              <p>{moment(item?.endate).format("MM-DD")}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Events;
