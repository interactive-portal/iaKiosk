import React, { useEffect, useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import RenderWidgetProcess from "@/middleware/components/WidgetForm/RenderWidgetProcess";
import useSWR from "swr";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Text from "./atom/text";
import Combo from "./atom/combo";
import Number from "./atom/number";
import Date from "./atom/date";
import Email from "./atom/email";
import fetchJson from "@/util/helper";
import axios from "axios";
import { Modal, notification } from "antd";
import Cookies from "js-cookie";
import RiverLoginModal from "../home/RiverLoginModal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const RiverClubV1BioInputForm = () => {
  const { config, headerData, positionConfig, metaConfig } =
    useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");
  const [processParam, setProcessParam] = useState<any>();

  // const { getValues } = useFormContext();

  const [imageToken, setImageToken] = useState<any>();
  const [value, setValue] = useState<any>();

  const [openModal, setOpenModal] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const methods = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    // setProcessParam(param);
    clickCamera();
    const param = {
      ...data,
      image: imageToken,
      value: value,
    };

    setProcessParam(param);
  };

  const saved = async (e: any) => {
    e.preventDefault();
    // const res = await axios.post(`/api/post-process`, {
    //   processcode: "fitCrmCustomerKiosk_DV_001",
    //   parameters: processParam,
    // });

    console.log(processParam);

    // if (res.data?.status == "success") {
    //   // setDialog(true);
    //   notification.success({
    //     message: "Бүртгэл амжилттай хийгдлээ",
    //   });
    //   router.push(`/selectplan`);
    // }

    // console.log("tabnamemseseses");
  };

  const clickCamera = () => {
    setOpenModal(true);
    // e.preventDefault();
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    ws.onopen = function () {
      ws.send('{"action":"GetImage"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      setOpenModal(false);

      if (res?.result.image != null) {
        setImageToken(res?.result.image);
        setValue(res?.result?.value);
        setOpenModal(false);
        ws.send('{"action":"Close"}');

        // [image] = res.image;
        // [value] = res.value;
      } else {
        // alert(res.message);
      }
    };

    ws.onerror = function (event) {
      // alert(event.data);
    };

    ws.onclose = function () {
      // console.log("Connection is closed");
      // }
    };
  };

  return (
    <BlockDiv className="bg-[#CACACA] px-[123px]  py-2">
      <div className="flex items-start py-10 gap-x-12">
        <div>
          <p className="font-bold text-[32px] text-[#202020]">01</p>
        </div>
        <div>
          <p className="uppercase font-bold text-[32px]">
            та хувийн мэдээллээ бөглөнө үү
          </p>
          <p className="uppercase font-[300] text-[14px]">
            ХҮНИЙ ХУВИЙН МЭДЭЭЛЭЛ ХАМГААЛАХ ТУХАЙ ХУУЛИЙН ДАГУУ РИВЕР КЛУБ НЬ
            ТАНЫ ХУВИЙН МЭДЭЭЛЛИЙГ ЦААШ ЗАДРУУЛАХ,БОЛОВСРУУЛАХ ЗЭРГЭЭР
            АШИГЛАХГҮЙ БОЛНО.ТА ХУВИЙН МЭДЭЭЛЛЭЭ ҮНЭН ЗӨВ БӨГЛӨЖ ДАРААГИЙН
            ХУУДАС РУУ ШИЛЖИНЭ ҮҮ
          </p>
        </div>
      </div>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-10">
            {formInput?.map((obj: any, index: number) => {
              let newObj = { ...obj, labelname: t(obj?.labelname) };
              let criteria;
              if (obj.criteriaPath) {
                criteria = {
                  [obj?.criteriaPath]: [
                    {
                      operator: "=",
                      operand: methods.watch()[obj?.criteriaPath] || "",
                    },
                  ],
                };
              }
              switch (obj?.type) {
                case "text":
                  return <Text key={index} obj={newObj} />;
                case "combo":
                  return <Combo criteria={criteria} key={index} obj={newObj} />;
                case "number":
                  return <Number key={index} obj={newObj} />;
                case "date":
                  return <Date key={index} obj={newObj} />;
                case "email":
                  return <Email key={index} obj={newObj} />;
              }
            })}
            <div></div>
            <div className="">
              <div className="flex gap-x-4 items-center mb-6">
                <img
                  src="/images/Face_ID.png"
                  className="h-full w-auto max-w-auto"
                />
                <span>{t("WPD_0057")}</span>
              </div>
              <div
                className="flex items-center gap-4 cursor-pointer"
                // onClick={(e) => clickCamera(e)}
              >
                <input
                  type="checkbox"
                  className="w-[14px] h-[14px] rounded-[4px]"
                  checked={imageToken ? true : false}
                />
                <button
                  className="bg-black text-white text-[14px] uppercase leading-[19px]  px-[22px] py-[20px] rounded-[6px]"
                  style={{
                    boxShadow: "4px 4px 4px 0px #00000040",
                  }}
                  type="submit"
                >
                  {t("WPD_0056")}
                </button>
              </div>
            </div>
          </div>
          {/* <div className="flex items-end justify-end mt-6">
            <button
              type="submit"
              className="p-3 bg-black text-white flex items-center justify-center text-[18px] w-[200px] rounded"
            >
              {t("WPD_0058")}
            </button>
          </div> */}
        </form>
      </FormProvider>
      <div className="flex items-start py-20 gap-x-12">
        <div>
          <p className="font-bold text-[32px] text-[#202020]">02</p>
        </div>
        <div>
          <p className="uppercase font-bold text-[32px]">тавтай морил</p>
          <p className="uppercase font-[300] text-[14px]">
            ХҮНИЙ ХУВИЙН МЭДЭЭЛЭЛ ХАМГААЛАХ ТУХАЙ ХУУЛИЙН ДАГУУ РИВЕР КЛУБ НЬ
            ТАНЫ ХУВИЙН МЭДЭЭЛЛИЙГ ЦААШ ЗАДРУУЛАХ,БОЛОВСРУУЛАХ ЗЭРГЭЭР
            АШИГЛАХГҮЙ БОЛНО.ТА ХУВИЙН МЭДЭЭЛЛЭЭ ҮНЭН ЗӨВ БӨГЛӨЖ ДАРААГИЙН
            ХУУДАС РУУ ШИЛЖИНЭ ҮҮ
          </p>
          <div className="uppercase flex items-center gap-x-6 mt-6">
            <button
              className="bg-[#BAD405] text-black py-4 min-w-[160px] rounded-[6px] uppercase italic"
              onClick={() =>
                router.push({
                  pathname: "/price",
                })
              }
            >
              Багц сонгох
            </button>
            <button className="bg-black text-white py-4 min-w-[160px] rounded-[6px] uppercase italic">
              Болих
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        width={1080}
        onCancel={() => setOpenModal(false)}
        footer={false}
      >
        <div className="w-full h-full pt-[150px] relative">
          <div className="absolute top-[100%] left-[5%]">
            <div className="text-[26px] font-medium text-white uppercase text-center px-[150px]">
              <p className="">
                ТА ДЭЛГЭЦИЙН ӨМНӨ ЦАРАЙГАА ТОД, ЭГЦ ХАРАГДАХААР БАЙРЛАНА УУ.
              </p>
            </div>
            <div className="bg-white mx-[50px] text-black p-[30px] mt-[200px]">
              <p className="font-bold text-[32px] leading-[32px] uppercase">
                Ривер клубт тавтай морил
              </p>
              <p className="text-[14px] leading-[22px] font-[300] text-[#303030] mt-6">
                ХҮНИЙ ХУВИЙН МЭДЭЭЛЭЛ ХАМГААЛАХ ТУХАЙ ХУУЛИЙН ДАГУУ РИВЕР КЛУБ
                НЬ ТАНЫ ХУВИЙН МЭДЭЭЛЛИЙГ ЦААШ ЗАДРУУЛАХ, БОЛОВСРУУЛАХ ЗЭРГЭЭР
                АШИГЛАХГҮЙ БОЛНО.ТА ХУВИЙН МЭДЭЭЛЛЭЭ ҮНЭН ЗӨВ БӨГЛӨЖ ДАРААГИЙН
                ХУУДАС РУУ ШИЛЖИНЭ ҮҮ{" "}
              </p>
              <div>
                <button
                  className="uppercase text-[20px] leading-[16px] italic px-10 py-4 bg-[#BAD405] text-black rounded-[6px]"
                  style={{
                    boxShadow: "4px 4px 4px 0px #00000040",
                  }}
                  type="submit"
                  onClick={(e) => saved(e)}
                >
                  Хадгалах
                </button>
                <button
                  className="uppercase text-[20px] leading-[16px] italic px-10 py-4 bg-black text-white ml-4 rounded-[6px]"
                  style={{
                    boxShadow: "4px 4px 4px 0px #00000040",
                  }}
                >
                  Болих
                </button>
              </div>
            </div>
          </div>
          <div className="max-w-[640px] mx-auto h-[480px] bg-black/70 rounded-lg flex items-center justify-center">
            <img src="/images/Face_id_white.png" />
          </div>
        </div>
      </Modal>
      <Modal
        open={dialog}
        width={650}
        onCancel={() => setDialog(false)}
        footer={false}
      >
        <div className="flex flex-col justify-center items-center w-full h-full gap-[10px]">
          <div
            className="w-[600px] h-auto bg-white rounded-lg p-[40px]"
            style={{
              background: "var(--202020, #202020)",
            }}
          >
            <p className="text-[30px] font-semibold text-[#BAD405]">
              Бүртгэл амжилттай
            </p>
            <div className="p-[32px] border border-[#DEDEDE] rounded-lg my-[20px]">
              <p className="text-[24px] font-semibold text-[#BAD405]">
                Санамж:
              </p>
              <p className="text-[#FFFFFF] text-[18px]">
                Хэрэглэгчээр нэвтэрч үргэлжлүүлнэ үү
              </p>
            </div>
            <div className="flex justify-center">
              <div
                className="w-[210px] h-[60px] bg-[#BAD405] cursor-pointer flex items-center justify-center rounded-[8px] font-semibold text-[20px]"
                onClick={() => {
                  setDialog(false);
                  setOpenLogin(true);
                }}
              >
                Нэвтрэх
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <RiverLoginModal openModal={openLogin} setOpenModal={setOpenLogin} />
      <style>
        {`
		:where(.css-dev-only-do-not-override-3mqfnx).ant-modal .ant-modal-content {
			padding:0px;
			border-radius:0px;
		}
		.ant-modal, .ant-modal-content {
			height: 100%;
			width: 1080px;
			margin: 0;
			top: 0;
			bottom:0;
			border:none;
			padding:0px;
      background:#00000080 !important
		   }
		   .ant-modal-body {
			height: 100%;
		   }
		`}
      </style>
    </BlockDiv>
  );
};

