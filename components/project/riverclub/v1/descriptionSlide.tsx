import BlockSlider from "@/components/common/Block/BlockSlider";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";

const Description = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  return (
    <div className="mx-[150px] py-10">
      <BlockSlider
        type="simple"
        customProps={{
          slickslideRawClass: {
            padding: "0 10px 0 0",
          },
          reactSlickSettings: {
            dots: true,
            infinite: false,
            variableWidth: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            autoplaySpeed: 5000,
            arrows: false,
          },
        }}
        padding="0px"
      >
        {readyDatasrc?.map((item: any, index: number) => {
          return (
            <div className="flex flex-col gap-y-4" key={index}>
              <p className="text-[28px] font-bold uppercase">{item?.title}</p>
              <p className="text-[16px] font-[300]">{item?.description}</p>
            </div>
          );
        })}
      </BlockSlider>
    </div>
  );
};

export default Description;
