import _ from "lodash";
import useSWR from "swr";
import { FC } from "react";

type PropsType = {
  selected?: any;
  setSelected?: any;
};

const LockerList: FC<PropsType> = ({ selected, setSelected }) => {
  const criteria = JSON.stringify({
    lockerType: [
      {
        operator: "=",
        operand: "Фитнес - Эрэгтэй",
      },
    ],
  });
  let {
    data: list,
    error,
    mutate,
  } = useSWR(`
/api/get-data?metaid=1712127875302801&criteria=${criteria}
`);

  if (_.isEmpty(list?.result)) {
    return;
  }

  const orderList = _.orderBy(list?.result, ["lockernumber"], ["asc"]);

  return (
    <div className="flex items-center max-w-full overflow-x-scroll gap-x-2 scroll">
      {orderList.map((item: any, ind: number) => {
        if (item?.id == null) {
          return (
            <div
              className={`p-4 font-bold text-[28px] border border-[#BBD540] rounded-[11px] cursor-pointer

			  `}
              style={
                selected == item
                  ? {
                      background:
                        "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                      WebkitTextFillColor: "transparent",
                      WebkitBackgroundClip: "text",
                    }
                  : {}
              }
              key={ind}
              onClick={() => setSelected(item)}
            >
              {item?.lockernumber}
            </div>
          );
        }
      })}
      <style>
        {`
			.scroll::-webkit-scrollbar {
				width:2px;
				background:transparent;
				height:5px;
				padding:10px 10px;
			  }
			  .scroll::-webkit-scrollbar-thumb {
				background:#E0E0E0;
				border-radius:10px;
				padding:10px 0px;
			  }
		`}
      </style>
    </div>
  );
};

export default LockerList;
