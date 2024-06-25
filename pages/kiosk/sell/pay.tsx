import Qpay from "@/components/project/riverclub/v1/qpay/qpay";
import axios from "axios";
import Cookies from "js-cookie";
import { FC, useState } from "react";
import Layout from "../kioskLayout";
import { useRouter } from "next/navigation";

type PropsType = {
  item?: any;
  contractId?: any;
};

const Pay: FC<PropsType> = ({ item, contractId }) => {
  const router = useRouter();
  const [contentType, setContentType] = useState("");

  const session: any = Cookies.getJSON("customer");
  const paymentProcess = async (payment: any, type: any) => {
    const param =
      type == "pos"
        ? {
            subTotal: Number(item?.saleprice),
            total: Number(item?.saleprice),
            customerId: session?.customerId,
            vat: Number(item?.vat),
            contractId: contractId,
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
              extTransactionId: payment?.traceno || payment?.invoice_id,
            },
          }
        : {
            subTotal: Number(item?.saleprice),
            total: Number(item?.saleprice),
            customerId: session?.customerId,
            vat: Number(item?.vat),
            contractId: contractId,
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
              amount: Number(item?.saleprice),
              paymentTypeId: "40",
              extTransactionId: payment?.invoice_id,
            },
          };
    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskSalesNew_DV_001",
      parameters: param,
    });
    // console.log(param);
    if (res?.data?.status == "success") {
      console.log("processoos irsen resposne", res);
      //   setPrintOptions({
      //     lang: {
      //       mn: "",
      //       en: "",
      //     },
      //     ishtml: 1,
      //     print_options: {
      //       numberOfCopies: "1",
      //       isPrintNewPage: "1",
      //       isSettingsDialog: "0",
      //       isShowPreview: "1",
      //       isPrintPageBottom: "0",
      //       isPrintPageRight: "0",
      //       pageOrientation: "portrait",
      //       isPrintSaveTemplate: "1",
      //       paperInput: "portrait",
      //       pageSize: "a5",
      //       printType: "1col",
      //       templatemetaid: res?.data?.result?.templateId,
      //       templateIds: res?.data?.result?.templateId,
      //     },
      //   });
      const ebarimtResult = await axios.post(`/api/post-process`, {
        processcode: "kiosk_Ebarimt_Send",
        parameters: {
          id: res?.data?.result?.id,
        },
      });
      if (ebarimtResult?.data?.status == "success") {
        // setLoading(false);
        // setContractId(res?.data?.result?.id);
        // setModalContent("ebarimt");
      }
    } else {
      // console.log("aldaaa", res);
    }
  };
  const content = () => {
    switch (contentType) {
      case "choose":
        return (
          <div className="flex flex-col gap-y-20 uppercase mt-[20%] text-[64px]">
            <div
              className="bg-white rounded-[87px] text-[#525050] py-10"
              onClick={() => {
                setContentType("card");
              }}
            >
              карт
            </div>
            <div
              className="bg-white rounded-[87px] text-[#525050] py-10"
              onClick={() => {
                setContentType("qpay");
              }}
            >
              q pay
            </div>
          </div>
        );
      case "qpay":
        return (
          <>
            <Qpay item={item} paymentProcess={paymentProcess} />
          </>
        );
      case "card":
        return (
          <div className="min-h-[900px] flex items-center justify-center mt-20">
            <p className="text-white text-[64px] ">ТА КАРТАА УНШУУЛНА УУ!</p>
          </div>
        );
      default:
        return (
          <>
            <div className="flex flex-col gap-y-10 text-start">
              <div className="flex flex-col gap-y-4 text-white">
                <label className="text-[48px]">Үйлчилгээний төрөл</label>
                <input
                  className="bg-[#D9D9D94D] border  border-white min-h-[118px] rounded-[23px] px-10 text-[48px]"
                  value={item?.itemname}
                />
              </div>
              <div className="flex flex-col gap-y-4 text-white">
                <label className="text-[48px]">үнийн дүн</label>
                <input
                  className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-[23px] px-10 text-[48px]"
                  value={item?.saleprice}
                />
              </div>
              <div className="flex flex-col gap-y-4 text-white">
                <label className="text-[48px]">хугацаа</label>
                <input
                  className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-[23px] px-10 text-[48px]"
                  value={item?.monthname}
                />
              </div>
            </div>
            <div
              className="bg-[#A68B5C] text-white text-[70px] rounded-[87px]  mt-[300px] py-8"
              // onClick={() => setContentType("choose")}
              onClick={() => router.push("/kiosk/sell/ebarimt")}
            >
              ТӨЛБӨР ТӨЛӨХ
            </div>
          </>
        );
    }
  };

  return (
    <Layout>
      <p className="text-[90px] text-[#A68B5C] ">ТӨЛБӨР ТӨЛӨХ</p>
      {content()}
    </Layout>
  );
};

export default Pay;
