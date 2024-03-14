import React from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext } from "react";
import Cookies from "js-cookie";
import _ from "lodash";

const RiverClubV1SelectClass = () => {
  const { readyDatasrc } = useContext(WidgetWrapperContext);
  const staticItem = readyDatasrc[0];
  const staticItem2 = readyDatasrc[1];
  const staticItem3 = readyDatasrc[2];

  const user: any = Cookies.get("customer");

  return (
    <div className="grid grid-cols-12 w-full p-[25px] gap-x-6">
      <div className="col-span-8 my-[50px]">
        <BlockDiv className="p-[20px] bg-white rounded-[6px] ">
          <div className="flex items-end gap-x-6">
            <p className="uppercase text-[16px] leading-[16px] text-black">
              welcome
            </p>
            <p className="uppercase text-[28px] font-bold leading-[27px]">
              дОРЖСҮРЭН ЭНХБАТ
            </p>
          </div>
          <p className="font-[300] text-[14px] leading-[22px] mt-6">
            Спиннинг бол тэсвэр хатуужил, хурд. зүрх судасны үйл ажиллагааг
            сайжруулж өндөр хэмжээний калори шатаах эрч хүчтэй кардио дасгал юм.
          </p>
        </BlockDiv>
        <div className="flex items-center justify-between px-[80px] mt-10 gap-x-4">
          <div
            className="bg-black text-[26px] leading-[26px] text-white uppercase px-10 py-4 rounded-[6px] cursor-pointer"
            style={{
              boxShadow: "4px 4px 4px 0px #00000040",
            }}
          >
            АЛЧУУР & ХАЛАТ авах
          </div>
          <div
            className="bg-[#BAD405] text-[26px] leading-[26px] text-black uppercase px-10 py-4 rounded-[6px] cursor-pointer"
            style={{
              boxShadow: "4px 4px 4px 0px #00000040",
            }}
          >
            Locker сонгох
          </div>
        </div>
      </div>
      <div className="col-span-4 ">
        <BlockDiv
          className={`flex flex-col items-start h-[447px] bg-[#202020]  px-[30px] py-[50px] rounded-[6px]`}
        >
          <RenderAtom
            item={{ value: "exp 2024.04.05" }}
            renderType="text"
            customClassName={""}
            customStyle={{
              background: "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
              WebkitTextFillColor: "transparent",
              WebkitBackgroundClip: "text",
            }}
          />
          <RenderAtom
            item={{ value: "Алтан" }}
            renderType="title"
            className={`font-[700] text-[28px] uppercase text-white`}
          />
          <BlockDiv className="flex flex-col items-start justify-center mt-[10px] min-h-auto">
            <p
              className="text-[36px] font-medium"
              style={{
                background: "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            >
              ₮1.485k<span className="text-[17px]">/90 өдөр</span>
            </p>
            {/* <RenderAtom
              item={{ value: "₮1.485k ₮1.485k" }}
              renderType="text"
              customClassName={""}
              customStyle={{
                background: "linear-gradient(180deg, #ADFF00 0%, #0CB1AB 100%)",
                WebkitTextFillColor: "transparent",
                WebkitBackgroundClip: "text",
              }}
            /> */}
          </BlockDiv>
          {/* Includes */}
          <BlockDiv className="flex flex-col gap-y-[4px] h-[70px] justify-end mt-[30px] align-text-top">
            {_.map([""], (innerItem: any, index: number) => {
              return (
                <BlockDiv className="flex items-center" key={index}>
                  <div className="">
                    <i
                      className={`fa-solid fa-check w-[18px] fa-xs  h-[18px] mr-[8px] p-[3px] flex items-center justify-center  rounded-full text-black bg-[#B3B3B3]
                  `}
                      style={{
                        display: "flex !important",
                      }}
                    />
                  </div>
                  <RenderAtom
                    item={{ value: "ФИТНЕСС" }}
                    renderType="text"
                    className={`font-medium text-[12px] text-white`}
                  />
                </BlockDiv>
              );
            })}
            <style>
              {`
            .fa-check{
              display:flex !important
            }
            `}
            </style>
          </BlockDiv>
          {/* includes done here */}
          <RenderAtom
            item={{
              value: "Цагийн хязгааргүй фитнес болон бассейнээр үйлчлүүлнэ. ",
            }}
            renderType="text"
            className={`font-medium text-[12px] mt-[36px] h-[70px] text-[#B3B3B3]`}
          />
          <RenderAtom
            item={{
              value: "Сунгах",
            }}
            renderType="button"
            className={`font-[400] text-[20px] text-black italic bg-[#BAD405] uppercase mt-[16px] rounded-[8px] w-max min-w-[180px]`}
            // onClick={(e: any) => selectItem(e, item)}
          />

          <RenderAtom
            item={{
              value: "Хөлдөөх",
            }}
            renderType="button"
            className={`font-[400] text-center text-[20px] text-white italic bg-black uppercase mt-[16px] rounded-[8px] w-max min-w-[180px] py-2`}
            // onClick={(e: any) => selectItem(e, item)}
          />
        </BlockDiv>
      </div>
    </div>
  );
};

export default RiverClubV1SelectClass;
