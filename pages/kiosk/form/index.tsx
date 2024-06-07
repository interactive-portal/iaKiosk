import React, { useEffect, useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useContext } from "react";
import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
import _ from "lodash";
import { useForm, FormProvider } from "react-hook-form";
import Text from "@/components/project/riverclub/v1/bioinput/atom/text";
import Combo from "@/components/project/riverclub/v1/bioinput/atom/combo";
import Number from "@/components/project/riverclub/v1/bioinput/atom/number";
import Date from "@/components/project/riverclub/v1/bioinput/atom/date";
import Email from "@/components/project/riverclub/v1/bioinput/atom/email";

import axios from "axios";
import { Modal, notification } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import convertDate from "@/components/project/riverclub/v1/bioinput/convertData";
import Layout from "../kioskLayout";

const Form = () => {
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
    console.log("birthday", data);

    // clickCamera();
    setProcessParam(data);
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

  const saved = async (e: any) => {
    e.preventDefault();
  };

  // const clickCamera = () => {
  //   var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

  //   setOpenModal(true);

  //   ws.onopen = function () {
  //     ws.send('{"action":"GetImage"}');
  //   };

  //   ws.onmessage = function (event) {
  //     var res = JSON.parse(event.data);
  //     console.log("resresssssss", res);

  //     if (res?.result.image != null) {
  //       console.log("resresssssss", res);
  //       setImageToken(res?.result.image);
  //       setValue(res?.result?.value);
  //       ws.send('{"action":"Close"}');
  //     } else {
  //     }
  //   };

  //   ws.onerror = function (event) {
  //     // alert(event.data);
  //   };

  //   ws.onclose = function () {
  //     // console.log("Connection is closed");
  //     // }
  //   };
  // };

  useEffect(() => {
    let birthdays: any;

    if (methods.watch()?.positionName?.length == 10) {
      birthdays = convertDate(methods.watch()?.positionName);
      setBirthday(birthdays?.date);
      console.log(birthdays);
    }
  }, [methods.watch()]);

  return (
    <Layout>
      <p className="uppercase text-[64px] text-white mb-20">АНКЕТ</p>
      <BlockDiv className="py-2 text-[32px] text-white">
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
                className="flex flex-col items-center justify-center gap-y-4 cursor-pointer"
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
                <img
                  src="/images/Face_id_white.png"
                  className="w-[150px] h-[150px] mt-4"
                />
              </div>
            </div>
          </form>
        </FormProvider>
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
        text-align:left !important;
      }

      input {
        background:#D9D9D94F;
        border-radius:23px !important;
        color:white !important;
        font-size:32px;
        border-color:transparent !important;
      }
      .ant-select-selector {
        background:#D9D9D94F !important;
        color:white !important;
        border-radius:23px !important;
        border-color:transparent !important;
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

export default Form;
