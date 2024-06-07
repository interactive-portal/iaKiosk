import useSWR from "swr";
import { useRouter } from "next/router";
import moment from "moment";
import Layout from "../kioskLayout";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import ReportTemplate from "@/middleware/ReportTemplate/ReportTemplate";
import fetchJson from "@/util/helper";
import Cookies from "js-cookie";
import axios from "axios";

const Sell = () => {
  const [loading, setLoading] = useState(true);
  const [templateId, setTemplateId] = useState("");
  const [contractId, setContractId] = useState("");
  const customer: any = Cookies.getJSON("customer");
  const router = useRouter();
  const date = moment().format("YYYY-MM-DD");
  const criteria = JSON.stringify({
    id: [
      {
        operator: "=",
        operand: router.query?.i,
      },
    ],
  });

  // reportTemplate дуудах
  const printOptions = {
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
      pageSize: "a4",
      printType: "1col",
      templatemetaid: templateId,
      templateIds: templateId,
    },
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await fetchJson(
      `/api/get-data?metaid=1701156148201731&criteria=${criteria}`
    );
    if (result?.status == "success") {
      const readydata = result?.result?.[0];
      const param = {
        contracttypeid: readydata?.contracttypeid,
        contractTotalAmount: readydata?.saleprice,
        customerId: customer?.customerId,
        durationTypeId: readydata?.monthid,
        startDate: date,
        itemId: readydata?.id,
        price: readydata?.saleprice,
        amount: readydata?.saleprice,
      };
      const res = await axios.post(`/api/post-process`, {
        processcode: "fitKioskCreateContract_DV_001",
        parameters: param,
      });
      if (res?.data?.status == "success") {
        console.log(res?.data?.result);
        setTemplateId(res?.data?.result?.templateId);
        setContractId(res?.data?.result?.id);
        setLoading(false);
      }
    }
  };

  if (loading) {
    return (
      <Layout>
        <Spin fullscreen size="large" />
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col px-10 gap-y-10 text-white uppercase">
        <p className="text-[64px]">ГЭРЭЭ</p>
        <div className="max-h-[1234px]">
          <ReportTemplate
            options={printOptions}
            data={{ contractId: contractId }}
          />
        </div>
        <div className="flex items-center gap-x-4">
          <input
            type="checkbox"
            className="w-[80px] h-[80px] rounded-[13px] bg-transparent border-[3px] border-white"
          />
          <p className="text-[36px]">ЗӨВШӨӨРӨВ</p>
        </div>
      </div>
    </Layout>
  );
};

export default Sell;
