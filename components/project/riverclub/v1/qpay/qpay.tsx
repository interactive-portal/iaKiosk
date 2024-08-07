import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Statistic } from "antd";
import axios from "axios";
import _ from "lodash";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSWR from "swr";
// import SuccessCard from "../../card/successCard";
// import {Statistic} from "antd";

export default function Qpay({
  item,
  close,
  status,
  content,
  setPay,
  paymentProcess,
  setModalContent,
}: {
  item?: any;
  close?: any;
  status?: any;
  content?: any;
  setPay?: any;
  paymentProcess?: any;
  setModalContent?: any;
}) {
  if (_.isEmpty(item)) return <>Not Data</>;

  const { Countdown } = Statistic;

  const [res, setDatasrc] = useState<any>({});
  const [statusPay, setStatusPayment] = useState<any>();
  // const [resError, setResError] = useState<any>();

  // console.log("item :>> ", item);

  const orderid = item.id;
  const salesorder = item.invoiceid;
  const deadline = Date.now() + 1000 * 60 * 15;

  const sdmSalesOrderPaymentDtl = {
    paymentTypeId: "24",
    paymentDate: "2024",
    amt: 100,
  };

  const parameters = {
    id: salesorder,
    wfmStatusId: "1642050656876633",
    sdmSalesOrderPaymentDtl,
  };

  const qpayInfoData = async () => {
    let params = {
      sender_invoice_no: orderid,
      invoice_receiver_code: item?.itemcode,
      invoice_description: orderid,
      clienID: "RIVER_CLUB",
      clientSecret: "71GyeAnm",
      invoice_code: "RIVER_CLUB_INVOICE",
      amount: Number(item?.saleprice),
      callback_url: "http://localhost:4000/",
    };
    console.log("params qpay", params);
    const { data } = await axios.post(`/api/post-process`, {
      processcode: "QPAY_V2_CREATEINVOICE_SIMPLE",
      parameters: params,
    });

    console.log("data :>> ", data);
    if (data.status == "success") {
      setDatasrc(data.result);
      qpayMutate();
    } else {
      // setResError(data.text);
      alert(data.text);
    }
  };

  useEffect(() => {
    if (_.isEmpty(res)) qpayInfoData();
  }, [res]);

  const paramsCheck = {
    object_id: res.invoice_id,
  };

  const {
    data: statusPayment,
    error,
    mutate: qpayMutate,
  } = useSWR(
    `/api/get-process?command=qpay_v2_checkPayment&parameters=${JSON.stringify(
      paramsCheck
    )}`,
    {
      refreshInterval: 3000,
      revalidateOnFocus: false,
    }
  );

  useEffect(() => {
    if (statusPayment) {
      setStatusPayment(statusPayment);
      if (setPay) {
        setPay(statusPayment);
      }
    }
  }, [statusPayment]);

  // console.log("statusPayment :>> ", statusPayment);

  if (!_.isEmpty(statusPayment?.result?.rows)) {
    // alert("tolbor tologdlosadasdasdasdasdsao");
    // console.log(statusPayment?.rows);
    setModalContent("ebarimt");
    paymentProcess(res, "qpay");
  }

  const onClickScan = (link: any) => {
    window.open(link);
  };

  function onFinish() {
    window.location.reload();
  }

  const Qwin = () => {
    const urlScan = _.values(res?.urls);
    // if (isMobile) {
    //   return (
    //     <>
    //       <div className="flex justify-center text-center py-1 text-2xl border-b border-gray-300">
    //         {/* Төлбөр төлөх */}
    //         <Countdown
    //           title="Нэхэмжлэхийн дуусах хугацаа"
    //           value={deadline}
    //           onFinish={onFinish}
    //         />
    //       </div>
    //       <div className="flex justify-center my-4">
    //         <Image
    //           unoptimized
    //           src={`data:image/jpeg;base64,${res.qr_image}`}
    //           alt="QR Code"
    //           width={400}
    //           height={400}
    //         />
    //       </div>
    //       <div className="flex justify-center py-4 text-2xl border-t  border-gray-300">
    //         QR код уншуулна уу
    //       </div>
    //       <div className="grid grid-flow-col grid-cols-3 grid-rows-3 gap-2">
    //         {urlScan.map((item: any, index: number) => {
    //           return (
    //             <>
    //               <span
    //                 className="cursor-pointer hover:bg-blue-200  "
    //                 onClick={(e: any) => {
    //                   e.preventDefault();
    //                   onClickScan(item.link);
    //                 }}
    //               >
    //                 <Image
    //                   unoptimized
    //                   src={item.logo}
    //                   alt={item.description}
    //                   width={80}
    //                   height={80}
    //                 />
    //               </span>
    //             </>
    //           );
    //         })}
    //       </div>
    //     </>
    //   );
    // }

    const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

    if (!res.qr_image)
      return (
        <div className="min-h-[450px] flex flex-col space-y-8 items-center justify-center mx-auto">
          <Spin indicator={antIcon} />
        </div>
      );
    return (
      <>
        <div className="flex place-items-center justify-center my-4 flex-col">
          {/* <pre> {JSON.stringify(res, null, 2)}</pre> */}
          <div className="flex justify-center text-center py-1 text-2xl border-b border-gray-300 text-white">
            <Countdown
              title="Нэхэмжлэхийн дуусах хугацаа"
              value={deadline}
              onFinish={onFinish}
              style={{
                color: "white !important",
                zIndex: 50,
                position: "relative",
              }}
            />
          </div>
          {res && (
            <Image
              unoptimized
              src={`data:image/jpeg;base64,${res.qr_image}`}
              alt="QR Code"
              width={150}
              height={150}
            />
          )}
        </div>
        <div className="flex justify-center py-4 text-lg border-t  border-gray-300 text-white">
          QR код уншуулна уу
        </div>
        <style>
          {`
          .ant-statistic-content-value {
          color:white !important;
          }
          `}
        </style>
      </>
    );
  };
  return <>{Qwin()}</>;
}
// import { LoadingOutlined } from "@ant-design/icons";
// import { Spin, Statistic } from "antd";
// import axios from "axios";
// import _ from "lodash";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import useSWR from "swr";