const formInput = [
  {
    labelname: "WPD_0046",
    pathname: "lastName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "WPD_0047",
    pathname: "customerName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "WPD_0048",
    pathname: "positionName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "WPD_0049",
    pathname: "dateOfBirth",
    type: "date",
    isRequired: 1,
  },
  {
    labelname: "WPD_0050",
    pathname: "gender",
    type: "combo",
    name: "name",
    lookupId: "1448432578544",
    isRequired: 1,
  },
  {
    labelname: "WPD_0051",
    pathname: "phoneNumber",
    type: "number",
    isRequired: 1,
  },
  {
    labelname: "WPD_0052",
    pathname: "EMAIL",
    type: "email",
    isRequired: 1,
  },
  {
    labelname: "WPD_0053",
    pathname: "cityId",
    type: "combo",
    lookupId: "1448415981113",
    name: "cityname",
    isRequired: 1,
  },
  {
    labelname: "WPD_0054",
    pathname: "districtId",
    type: "combo",
    lookupId: "144436175673444",
    criteriaPath: "cityId",
    name: "name",
    isRequired: 1,
  },
  {
    labelname: "WPD_0055",
    pathname: "streetId",
    type: "combo",
    lookupId: "1448415981268",
    criteriaPath: "districtId",
    name: "streetname",
    isRequired: 1,
  },
  // {
  //   labelname: "Овог",
  //   pathname: "districtId",
  //   type: "combo",
  // },
];

export default RiverClubV1BioInputForm;
