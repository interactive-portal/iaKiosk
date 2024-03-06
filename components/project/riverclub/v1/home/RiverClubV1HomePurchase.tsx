import React, { useTransition } from "react";
import RenderAtom from "@/components/common/Atom/RenderAtom";
import BlockDiv from "@/components/common/Block/BlockDiv";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import { useContext, useState, useEffect } from "react";
import { useToggle } from "react-use";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
// import BlockModal2 from "@components/common/Block/BlockModal2";

type RiverClubV1HomePurchaseProps = {
  item: any;
  modalTop: any;
  QRpay: any;
  purchaseAgeBtn: any;
};

const RiverClubV1HomePurchase = ({
  item,
  modalTop,
  QRpay,
  purchaseAgeBtn,
}: RiverClubV1HomePurchaseProps) => {
  const { query } = useRouter();
  const { t } = useTranslation("translate");
  const currentLanguage = Array.isArray(query.lang)
    ? query.lang.join("")
    : query.lang || "mn";

  const [language, setLanguage] = useState(currentLanguage);

  const { readyDatasrc } = useContext(WidgetWrapperContext);

  const data = language === "mn" ? readyDatasrc[1] : readyDatasrc[0];

  const staticItem = data[0];

  // let {data : readyData} = useSWR(`
  // /api/get-data?mateid=1701156148201731
  // `)

  // console.log("readyDatareadyData", readyData)

  return (
    <div className="px-[90px]">
      <BlockDiv className="flex items-center justify-center w-full ">
        <BlockDiv className=" my-[26px] py-[40px] px-[70px] bg-white flex items-center justify-between w-full">
          <BlockDiv className="flex flex-col gap-y-[18px]">
            <RenderAtom
              item={t(staticItem?.title || item?.title)}
              renderType="title"
              className={`uppercase text-[24px] font-bold`}
            />
            <RenderAtom
              item={t(staticItem?.description || item?.description)}
              renderType="text"
              className={`uppercase text-[16px] font-[300] w-[440px] text-justify leading-[22px]`}
            />
          </BlockDiv>
          <BlockDiv className="flex relative flex-col justify-between">
            <img src="/images/onemore.png" className="w-full" />
            <BlockDiv className="flex flex-col gap-y-2 gap-x-4 mt-6">
              <div
                className="py-[10px] px-[20px] italic bg-black text-white rounded-[6px] flex flex-col items-center justify-center text-[20px] font-[400] text-center tracking-widest leading-[16px] cursor-pointer"
                style={{
                  boxShadow: "4px 4px 4px 0px #00000040",
                }}
              >
                ТОМ ХҮН
              </div>
              <div
                className="py-[10px] px-[20px] italic bg-[#BAD405] rounded-[6px] flex flex-col items-center justify-center text-[20px] font-[400] text-center tracking-widest leading-[16px] cursor-pointer"
                style={{
                  boxShadow: "4px 4px 4px 0px #00000040",
                }}
              >
                ХҮҮХЭД
              </div>
            </BlockDiv>
            <BlockDiv></BlockDiv>
          </BlockDiv>
        </BlockDiv>
      </BlockDiv>
    </div>
  );
};

export default RiverClubV1HomePurchase;

const PurchaseOneTimeTicket = ({ modalTop, purchaseAgeBtn, QRpay }: any) => {
  return (
    <BlockDiv className="bg-[#373737] p-6 mt-[25vh]">
      <ModalTop item={modalTop} />
      <PurchaseOneTimeTicketAgeButton item={purchaseAgeBtn} />
      <RenderAtom
        item=""
        renderType="line"
        className={`bg-white w-full h-[1px] my-[20px]`}
      />
      <QRPay item={QRpay} />
    </BlockDiv>
  );
};

export const ModalTop = ({ item }: any) => {
  return (
    <BlockDiv className="z-10">
      <RenderAtom
        item={item?.title}
        renderType="title"
        className={`text-[#BAD405] font-bold text-[22px] mb-[33px]`}
      />
      <RenderAtom
        item={item?.description}
        renderType="text"
        className={`text-white mx-[20px] text-lg font-normal list-item list-disc`}
      />
    </BlockDiv>
  );
};

const PurchaseOneTimeTicketAgeButton = ({ item }: any) => {
  return (
    <BlockDiv className="w-max mx-auto flex items-center justify-center gap-4 my-6 z-10">
      <RenderAtom
        item={item?.button?.button1}
        renderType="button"
        className={`text-[#BBD540] bg-[#424242] font-bold text-[16px] rounded-[8px] px-[50px] py-[25px]`}
      />
      <RenderAtom
        item={item?.button?.button2}
        renderType="button"
        className={`bg-[#BBD540] text-black font-bold text-[16px] rounded-[8px] px-[50px] py-[25px]`}
      />
    </BlockDiv>
  );
};

export const QRPay = ({ item }: any) => {
  return (
    <BlockDiv className="flex items-center justify-center gap-16 w-full">
      <BlockDiv className="flex flex-col items-center h-full justify-between gap-10">
        <BlockDiv className="flex items-end justify-center gap-10">
          <RenderAtom
            item={item?.total}
            renderType="title"
            className={`font-bold text-[26px] text-white`}
          />
          <RenderAtom
            item={`${item?.price}k`}
            renderType="title"
            className={`font-bold text-[26px] text-white`}
          />
        </BlockDiv>
        <BlockDiv className="flex flex-col gap-4">
          <RenderAtom
            item={item?.button?.button1}
            renderType="button"
            className={`text-black font-bold text-[16px] px-[40px] py-[20px] bg-[#BAD405] rounded-[8px]`}
          />
          <RenderAtom
            item={item?.button?.button2}
            renderType="button"
            className={`text-black font-bold text-[16px] px-[40px] py-[20px] bg-[#BAD405] rounded-[8px]`}
          />
        </BlockDiv>
      </BlockDiv>
      <BlockDiv className="flex items-center justify-center w-max h-max">
        <RenderAtom item={item?.qr} renderType="image" className={``} />
      </BlockDiv>
    </BlockDiv>
  );
};
function useSWR(arg0: string): { data: any } {
  throw new Error("Function not implemented.");
}
