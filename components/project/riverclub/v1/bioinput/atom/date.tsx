import { FC } from "react";
import { DatePicker, DatePickerProps } from "antd";
import { data } from "autoprefixer";
import { useFormContext, Controller, useForm } from "react-hook-form";
import moment from "moment";

type PropsType = {
  obj?: any;
};

const Date: FC<PropsType> = ({ obj }) => {
  const {
    register,
    formState: { errors },
    getValues,
    setValue,
    control,
  } = useFormContext();

  const onchange: DatePickerProps["onChange"] = (date, dateString) => {
    setValue(obj?.pathname, dateString);
  };

  return (
    <div className="flex flex-col ">
      <label className="text-[16px] font-medium  text-[#2A2A2A] mb-[8px]">
        {obj?.labelname}
      </label>
      <Controller
        control={control}
        name={`${obj?.pathname}`}
        render={({ field }) => (
          <DatePicker
            placeholder={`${obj?.labelname}`}
            onChange={onchange}
            onSelect={field.value}
            style={{
              border: "1px solid #e5e7eb",
              padding: "17px 16px 17px 16px",
            }}
          />
        )}
      />
    </div>
  );
};

export default Date;
