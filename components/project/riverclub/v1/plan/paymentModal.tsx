import axios from "axios";
import Payment from "../payment/payment";
import { FC, useState } from "react";
import { notification } from "antd";
import Cookies from "js-cookie";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";

type PropsType = {
  item?: any;
  setSelectDateModal?: any;
  setModal?: any;
};

const PaymentModal: FC<PropsType> = ({
  item,
  setSelectDateModal,
  setModal,
}) => {
  const [modalContent, setModalContent] = useState("pay");
  const [paymentResult, setPaymentResult] = useState<any>();
  const [printOptions, setPrintOptions] = useState({
    lang: {
      mn: "",
      en: "",
    },
    ishtml: 1,
    print_options: {
      numberOfCopies: "1",
      isPrintNewPage: "1",
      isSettingsDialog: "0",
      isShowPreview: "1",
      isPrintPageBottom: "0",
      isPrintPageRight: "0",
      pageOrientation: "portrait",
      isPrintSaveTemplate: "1",
      paperInput: "portrait",
      pageSize: "a5",
      printType: "1col",
      templatemetaid: "170174656028110",
      templateIds: "170174656028110",
    },
  });
  const [contractId, setContractId] = useState();

  const session: any = Cookies.getJSON("customer");

  const checkPayment = () => {
    setModalContent("card");
    Payment(
      Number(item?.saleprice),
      process.env.NEXT_PUBLIC_TERMINAL_ID,
      process.env.NEXT_PUBLIC_DEVICE_TYPE,
      function (item: any) {
        console.log("payment result backasdasdasd", item);
        if (item?.status == "success") {
          setPaymentResult(item);
          paymentProcess(item);
        } else {
          setSelectDateModal(false);
          notification.error({
            message: item?.text,
          });
        }
      }
    );
  };

  const paymentProcess = async (payment: any) => {
    console.log("payment result", paymentResult);
    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskSalesNew_DV_001",
      parameters: {
        subTotal: Number(item?.saleprice),
        total: Number(item?.saleprice),
        customerId: session?.customerId,
        vat: Number(item?.vat),
        fitKioskSalesDtlNew_DV: {
          productId: item?.id,
          sectionId: item?.sectionid,
          unitPrice: Number(item?.saleprice),
          lineTotalPrice: Number(item?.saleprice),
          percentVat: "10",
          uniVat: item?.vat,
          lineTotalVat: item?.vat,
          unitAmount: Number(item?.saleprice),
          lineTotalAmount: Number(item?.saleprice),
        },
        fitKioskSalesPaymentNew_DV: {
          paymentMethodCode: payment?.pan,
          bankId: 500000,
          amount: Number(item?.saleprice),
          paymentTypeId: "2",
          confirmCode: payment?.authcode,
          refenceNumber: payment?.rrn,
          terminalNumber: payment?.terminalid,
          extTransactionId: payment?.traceno,
        },
      },
    });

    if (res?.data?.status == "success") {
      console.log("processoos irsen resposne", res);
      setPrintOptions({
        lang: {
          mn: "",
          en: "",
        },
        ishtml: 1,
        print_options: {
          numberOfCopies: "1",
          isPrintNewPage: "1",
          isSettingsDialog: "0",
          isShowPreview: "1",
          isPrintPageBottom: "0",
          isPrintPageRight: "0",
          pageOrientation: "portrait",
          isPrintSaveTemplate: "1",
          paperInput: "portrait",
          pageSize: "a5",
          printType: "1col",
          templatemetaid: res?.data?.result?.templateId,
          templateIds: res?.data?.result?.templateId,
        },
      });
      const ebarimtResult = await axios.post(`/api/post-process`, {
        processcode: "kiosk_Ebarimt_Send",
        parameters: {
          id: res?.data?.result?.id,
        },
      });
      console.log("ebarimtaas irsen dun ");
      if (ebarimtResult?.data?.status == "success") {
        setContractId(res?.data?.result?.id);
        setModalContent("ebarimt");
      }
    } else {
      console.log("aldaaa", res);
    }
  };

  const printEbarimt = () => {
    var content: any = document.getElementById("portraid");
    const pri: any = (document.getElementById("content") as HTMLIFrameElement)
      .contentWindow;
    pri.document.open();
    pri.document.write(content.innerHTML);
    pri.document.close();
    pri.focus();
    pri.print();
    setSelectDateModal(false);
    setModalContent("pay");
    Cookies.remove("customer");
    setModal("date");
  };

  // console.log("contract ", contractId);

  const content = () => {
    switch (modalContent) {
      case "card":
        return (
          <div
            className="flex items-center justify-center h-full mx-auto "
            id="divcontents"
          >
            <div
              className="w-[424px] h- box-border relative rounded"
              style={{
                background: "var(--202020, #202020)",
              }}
            >
              <div className="p-[30px]">
                <p className="text-[#BAD405] text-[22px] uppercase font-bold">
                  Картаа уншуулна уу
                </p>
              </div>
            </div>
          </div>
        );
      case "success":
        return (
          <div className="flex items-center justify-center h-full mx-auto">
            <div
              className="w-[600px] h- box-border relative rounded"
              style={{
                background: "var(--202020, #202020)",
              }}
            >
              <div className="p-[30px]">
                <p className="text-[#BAD405] text-[22px] uppercase font-bold">
                  Манайхыг сонгосон танд баярлалаа
                </p>
                <div className="rounded-lg border border-[#DEDEDE]  mt-[50px]">
                  <p className="text-[18px] text-white p-[32px]">
                    {" "}
                    Тантай хийсэн үйлчилгээний гэрээ нь таны бүртгүүлсэн цахим
                    шуудан руу илгээгдсэн.
                  </p>
                </div>
              </div>
              <div className="pb-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer">
                <div
                  className="w-full  text-[20px] text-center uppercase rounded font-medium py-2"
                  style={{
                    color: "var(--202020, #202020)",
                    background: "var(--green-main, #BAD405)",
                  }}
                  onClick={() => {
                    setSelectDateModal(false);
                    // setModalContent("pay");
                    Cookies.remove("customer");
                  }}
                >
                  Дуусгах
                </div>
              </div>
            </div>
          </div>
        );
      case "ebarimt":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-[500px] bg-white overflow-scroll rounded-lg printContent">
              <iframe id="content" className="h-0 w-0 absolute"></iframe>
              <div id={"portraid"}>
                <ReportTemplate
                  options={printOptions}
                  data={{
                    contractId: contractId || "17022810340782",
                    // contractId:
                    //   "170174683396510" ||
                    //   "17022810222312" ||
                    //   "170174688727410",
                  }}
                />
              </div>
              <p className="text-[20px] px-4 txt">Та баримтаа хэвлэж авна уу</p>
              <div className="py-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer button">
                <div
                  className="w-full  text-[20px] text-center uppercase rounded font-medium py-2 btn"
                  style={{
                    color: "var(--202020, #202020)",
                    background: "var(--green-main, #BAD405)",
                  }}
                  onClick={() => {
                    printEbarimt();
                  }}
                >
                  Баримт хэвлэх
                </div>
              </div>
            </div>
            <style>
              {`
              @media print {
                body {
                  font-family: Arial, sans-serif;
                  font-size: 12pt;
                  color: black;
                  padding:40px;
                }

                  #portraid {
                    page-break-before: always;
                    page-break-inside: avoid;
                  }

                  .button {
                    display: none;
                  }

                  .txt {
                    display: none;
                  }
                  img :{
                    display: none;
                  }
                }



              `}
            </style>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full mx-auto">
            <div
              className="w-[634px] h- box-border relative rounded"
              style={{
                background: "var(--202020, #202020)",
              }}
            >
              <div className="p-[30px]">
                <p className="text-[#BAD405] text-[28px] uppercase font-bold">
                  Төлбөр төлөх
                </p>
                <div
                  className="rounded-lg border border-[#00B0AB]  mt-[50px] py-4"
                  // style={{
                  //   border: "1px solid",
                  //   borderImageSource:
                  //     "linear-gradient(180deg, #00B0AB 0%, #BAD405 100%)",
                  // }}
                >
                  <div className="text-[16px] text-center text-white my-4">
                    ТА QPAY БОЛОН ӨӨРИЙН БАНКНЫ КАРТААР ТӨЛБӨРӨӨ ТӨЛӨХ
                    БОЛОМЖТОЙ.
                  </div>
                  <div className="flex flex-col gap-[20px] py-[10px] border rounded-lg mx-[25px] border-white font-bold text-[32px] text-white px-4">
                    <div className="flex items-center gap-x-10">
                      <p className="">{item?.classificationname}</p>
                      <p>{item?.saleprice}₮</p>
                    </div>
                    {/* <div className="flex items-center justify-between text-white text-[16px]">
                      <p className="">Багц </p>
                      <p className="font-bold">{item?.classificationname}</p>
                    </div>
                    <div className="flex items-center justify-between text-white text-[16px]">
                      <p className="">Хугацаа </p>
                      <p className="font-bold">{item?.monthname}</p>
                    </div> */}
                  </div>
                  <div className="flex items-center justify-center gap-x-6 text-white text-[32px] uppercase font-bold mx-[25px] py-[20px] ">
                    <p className="">Үнийн дүн </p>
                    <p className="font-bold">{item?.saleprice}₮</p>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] w-full flex gap-[16px] px-[100px] cursor-pointer">
                <div
                  className="w-full italic text-[20px] text-center uppercase rounded-[8px] font-medium py-2 flex items-center justify-center"
                  style={{
                    color: "#C4C4C4",
                    background: "#272A32",
                  }}
                  onClick={() => {
                    setSelectDateModal(false);
                    setModal("date");
                  }}
                >
                  БОЛИХ
                </div>
                <div
                  className="w-full  text-[20px] text-center uppercase rounded-[8px] font-medium py-2 italic"
                  style={{
                    color: "var(--202020, #202020)",
                    background: "var(--green-main, #BAD405)",
                  }}
                  onClick={() => checkPayment()}
                >
                  КАРТААР ТӨЛӨХ
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return <>{content()}</>;
};

export default PaymentModal;
