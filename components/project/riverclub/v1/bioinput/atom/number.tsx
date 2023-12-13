import { FC } from "react";
import { useFormContext } from "react-hook-form";

type PropsType = {
  obj?: any;
};

const Number: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const errorMessage: any = errors[obj?.pathname]?.message;

  return (
    <div className="flex flex-col ">
      <label className="text-[16px] font-medium  text-[#2A2A2A]">
        {obj?.labelname}
      </label>
      <input
        type="number"
        autoComplete="off"
        placeholder={obj?.labelname}
        {...register(
          obj?.pathname,
          obj.isRequired == 1
            ? {
                required: "Заавал бөглөх талбар !",
                maxLength: { value: 13, message: "Утасны дугаараа оруулна уу" },
              }
            : {}
        )}
        className={`mt-[8px] px-[14px] py-[17px] text-[16px] rounded-lg focus-visible:outline-none ${
          errorMessage && "ring-1 ring-red-500"
        }`}
        // style={{
        //   boxShadow:
        //     "0px 1px 1px 0px rgba(0, 0, 0, 0.12), 0px 0px 0px 1px rgba(0, 0, 0, 0.64), 0px 2px 5px 0px rgba(103, 110, 118, 0.08)",
        // }}
      />
      {errorMessage && (
        <p className="text-red-500 text-[14px]">{errorMessage || ""}</p>
      )}
    </div>
  );
};

export default Number;
