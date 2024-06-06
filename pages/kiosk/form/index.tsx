import React, { useEffect, useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import RenderWidgetProcess from "@/middleware/components/WidgetForm/RenderWidgetProcess";
import useSWR from "swr";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import Text from "@/components/project/riverclub/v1/bioinput/atom/text";
import Combo from "@/components/project/riverclub/v1/bioinput/atom/combo";
import Number from "@/components/project/riverclub/v1/bioinput/atom/number";
import Date from "@/components/project/riverclub/v1/bioinput/atom/date";
import Email from "@/components/project/riverclub/v1/bioinput/atom/email";

import fetchJson from "@/util/helper";
import axios from "axios";
import { Modal, notification } from "antd";
import Cookies from "js-cookie";
import RiverLoginModal from "@/components/project/riverclub/v1/home/RiverLoginModal";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import convertDate from "@/components/project/riverclub/v1/bioinput/convertData";
import Layout from "../kioskLayout";

const RiverClubV1BioInputForm = () => {
  const { config, headerData, positionConfig, metaConfig } =
    useContext(WidgetWrapperContext);
  const { t } = useTranslation("translate");
  const [processParam, setProcessParam] = useState<any>();

  // const { getValues } = useFormContext();

  const [imageToken, setImageToken] = useState<any>();
  const [value, setValue] = useState<any>();
  const [foreign, setForeign] = useState("");
  const [birthday, setBirthday] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [dialog, setDialog] = useState(false);

  const [openLogin, setOpenLogin] = useState(false);

  const methods: any = useForm({
    defaultValues: {
      cityId: "11",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    console.log("birthday", birthday);

    clickCamera();
    setProcessParam(data);
  };

  const saved = async (e: any) => {
    e.preventDefault();
    const param = {
      ...processParam,
      image: imageToken,
      value: value,
      dateOfBirth: birthday,
    };

    console.log(param);
    const res = await axios.post(`/api/post-process`, {
      processcode: "fitCrmCustomerKiosk_DV_001",
      parameters: param,
    });

    if (res.data?.status == "success") {
      setDialog(true);
      setOpenModal(false);

      notification.success({
        message: "Бүртгэл амжилттай хийгдлээ",
      });
    } else {
      alert(res?.data?.text);
    }
  };

  const clickCamera = () => {
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    setOpenModal(true);

    ws.onopen = function () {
      ws.send('{"action":"GetImage"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      console.log("resresssssss", res);

      if (res?.result.image != null) {
        console.log("resresssssss", res);
        setImageToken(res?.result.image);
        setValue(res?.result?.value);
        ws.send('{"action":"Close"}');
      } else {
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

  useEffect(() => {
    let birthdays: any;
    console.log(methods.watch()?.positionName);

    if (methods.watch()?.positionName?.length == 10) {
      birthdays = convertDate(methods.watch()?.positionName);
      setBirthday(birthdays?.date);
      console.log(birthdays);
    }
  }, [methods.watch()]);

  console.log(foreign);

  return (
    <Layout>
      <p className="uppercase text-[64px] text-white mb-20">АНКЕТ</p>
      <BlockDiv className="px-[123px]  py-2 text-[32px] text-white">
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

                const value = methods.watch();
                let birthdays: any;
                if (value?.positionName?.length == 10) {
                  birthdays = convertDate(value?.positionName);
                }
                switch (obj?.type) {
                  case "text":
                    if (obj?.pathname == "positionName") {
                      return (
                        <div className="flex gap-x-6">
                          <div className="flex flex-col ">
                            <label className="text-[16px] font-medium  text-[#2A2A2A]">
                              Улс
                            </label>
                            <div className="flex min-h-[50px] gap-x-2 text-[16px]">
                              <div className="flex gap-x-2 items-center">
                                <input
                                  type="checkbox"
                                  onChange={() => setForeign("")}
                                  checked={foreign == "" ? true : false}
                                  className="rounded-full"
                                />
                                <div>Монгол</div>
                              </div>
                              <div className="flex gap-x-1 items-center">
                                <input
                                  type="checkbox"
                                  checked={foreign == "" ? false : true}
                                  onChange={() => setForeign("1")}
                                  className="rounded-full"
                                />
                                <div>Бусад</div>
                              </div>
                            </div>
                          </div>
                          <Text key={index} obj={newObj} />
                        </div>
                      );
                    } else {
                      return <Text key={index} obj={newObj} />;
                    }
                  case "combo":
                    return (
                      <Combo criteria={criteria} key={index} obj={newObj} />
                    );
                  case "number":
                    return <Number key={index} obj={newObj} />;
                  case "date":
                    if (foreign != "") {
                      <Date key={index} obj={newObj} />;
                    } else {
                      return (
                        <div className="flex flex-col">
                          <label className="text-[16px] font-medium  text-[#2A2A2A] mb-[8px]">
                            {t(obj?.labelname)}{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            disabled={true}
                            className="mt-[8px] px-[14px] py-[17px] text-[16px] rounded-lg focus-visible:outline-none focus-visible:border-none"
                            onChange={(e) => {
                              setBirthday(e.target.value);
                            }}
                            value={birthdays?.date}
                          />
                        </div>
                      );
                    }

                  case "email":
                    return <Email key={index} obj={newObj} />;
                }
              })}

              <div></div>
            </div>
            <div className="">
              <div
                className="flex items-center justify-center gap-4 cursor-pointer"
                // onClick={(e) => clickCamera(e)}
              >
                <button
                  className="bg-[#D9D9D9] text-[#525050] text-[36px] uppercase leading-[34px] py-[20px] rounded-[59px] min-w-[528px]"
                  style={{
                    boxShadow: "4px 4px 4px 0px #00000040",
                  }}
                  type="submit"
                >
                  {t("царай таниулах")}
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
        <Modal
          open={openModal}
          width={1080}
          onCancel={() => setOpenModal(false)}
          footer={false}
        >
          <div className="w-full h-full relative">
            <div className="absolute top-1/2 left-[5%]">
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
                    onClick={() => setOpenModal(false)}
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

      label {
        color:white !important;
        font-size:32px !important;
      }

		`}
        </style>
      </BlockDiv>
    </Layout>
  );
};

const formInput = [
  {
    labelname: "ОВОГ",
    pathname: "lastName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "НЭР",
    pathname: "customerName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "РЕГИСТР",
    pathname: "positionName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "ТӨРСӨН ОГНОО",
    pathname: "dateOfBirth",
    type: "date",
    isRequired: 1,
  },
  {
    labelname: "ХҮЙС",
    pathname: "gender",
    type: "combo",
    name: "name",
    lookupId: "1448432578544",
    isRequired: 1,
  },
  {
    labelname: "УТАС",
    pathname: "phoneNumber",
    type: "number",
    isRequired: 1,
  },
  {
    labelname: "И-МЭЙЛ",
    pathname: "EMAIL",
    type: "email",
    isRequired: 1,
  },
  {
    labelname: "ХОТ",
    pathname: "cityId",
    type: "combo",
    lookupId: "1448415981113",
    name: "cityname",
    isRequired: 1,
  },
  {
    labelname: "ДҮҮРЭГ",
    pathname: "districtId",
    type: "combo",
    lookupId: "144436175673444",
    criteriaPath: "cityId",
    name: "name",
    isRequired: 1,
  },
  {
    labelname: "ХОРОО",
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
