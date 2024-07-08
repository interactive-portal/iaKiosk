import Layout from "../kioskLayout";
import { useState } from "react";
import { Modal } from "antd";
import CheckUser from "./checkUser";

const Extend = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <Layout>
      <div className="uppercase text-[90px] text-[#A68B5C] mb-10 mt-[150px]">
        СУНГАЛТ
      </div>
      <div className="relative min-w-[665px] mt-[100px]">
        <i className="fa-solid fa-magnifying-glass absolute top-1/2 left-6 fa-2xl text-white"></i>
        <input
          type="text"
          className="min-h-[87px] text-[#525050] text-[36px] min-w-[665px] rounded-[26px] pl-[70px]"
          placeholder="ХАЙЛТ"
        />
      </div>
      <div className="text-white text-center text-[24px]">
        <p>RECISTER OR SERIAL NUMBER</p>
      </div>
      <div className="w-full text-center flex justify-center mt-[200px]">
        <button
          className="flex items-center  bg-[#A68B5C] rounded-[26px] w-[443px] text-white px-10 py-6 justify-center gap-10"
          onClick={() => setOpenModal(!openModal)}
        >
          <p className="text-[40px]">ХАЙЛТ</p>
          <img
            src="/images/Face_id_white.png"
            className="max-w-[80px] max-h-[80px] "
          />
        </button>
        <style>
          {`
		:where(.css-dev-only-do-not-override-3mqfnx).ant-modal .ant-modal-content {
			padding:0px;
			border-radius:0px;
		}
		.ant-modal, .ant-modal-content {
			height: 100%;
			width: 1080px !important;
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
