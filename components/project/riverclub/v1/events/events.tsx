const Events = () => {
  return (
    <div className="flex flex-col gap-y-4 mx-10">
      {[0, 1, 2, 3].map((item: any, index: number) => {
        let left = true;
        if (index % 2) {
          left = true;
        } else {
          left = false;
        }
        return (
          <div
            className={`flex ${
              left && "flex-row-reverse"
            } gap-x-5 bg-[#F3E686]`}
          >
            <div
              className={`${
                left ? "text-left" : "text-right"
              }  flex flex-col gap-y-4 justify-center`}
            >
              <p className="text-[20px] uppercase font-medium">
                ДЭЛХИЙН АВАРГА
              </p>
              <p className="text-[16px] uppercase">
                Спиннинг бол тэсвэр хатуужил, хурд. зүрх судасны үйл ажиллагааг
                сайжруулж өндөр хэмжээний калори шатаах эрч хүчтэй кардио дасгал
                юм.
              </p>
              <p className="text-[16px] uppercase">2023.12.07-2023.12.25</p>
              <p className="text-[16px] uppercase">Tax : free</p>
            </div>
            <img
              src="/images/noimage.png"
              className="w-[237px] h-[237px] object-cover"
            />
            <div
              className={`${
                left ? "pl-5" : "pr-5"
              } h-full flex flex-col items-start mt-4 text-[22px] font-medium`}
            >
              <p>11.15</p>
              <p>12.18</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Events;
