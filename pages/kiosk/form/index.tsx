// import React, { useEffect, useState } from "react";
// import BlockDiv from "@/components/common/Block/BlockDiv";
// import { useContext } from "react";
// import WidgetWrapperContext from "@/components/common/engineBox/Wrapper/WidgetUniversalWrapper";
// import _ from "lodash";
// import { useForm, FormProvider } from "react-hook-form";
// import Text from "@/components/project/riverclub/v1/bioinput/atom/text";
// import Combo from "@/components/project/riverclub/v1/bioinput/atom/combo";
// import Number from "@/components/project/riverclub/v1/bioinput/atom/number";
// import Date from "@/components/project/riverclub/v1/bioinput/atom/date";
// import Email from "@/components/project/riverclub/v1/bioinput/atom/email";

// import axios from "axios";
// import { Modal, Spin, notification } from "antd";
// import { useRouter } from "next/router";
// import { useTranslation } from "react-i18next";
// import convertDate from "@/components/project/riverclub/v1/bioinput/convertData";
// import Layout from "../kioskLayout";
// import OpenCamera from "./openCamera";

// const Form = () => {
//   const { t } = useTranslation("translate");
//   const [processParam, setProcessParam] = useState<any>();
//   const [foreign, setForeign] = useState("");
//   const [birthday, setBirthday] = useState("");
//   const [openLogin, setOpenLogin] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [isSignedIn, setIsSignedIn] = useState(false);

//   const methods: any = useForm({
//     defaultValues: {
//       cityId: "11",
//     },
//   });

//   const router = useRouter();

//   const onSubmit = async (data: any) => {
//     setProcessParam(data);
//     setOpenLogin(true);
//   };

//   useEffect(() => {
//     let birthdays: any;

//     if (methods.watch()?.positionName?.length === 10) {
//       birthdays = convertDate(methods.watch()?.positionName);
//       setBirthday(birthdays?.date);
//     }
//   }, [methods.watch()]);

//   const checkIfSignedIn = async () => {
//     try {
//       const response = await axios.get("/api/check-sign-in-status");
//       if (response.data?.isSignedIn) {
//         setIsSignedIn(true);
//       }
//     } catch (error) {
//       console.error("Error checking sign-in status", error);
//     }
//   };

//   useEffect(() => {
//     checkIfSignedIn();
//   }, []);

