import Layout from "../kioskLayout";
import { useState } from "react";
import { Modal, Spin } from "antd";
import CheckUser from "./checkUser";
import { useRouter } from "next/router";
import fetchJson from "@/util/helper";
import { LoadingOutlined } from "@ant-design/icons";

const Extend = () => {
  const [openModal, setOpenModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [loading, setLoading] = useState(false); // State for loading
  const router = useRouter(); // Next.js router for redirection

  // SWR fetcher function for search
  const fetchData = async (query: any) => {
    console.log("Fetching data with query:", query);
    const response = await fetchJson(
      `/api/get-data?metaid=1722853892303075&criteria=${JSON.stringify({
        filterRegNumber: [
          {
            operator: "=",
            operand: query,
          },
        ],
      })}`
    );
    return response;
  };

  const handleSearch = async () => {
    if (searchQuery) {
      setLoading(true);
      try {
        const data = await fetchData(searchQuery);

        if (data) {
          router.push({
            pathname: "/kiosk/member",
            query: { user: JSON.stringify(data) },
          });
        } else {
          alert("No user found for the given register number.");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("An error occurred while searching.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mb-10 mt-[150px]">
        СУНГАЛТ
      </div>
      <div className="relative min-w-[665px] mt-[100px]">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-6 fa-2xl text-white"></i>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="min-h-[87px] text-[#525050] text-[36px] min-w-[665px] rounded-[26px] pl-[70px]"
          placeholder="ХАЙЛТ"
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>
      <div className="text-white text-center text-[24px]">
        <p>REGISTER OR SERIAL NUMBER</p>
      </div>
      <div className="w-full text-center flex justify-center mt-[200px]">
        <button
          className="flex items-center bg-[#A68B5C] rounded-[26px] w-[443px] text-white px-10 py-6 justify-center gap-10"
          onClick={handleSearch}
          disabled={loading}
        >
          <p className="text-[40px]">ХАЙЛТ</p>
          <img
            src="/images/Face_id_white.png"
            className="max-w-[80px] max-h-[80px]"
          />
        </button>
        {loading && (
          <div className="flex justify-center items-center  ">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{ fontSize: 50, color: "white" }}
                  spin
                />
              }
            />
          </div>
        )}
      </div>

      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        title={false}
        footer={false}
        destroyOnClose
      >
        <CheckUser setOpenModal={setOpenModal} />
      </Modal>
    </Layout>
  );
};

export default Extend;
