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
  const [modalContent, setModalContent] = useState("ebarimt");
  const [paymentResult, setPaymentResult] = useState<any>(true);
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
          paymentProcess();
        } else {
          notification.error({
            message: item?.text,
          });
        }
      }
    );
  };

  const paymentProcess = async () => {
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
          paymentMethodCode: paymentResult?.pan,
          bankId: 500000,
          amount: Number(item?.saleprice),
          paymentTypeId: "2",
          confirmCode: paymentResult?.authcode,
          refenceNumber: paymentResult?.rrn,
          terminalNumber: paymentResult?.terminalid,
          extTransactionId: paymentResult?.traceno,
        },
      },
    });
    if (res?.data?.status == "success") {
      console.log("processoos irsen resposne", res);
      setModalContent("ebarimt");
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
          pageSize: "a6",
          printType: "1col",
          templatemetaid: res?.data?.result?.templateId,
          templateIds: res?.data?.result?.templateId,
        },
      });
      setContractId(res?.data?.result?.id);
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

    // setModal("date");
  };

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
      case "ebarimt":
        return (
          <div className="flex items-center justify-center h-full">
            <div className="w-[500px] bg-white overflow-scroll rounded-lg printContent">
              <iframe id="content" className="h-0 w-0 absolute"></iframe>
              <div id={"portraid"}>
                <ReportTemplate
                  options={printOptions}
                  data={{ contractId: contractId || "170174683396510" }}
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
                  margin: 1.6cm;
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
              className="w-[424px] h- box-border relative rounded"
              style={{
                background: "var(--202020, #202020)",
              }}
            >
              <div className="p-[30px]">
                <p className="text-[#BAD405] text-[22px] uppercase font-bold">
                  Төлбөр төлөх
                </p>
                <div className="rounded-lg border border-[#DEDEDE]  mt-[50px]">
                  <div className="flex flex-col gap-[20px] py-[45px] border-b mx-[25px] border-white">
                    <div className="flex items-center justify-between text-white text-[16px]">
                      <p className="">Багц </p>
                      <p className="font-bold">{item?.classificationname}</p>
                    </div>
                    <div className="flex items-center justify-between text-white text-[16px]">
                      <p className="">Хугацаа </p>
                      <p className="font-bold">{item?.monthname}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-white text-[16px] mx-[25px] py-[20px]">
                    <p className="">Үнийн дүн </p>
                    <p className="font-bold">{item?.saleprice}₮</p>
                  </div>
                </div>
              </div>
              <div className="pb-[20px] w-full flex gap-[16px] px-[64px] cursor-pointer">
                <div
                  className="w-full  text-[20px] text-center uppercase rounded font-medium py-2"
                  style={{
                    color: "var(--202020, #202020)",
                    background: "var(--green-main, #BAD405)",
                  }}
                  onClick={() => checkPayment()}
                >
                  ТӨЛБӨР ТӨЛӨХ
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
