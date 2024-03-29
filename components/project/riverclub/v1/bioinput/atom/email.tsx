import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  obj?: any;
};

const Email: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage = errors[obj?.pathname]?.message;

  // console.log(errorMessage);
  return (
    <div className="flex flex-col ">
      <label className="text-[16px] font-medium  text-[#2A2A2A]">
        {obj?.labelname} <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        autoComplete="off"
        placeholder={obj?.labelname}
        {...register(
          obj?.pathname,
          obj.isRequired == 1
            ? {
                required: "Заавал бөглөх талбар !",
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: "И-мэйл хаягаа оруулна уу",
                },
              }
            : {}
        )}
        className={`mt-[8px] px-[14px] py-[17px] text-[16px] rounded-lg focus-visible:outline-none  ${
          errorMessage && "ring-1 ring-red-500"
        }`}
        // style={{
        //   boxShadow:
        //     "0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.64), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)",
        // }}
      />
      {/* {errorMessage && (
        <p className="text-red-500 text-[14px]">{errorMessage || ""}</p>
      )} */}
    </div>
  );
};

export default Email;
