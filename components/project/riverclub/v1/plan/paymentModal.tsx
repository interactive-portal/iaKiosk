import axios from "axios";
import Payment from "../payment/payment";
import { FC, useState } from "react";
import { notification } from "antd";
import Cookies from "js-cookie";

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
  const [loading, setLoading] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>({
    authcode: "86R5R6",
    pan: "949628XXXXXX9157",
    rrn: "005545138849",
    status: "success",
    terminalid: "70105432",
    traceno: "001099",
  });

  const session: any = Cookies.getJSON("customer");

  console.log("csession", session);

  const checkPayment = () => {
    setLoading(true);
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
        // setSelectDateModal(false);
        setModal("date");
      }
    );
  };
  // console.log("itemememmememememmememe", item);

  const paymentProcess = async () => {
    const res = await axios.post(`/api/post-process`, {
      processcode: "fitKioskSalesNew_DV_001",
      parameters: {
        subTotal: Number(item?.saleprice),
        total: Number(item?.saleprice),
        customerId: session?.customerId,
        fitKioskSalesDtlNew_DV: {
          productId: item?.id,
          unitPrice: Number(item?.saleprice),
          lineTotalPrice: Number(item?.saleprice),
          percentVat: "10",
          uniVat: "",
          lineTotalVat: "",
          unitAmount: Number(item?.saleprice),
          lineTotalAmount: Number(item?.saleprice),
        },
        fitKioskSalesPaymentNew_DV: {
          paymentMethodCode: paymentResult?.authcode,
          bankId: "khanbank",
          amount: Number(item?.saleprice),
          paymentTypeId: "2",
          confirmCode: paymentResult?.rrn,
          refenceNumber: "",
          terminalNumber: paymentResult?.terminalid,
          extTransactionId: paymentResult?.traceno,
        },
      },
    });
    if (res?.data?.status == "success") {
      console.log("processoos irsen resposne", res);
      alert("Төлбөр төлөлт амжилттай");
    } else {
      console.log("ososoososos aldaaa", res);
    }
  };

  if (loading) {
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
              Картаа уншуулна уу
            </p>
          </div>
        </div>
      </div>
    );
  }

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
};

export default PaymentModal;