//   if (loading) {
//     return (
//       <Layout>
//         <Spin fullscreen />
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       {isSignedIn ? (
//         <div>
//           <p className="uppercase text-[64px] text-white mb-20">
//             УУЧЛААРАЙ ТАНЫ МЭДЭЭЛЭЛ БҮРТГЭГДСЭН БАЙНА. ТА БҮРТГЭЛТЭЙ ГИШҮҮНЭЭР
//             НЭВТЭРНЭ ҮҮ
//           </p>
//         </div>
//       ) : (
//         <>
//           <p className="uppercase text-[64px] text-white mb-20">АНКЕТ</p>
//           <BlockDiv className="py-2 text-[32px] text-white">
//             <FormProvider {...methods}>
//               <form onSubmit={methods.handleSubmit(onSubmit)}>
//                 <div className="grid grid-cols-2 gap-10 w-screen px-[100px]">
//                   {formInput?.map((obj: any, index: number) => {
//                     let newObj = { ...obj, labelname: t(obj?.labelname) };
//                     let criteria;
//                     if (obj.criteriaPath) {
//                       criteria = {
//                         [obj?.criteriaPath]: [
//                           {
//                             operator: "=",
//                             operand: methods.watch()[obj?.criteriaPath] || "",
//                           },
//                         ],
//                       };
//                     }

//                     const value = methods.watch();
//                     let birthdays: any;
//                     if (value?.positionName?.length === 10) {
//                       birthdays = convertDate(value?.positionName);
//                     }
//                     switch (obj?.type) {
//                       case "text":
//                         return <Text key={index} obj={newObj} />;
//                       case "combo":
//                         return (
//                           <Combo criteria={criteria} key={index} obj={newObj} />
//                         );
//                       case "number":
//                         return <Number key={index} obj={newObj} />;
//                       case "date":
//                         if (foreign !== "") {
//                           return <Date key={index} obj={newObj} />;
//                         } else {
//                           return (
//                             <div className="flex flex-col">
//                               <label className="text-[16px] font-medium  text-[#2A2A2A] mb-[8px]">
//                                 {t(obj?.labelname)}
//                                 <span className="text-red-500">*</span>
//                               </label>
//                               <input
//                                 disabled={true}
//                                 className="mt-[8px] px-[14px] py-[17px] text-[16px] rounded-lg focus-visible:outline-none focus-visible:border-none"
//                                 onChange={(e) => {
//                                   setBirthday(e.target.value);
//                                 }}
//                                 value={birthdays?.date}
//                               />
//                             </div>
//                           );
//                         }
//                       case "email":
//                         return <Email key={index} obj={newObj} />;
//                       default:
//                         return null;
//                     }
//                   })}
//                 </div>
//                 {
//                   <div className="flex flex-col items-center justify-center gap-y-4 cursor-pointer">
//                     <button
//                       className="bg-[#D9D9D9] text-[#525050] text-[36px] uppercase leading-[34px] py-[20px] rounded-[59px] min-w-[528px] mt-[50px]"
//                       style={{
//                         boxShadow: "4px 4px 4px 0px #00000040",
//                       }}
//                       type="submit"
//                     >
//                       {t("царай таниулах")}
//                     </button>
//                     <img
//                       src="/images/Face_id_white.png"
//                       className="w-[150px] h-[150px] mt-4"
//                     />
//                   </div>
//                 }
//               </form>
//             </FormProvider>
//             <style>
//               {`
//     :where(.css-dev-only-do-not-override-3mqfnx).ant-modal .ant-modal-content {
//       padding: 0px;
//       border-radius: 0px;
//     }
//     .ant-modal, .ant-modal-content {
//       height: 100%;
//       width: 1080px;
//       margin: 0;
//       top: 0;
//       bottom: 0;
//       border: none;
//       padding: 0px;
//       background: #00000080 !important;
//     }
//     .ant-modal-body {
//       height: 100%;
//     }
//     label {
//       color: white !important;
//       font-size: 32px !important;
//       text-align: left !important;
//     }
//     input {
//       background: #D9D9D94F;
//       border-radius: 23px !important;
//       color: white !important;
//       font-size: 32px;
//       border-color: transparent !important;
//     }
//     .ant-select-selector {
//       background: #D9D9D94F !important;
//       color: white !important;
//       border-radius: 23px !important;
//       border-color: transparent !important;
//     }
//    `}
//             </style>
//           </BlockDiv>
//           <Modal
//             width={1080}
//             footer={false}
//             title={false}
//             open={openLogin}
//             onCancel={() => setOpenLogin(!openLogin)}
//             destroyOnClose
//           >
//             <OpenCamera
//               setProcessParam={setProcessParam}
//               processParam={processParam}
//               birthday={birthday}
//               setLoading={setLoading}
//             />
//           </Modal>
//         </>
//       )}
//     </Layout>
//   );
// };

// const formInput = [
//   // {
//   //   labelname: "ГЭРЭЭНИЙ ДУГААР",
//   //   pathname: "contractNumber",
//   //   type: "text",
//   //   isRequired: 1,
//   // },
//   // {
//   //   labelname: "ОН САР",
//   //   pathname: "date",
//   //   type: "text",
//   //   isRequired: 1,
//   // },
//   {
//     labelname: "ОВОГ",
//     pathname: "pLastName",
//     type: "text",
//     isRequired: 1,
//   },
//   {
//     labelname: "НЭР",
//     pathname: "pCustomerName",
//     type: "text",
//     isRequired: 1,
//   },
//   {
//     labelname: "РЕГИСТР",
//     pathname: "pPositionName",
//     type: "text",
//     isRequired: 1,
//   },
//   {
//     labelname: "ТӨРСӨН ОГНОО",
//     pathname: "pDateOfBirth",
//     type: "date",
//     isRequired: 1,
//   },
//   {
//     labelname: "ХҮЙС",
//     pathname: "gendpGender",
//     type: "combo",
//     name: "name",
//     lookupId: "1448432578544",
//     isRequired: 1,
//   },
//   // {
//   //   labelname: "Гадаад хүн эсэх",
//   //   pathname: "citizen",
//   //   type: "combo",
//   //   isRequired: 1,
//   // },
//   {
//     labelname: "Насанд хүрсэн эсэх",
//     pathname: "isAdult",
//     type: "hidden",
//     isRequired: 1,
//   },
//   {
//     labelname: "Нууц үг",
//     pathname: "password",
//     type: "hidden",
//     isRequired: 1,
//   },
//   {
//     labelname: "УТАС",
//     pathname: "cPhoneNumber",
//     type: "number",
//     isRequired: 1,
//   },
//   {
//     labelname: "Картын дугаар",
//     pathname: "cardNumber",
//     type: "hidden",
//     isRequired: 1,
//   },

//   {
//     labelname: "И-МЭЙЛ",
//     pathname: "pEmail",
//     type: "email",
//     isRequired: 1,
//   },
//   {
//     labelname: "ХОТ",
//     pathname: "pCityId",
//     type: "combo",
//     lookupId: "1448415981113",
//     name: "cityname",
//     isRequired: 1,
//   },
//   {
//     labelname: "ДҮҮРЭГ",
//     pathname: "pDistrictId",
//     type: "combo",
//     lookupId: "144436175673444",
//     criteriaPath: "cityId",
//     name: "name",
//     isRequired: 1,
//   },
//   {
//     labelname: "ХОРОО",
//     pathname: "pStreetId",
//     type: "combo",
//     lookupId: "1448415981268",
//     criteriaPath: "districtId",
//     name: "streetname",
//     isRequired: 1,
//   },
//   {
//     labelname: "Хичээлэх спорт",
//     pathname: "itemId",
//     type: "text",
//     isRequired: 1,
//   },
//   {
//     labelname: "Карт эхлэх огноо",
//     pathname: "startDate",
//     type: "text",
//     isRequired: 1,
//   },
//   {
//     labelname: "Үйлчилгээ дуусах огноо",
//     pathname: "endDate",
//     type: "text",
//     isRequired: 1,
//   },
// ];

// export default Form;

import React, { useEffect, useState } from "react";
import BlockDiv from "@/components/common/Block/BlockDiv";
import { useForm, FormProvider } from "react-hook-form";
import Text from "@/components/project/riverclub/v1/bioinput/atom/text";
import Combo from "@/components/project/riverclub/v1/bioinput/atom/combo";
import Number from "@/components/project/riverclub/v1/bioinput/atom/number";
import Date from "@/components/project/riverclub/v1/bioinput/atom/date";
import Email from "@/components/project/riverclub/v1/bioinput/atom/email";
import axios from "axios";
import { Spin, notification } from "antd";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import convertDate from "@/components/project/riverclub/v1/bioinput/convertData";
import Layout from "../kioskLayout";

const Form = () => {
  const { t } = useTranslation("translate");
  const [processParam, setProcessParam] = useState<any>();
  const [birthday, setBirthday] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const methods: any = useForm({
    defaultValues: {
      cityId: "11",
    },
  });

  const router = useRouter();

  const onSubmit = async (data: any) => {
    setProcessParam(data);
    setLoading(true);

    try {
      const param = {
        ...data,
        birthday: birthday,
      };

      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskCreateContractUpdate_DV_001",
        parameters: param,
      });

      if (res.data?.status === "success") {
        router.push({
          pathname: "/kiosk/sell",
          query: {
            i: router.query?.i,
            c: res?.data?.result?.id,
          },
        });

        notification.success({
          message: "Бүртгэл амжилттай хийгдлээ",
        });
      } else {
        notification.error({
          message: res?.data?.text || "Бүртгэл амжилтгүй",
        });
      }
    } catch (error) {
      console.error("Error processing the form", error);
      notification.error({
        message: "Бүртгэл амжилтгүй",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let birthdays: any;

    if (methods.watch()?.positionName?.length === 10) {
      birthdays = convertDate(methods.watch()?.positionName);
      setBirthday(birthdays?.date);
    }
  }, [methods.watch()]);

  const checkIfSignedIn = async () => {
    try {
      const response = await axios.get("/api/check-sign-in-status");
      if (response.data?.isSignedIn) {
        setIsSignedIn(true);
      }
    } catch (error) {
      console.error("Error checking sign-in status", error);
    }
  };

  useEffect(() => {
    checkIfSignedIn();
  }, []);

  if (loading) {
    return (
      <Layout>
        <Spin fullscreen />
      </Layout>
    );
  }

  return (
    <Layout>
      {isSignedIn ? (
        <div>
          <p className="uppercase text-[64px] text-white mb-20">
            УУЧЛААРАЙ ТАНЫ МЭДЭЭЛЭЛ БҮРТГЭГДСЭН БАЙНА. ТА БҮРТГЭЛТЭЙ ГИШҮҮНЭЭР
            НЭВТРЭНЭ ҮҮ
          </p>
        </div>
      ) : (
        <>
          <p className="uppercase text-[64px] text-white mb-20">АНКЕТ</p>
          <BlockDiv className="py-2 text-[32px] text-white">
            <FormProvider {...methods}>
              <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="grid grid-cols-2 gap-10 w-screen px-[100px]">
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
                    if (value?.positionName?.length === 10) {
                      birthdays = convertDate(value?.positionName);
                    }
                    switch (obj?.type) {
                      case "text":
                        return <Text key={index} obj={newObj} />;
                      case "combo":
                        return (
                          <Combo criteria={criteria} key={index} obj={newObj} />
                        );
                      case "number":
                        return <Number key={index} obj={newObj} />;
                      case "date":
                        return (
                          <div className="flex flex-col">
                            <label className="text-[16px] font-medium  text-[#2A2A2A] mb-[8px]">
                              {t(obj?.labelname)}
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
                      case "email":
                        return <Email key={index} obj={newObj} />;
                      default:
                        return null;
                    }
                  })}
                </div>
                <div className="flex flex-col items-center justify-center gap-y-4 cursor-pointer">
                  <button
                    className="bg-[#D9D9D9] text-[#525050] text-[36px] uppercase leading-[34px] py-[20px] rounded-[59px] min-w-[528px] mt-[50px]"
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
              </form>
            </FormProvider>
            <style>
              {`
    :where(.css-dev-only-do-not-override-3mqfnx).ant-modal .ant-modal-content {
      padding: 0px;
      border-radius: 0px;
    }
    .ant-modal, .ant-modal-content {
      height: 100%;
      width: 1080px;
      margin: 0;
      top: 0;
      bottom: 0;
      border: none;
      padding: 0px;
      background: #00000080 !important;
    }
    .ant-modal-body {
      height: 100%;
    }
    label {
      color: white !important;
      font-size: 32px !important;
      text-align: left !important;
    }
    input {
      background: #D9D9D94F;
      border-radius: 23px !important;
      color: white !important;
      font-size: 32px;
      border-color: transparent !important;
    }
    .ant-select-selector {
      background: #D9D9D94F !important;
      color: white !important;
      border-radius: 23px !important;
      border-color: transparent !important;
    }
   `}
            </style>
          </BlockDiv>
        </>
      )}
    </Layout>
  );
};