// export default function Qpay({
//   item,
//   close,
//   status,
//   content,
//   setPay,
//   paymentProcess,
//   setModalContent,
//   onPaymentSuccess,
// }: {
//   item?: any;
//   close?: any;
//   status?: any;
//   content?: any;
//   setPay?: any;
//   paymentProcess?: any;
//   setModalContent?: any;
//   onPaymentSuccess?: () => Promise<void>;
// }) {
//   if (_.isEmpty(item)) return <>Not Data</>;

//   const { Countdown } = Statistic;

//   const [res, setDatasrc] = useState<any>({});
//   const [statusPay, setStatusPayment] = useState<any>();

//   const orderid = item.id;
//   const salesorder = item.invoiceid;
//   const deadline = Date.now() + 1000 * 60 * 15;

//   const sdmSalesOrderPaymentDtl = {
//     paymentTypeId: "24",
//     paymentDate: "2024",
//     amt: 100,
//   };

//   const parameters = {
//     id: salesorder,
//     wfmStatusId: "1642050656876633",
//     sdmSalesOrderPaymentDtl,
//   };

//   const qpayInfoData = async () => {
//     let params = {
//       sender_invoice_no: orderid,
//       invoice_receiver_code: item?.itemcode,
//       invoice_description: orderid,
//       clienID: "RIVER_CLUB",
//       clientSecret: "71GyeAnm",
//       invoice_code: "RIVER_CLUB_INVOICE",
//       amount: Number(item?.saleprice),
//       callback_url: "http://localhost:4000/",
//     };
//     console.log("params qpay", params);
//     try {
//       const { data } = await axios.post(`/api/post-process`, {
//         processcode: "QPAY_V2_CREATEINVOICE_SIMPLE",
//         parameters: params,
//       });
//       console.log("data :>> ", data);
//       if (data.status == "success") {
//         setDatasrc(data.result);
//         console.log("QR code data set successfully:", data.result);
//         qpayMutate();
//       } else {
//         alert(data.text);
//       }
//     } catch (error) {
//       console.error("Error fetching QR code data:", error);
//     }
//   };

//   useEffect(() => {
//     if (_.isEmpty(res)) qpayInfoData();
//   }, [res]);

//   const paramsCheck = {
//     object_id: res.invoice_id,
//   };

//   const {
//     data: statusPayment,
//     error,
//     mutate: qpayMutate,
//   } = useSWR(
//     `/api/get-process?command=qpay_v2_checkPayment&parameters=${JSON.stringify(
//       paramsCheck
//     )}`,
//     {
//       refreshInterval: 3000,
//       revalidateOnFocus: false,
//     }
//   );

//   useEffect(() => {
//     if (statusPayment) {
//       setStatusPayment(statusPayment);
//       if (setPay) {
//         setPay(statusPayment);
//       }
//       if (onPaymentSuccess && statusPayment?.result?.rows) {
//         onPaymentSuccess();
//       }
//     }
//   }, [statusPayment]);

//   useEffect(() => {
//     if (!_.isEmpty(statusPayment?.result?.rows)) {
//       setModalContent("ebarimt");
//       paymentProcess(res, "qpay");
//     }
//   }, [statusPayment]);

//   const onClickScan = (link: any) => {
//     window.open(link);
//   };

//   function onFinish() {
//     window.location.reload();
//   }

//   const Qwin = () => {
//     const urlScan = _.values(res?.urls);
//     const antIcon = <LoadingOutlined style={{ fontSize: 120 }} spin />;

//     if (!res.qr_image)
//       return (
//         <div className="min-h-[450px] flex flex-col space-y-8 items-center justify-center mx-auto">
//           <Spin indicator={antIcon} />
//         </div>
//       );
//     return (
//       <>
//         <div className="flex place-items-center justify-center my-4 flex-col">
//           <div className="flex justify-center text-center py-1 text-2xl border-b border-gray-300 text-white">
//             <Countdown
//               title="Нэхэмжлэхийн дуусах хугацаа"
//               value={deadline}
//               onFinish={onFinish}
//               style={{
//                 color: "white !important",
//                 zIndex: 50,
//                 position: "relative",
//               }}
//             />
//           </div>
//           {res.qr_image && (
//             <Image
//               unoptimized
//               src={`data:image/jpeg;base64,${res.qr_image}`}
//               alt="QR Code"
//               width={150}
//               height={150}
//             />
//           )}
//         </div>
//         <div className="flex justify-center py-4 text-lg border-t border-gray-300 text-white">
//           QR код уншуулна уу
//         </div>
//         <style>
//           {`
//           .ant-statistic-content-value {
//             color: white !important;
//           }
//           `}
//         </style>
//       </>
//     );
//   };
//   return <>{Qwin()}</>;
// }
