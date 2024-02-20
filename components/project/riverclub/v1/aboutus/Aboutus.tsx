import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper";

import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";
import useSWR from "swr";
import _ from "lodash";

const AboutUs = () => {
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
  const data = {
    image: "/images/aboutus.png",
    title: "ӨҮЛЭН",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ",
  };

  let { data: readyData } = useSWR(`
  /api/get-process?command=fitKioskTrainerList_DV_004&parameters=${JSON.stringify(
    {
      id: "1",
    }
  )}
  `);

  if (_.isEmpty(readyData?.result?.fitkioskclassdv)) {
    return;
  }

  return (
    <>
      {readyData?.result?.fitkioskclassdv?.map((obj: any, ind: number) => {
        return (
          <div className="flex flex-col gap-y-">
            <div className="grid grid-cols-12 w-full py-4 px-10">
              <p className="text-[22px] font-normal col-span-2 uppercase">
                {obj?.name}
              </p>
              <p className="col-span-10 uppercase text-[16px]">
                {obj?.description}
              </p>
            </div>
            <div>
              <Swiper slidesPerView={4.5} spaceBetween={20}>
                {!_.isEmpty(obj?.fitkiosktrainerdv) &&
                  obj?.fitkiosktrainerdv.map((item: any, index: number) => {
                    console.log(item);
                    return (
                      <SwiperSlide key={index} className="">
                        <div
                          className={`flex flex-col rounded-lg bg-[${colors[index]}]`}
                          style={{
                            background: colors[index],
                          }}
                        >
                          <img
                            src={data?.image}
                            className="h-[200px] w-full rounded-t-lg object-cover"
                          />
                          <div className="px-4 py-6">
                            <p className="text-[20px]">{item?.trainername}</p>
                            <p className="text-[10px]">{item?.description}</p>
                            <div className="mt-4 flex flex-col gap-y-4">
                              {!_.isEmpty(item?.fitkiosktrainerclass_dv) &&
                                item?.fitkiosktrainerclass_dv?.map(
                                  (obj1: any, index: number) => {
                                    return (
                                      <div className="border-t border-black">
                                        <p className="uppercase text-black text-[20px] font-bold">
                                          {obj1?.classname}
                                        </p>
                                        <p className="text-[12px] text-black">
                                          {obj1?.description}
                                        </p>
                                      </div>
                                    );
                                  }
                                )}
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    );
                  })}
              </Swiper>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default AboutUs;