const formInput = [
  {
    labelname: "ОВОГ",
    pathname: "pLastName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "НЭР",
    pathname: "pCustomerName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "РЕГИСТР",
    pathname: "pPositionName",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "ТӨРСӨН ОГНОО",
    pathname: "pDateOfBirth",
    type: "date",
    isRequired: 1,
  },
  {
    labelname: "ХҮЙС",
    pathname: "gendpGender",
    type: "combo",
    name: "name",
    lookupId: "1448432578544",
    isRequired: 1,
  },
  {
    labelname: "Насанд хүрсэн эсэх",
    pathname: "isAdult",
    type: "hidden",
    isRequired: 1,
  },
  {
    labelname: "Нууц үг",
    pathname: "password",
    type: "hidden",
    isRequired: 1,
  },
  {
    labelname: "УТАС",
    pathname: "cPhoneNumber",
    type: "number",
    isRequired: 1,
  },
  {
    labelname: "Картын дугаар",
    pathname: "cardNumber",
    type: "hidden",
    isRequired: 1,
  },
  {
    labelname: "И-МЭЙЛ",
    pathname: "pEmail",
    type: "email",
    isRequired: 1,
  },
  {
    labelname: "ХОТ",
    pathname: "pCityId",
    type: "combo",
    lookupId: "1448415981113",
    name: "cityname",
    isRequired: 1,
  },
  {
    labelname: "ДҮҮРЭГ",
    pathname: "pDistrictId",
    type: "combo",
    lookupId: "144436175673444",
    criteriaPath: "cityId",
    name: "name",
    isRequired: 1,
  },
  {
    labelname: "ХОРОО",
    pathname: "pStreetId",
    type: "combo",
    lookupId: "1448415981268",
    criteriaPath: "districtId",
    name: "streetname",
    isRequired: 1,
  },
  {
    labelname: "Хичээлэх спорт",
    pathname: "itemId",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "Карт эхлэх огноо",
    pathname: "startDate",
    type: "text",
    isRequired: 1,
  },
  {
    labelname: "Үйлчилгээ дуусах огноо",
    pathname: "endDate",
    type: "text",
    isRequired: 1,
  },
];

export default Form;
