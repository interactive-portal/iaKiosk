import { useState } from "react";

const CheckUser = () => {
  const [contentType, setContentType] = useState("error");
  const clickCamera = () => {
    setContentType("opencamera");
    var ws = new WebSocket(`${process.env.NEXT_PUBLIC_FACECAMERA_URL}`);

    // setOpenModal(true);

    ws.onopen = function () {
      ws.send('{"action":"GetImage"}');
    };

    ws.onmessage = function (event) {
      var res = JSON.parse(event.data);
      console.log("resresssssss", res);

      if (res?.result.image != null) {
        console.log("resresssssss", res);
        // setImageToken(res?.result.image);
        // setValue(res?.result?.value);
        ws.send('{"action":"Close"}');
      } else {
      }
    };

    ws.onerror = function (event) {
      // alert(event.data);
    };

    ws.onclose = function () {
      // console.log("Connection is closed");
      // }
    };
  };
  const content = () => {
    switch (contentType) {
      case "opencamera":
        return <></>;
      case "error":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className="text-white text-[36px] text-center px-10">
              ЦАРАЙ ТАНИГДАХГҮЙ БАЙНА
            </span>
            <span className="text-white text-[32px] text-center px-10">
              ДАХИН ОРОЛДОНО УУ!
            </span>
            <div className="flex items-center gap-x-2 justify-between w-full">
              <button
                className="text-[36px] text-[#525050] bg-white rounded-[87px] w-full py-2"
                onClick={() => clickCamera()}
              >
                ДАХИН ОРОЛДОХ
              </button>
              <button
                className="text-[36px] text-[#525050] bg-white rounded-[87px] w-full py-2"
                onClick={() => clickCamera()}
              >
                БОЛИХ
              </button>
            </div>
            <style>
              {`
				.ant-modal-body {
				width:100%;
				}
				`}
            </style>
          </div>
        );
      case "success":
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[20px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className="text-white text-[48px] text-center px-10">
              ЦАРАЙ ТАНИЛТ АМЖИЛТТАЙ
            </span>
            <span className="text-white text-[32px]">ТАНД БАЯРЛАЛАА</span>
            <div className="uppercase mt-[200px]">
              <button className="p-8 rounded-[87px] bg-[#A68B5C] text-white text-[40px] uppercase">
                дараагийн хуудас
              </button>
            </div>
            <style>
              {`
    .ant-modal-body {
    width:100%;
    }
    `}
            </style>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center gap-y-[50px] mx-[100px]">
            <img
              src="/images/Face_id_white.png"
              className="w-[366px] h-[366px] mt-4"
              //   onClick={() => setOpenLogin(true)}
            />
            <span className="text-white text-[36px] text-center px-10">
              ЦАРАЙГАА ТАНИУЛЖ СУНГАЛТАА ҮРГЭЛЖЛҮҮНЭ ҮҮ!
            </span>
            <button
              className="text-[64px] text-[#525050] bg-white rounded-[87px] w-full py-10 mx-10"
              onClick={() => clickCamera()}
            >
              SCAN
            </button>
          </div>
        );
    }
  };
  return (
    <div className="w-[900px]">
      {content()}
      <style>
        {`
						.ant-modal-body {
						display:flex;
						justify-content:center;
						align-items:center;
						font-family:AG;
						}
						`}
      </style>
    </div>
  );
};

export default CheckUser;
