import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination, Autoplay } from "swiper";

import { Navigation, Pagination, Scrollbar, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

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
  return (
    <div className="flex flex-col gap-y-">
      <div className="grid grid-cols-12 w-full py-4 px-10">
        <p className="text-[32px] font-normal col-span-2 uppercase">КАРДИО</p>
        <p className="col-span-10 uppercase text-[16px]">
          Спиннинг бол тэсвэр хатуужил, хурд. зүрх судасны үйл ажиллагааг
          сайжруулж өндөр хэмжээний калори шатаах эрч хүчтэй кардио дасгал юм.
        </p>
      </div>
      <div>
        <Swiper slidesPerView={4.5} spaceBetween={10}>
          {[0, 1, 2, 3, 4, 5].map((item: any, index: number) => {
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
                    <p className="text-[20px] ">{data?.title}</p>
                    <p className="text-[10px] ">{data?.description}</p>
                    <div className="mt-4 flex flex-col gap-y-4">
                      {[0, 1].map((obj: any, index: number) => {
                        return (
                          <div className="border-t border-black">
                            <p className="uppercase text-black text-[20px] font-bold">
                              хатха иог
                            </p>
                            <p className="text-[12px] text-black">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit, sed do{" "}
                            </p>
                          </div>
                        );
                      })}
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
};

export default AboutUs;
