import React, { useState } from "react";
import Layout from "../kioskLayout";
import Qpay from "@/components/project/riverclub/v1/qpay/qpay";
import { useRouter } from "next/navigation";

const Ebarimt = () => {
  const router = useRouter();
  const [view, setView] = useState("default");

  const renderDefaultView = () => (
    <div className="mt-[350px]">
      <p className="text-[90px] text-[#A68B5C]">e-barimt</p>
      <button
        className="h-[174px] w-[844px] bg-white rounded-full text-[64px] mt-[80px]"
        onClick={() => router.push("/kiosk/sell/warning")}
      >
        ХУВЬ ХҮН
      </button>
      <button
        className="h-[174px] w-[844px] bg-white rounded-full text-[64px] mt-[50px]"
        onClick={() => setView("organization")}
      >
        БАЙГУУЛЛАГА
      </button>
    </div>
  );

  const renderOrganizationView = () => (
    <div className="mt-[150px]">
      <p className="text-[90px] text-[#A68B5C] mb-[100px]">E-barimt</p>
      <div>
        <div>
          <p className="text-white text-[46px] text-start px-10 mb-10">
            БАЙГУУЛЛАГЫН РЕГИСТЕР
          </p>
          <input className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-full px-10 text-[48px] w-[788px]" />
        </div>
        <div>
          <p className="text-white text-[46px] text-start px-10 mb-10">
            БАЙГУУЛЛАГЫН НЭР
          </p>
          <input className="bg-[#D9D9D94D] border border-white min-h-[118px] rounded-full px-10 text-[48px]  w-[788px]" />
        </div>
      </div>

      <button
        className="h-[174px] text-white w-[844px] bg-[#A68B5C] rounded-full text-[64px] mt-[350px]"
        onClick={() => setView("payment")}
      >
        БАТЛАХ
      </button>
    </div>
  );

  const renderPaymentView = () => (
    <div className="mt-[350px]">
      <p className="text-[90px] text-[#A68B5C]">ТӨЛБӨР ТӨЛӨХ АРГА</p>
      <button
        className="h-[174px] w-[844px] bg-white rounded-full text-[64px] mt-[80px]"
        onClick={() => setView("card")}
      >
        Карт
      </button>
      <button
        className="h-[174px] w-[844px] bg-white rounded-full text-[64px] mt-[50px]"
        onClick={() => setView("qpay")}
      >
        QPay
      </button>
    </div>
  );

  const handleQpayPayment = async () => {
    // Logic for Qpay payment
    // After payment is successful:
    setView("receipt");
  };

  //   const renderQpay = () => <Qpay onPaymentSuccess={handleQpayPayment} />;

  const renderReceiptView = () => (
    <div className="min-h-[900px] flex items-center justify-center mt-20">
      <p className="text-white text-[64px]">ТА ТӨЛБӨРИЙН БАРИМТАА АВНА УУ!</p>
    </div>
  );

  return (
    <Layout>
      {view === "default" && renderDefaultView()}
      {view === "organization" && renderOrganizationView()}
      {view === "payment" && renderPaymentView()}
      {/* {view === "qpay" && renderQpay()} */}
      {view === "receipt" && renderReceiptView()}
    </Layout>
  );
};

export default Ebarimt;
