import { Icon } from "@iconify/react/dist/iconify.js";
import { SectionTitle } from "../../../components/sectionTitle";

export const History = () => {
  return (
    <div>
      <SectionTitle text="Registro atividades recentes" />
      <div className="w-full flex items-center px-6 mt-8">
        <div className="w-full flex items-center">
          <div className="w-full md:max-w-[384px]">
            <p className="font-display font-semibold text-body14 text-black">
              Tipo
            </p>
          </div>
          <div className="w-full">
            <p className="font-display font-semibold text-body14 text-black">
              Origem
            </p>
          </div>
        </div>
        <div className="w-full md:max-w-[384px]">
          <p className="font-display font-semibold text-body14 text-black">
            Data
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col mt-6 gap-6">
        <div className="w-full p-6 bg-WHITE flex items-center justify-between rounded-lg">
          <div className="flex items-center w-full">
            <div className="w-full md:max-w-[384px] flex items-center gap-4">
              <div className="bg-gray-200 h-10 w-10 rounded-full grid place-content-center">
                <Icon
                  icon={"heroicons:arrow-uturn-down"}
                  className="text-GRAY_400 text-body16"
                />
              </div>
              <p className="font-display text-body18 font-semibold text-BLACK">
                Resgate
              </p>
            </div>
            <div className="flex flex-col w-full md:max-w-[384px]">
              <p className="text-body16 font-body font-medium text-GRAY_400">
                Marlon Lencina
              </p>
              <span className="text-body14 font-body font-normal text-GRAY_400">
                marlon@mailfy.com
              </span>
            </div>
          </div>
          <div className="md:max-w-[384px] w-full">
            <p className="font-body text-body14 font-normal text-GRAY_400">
              11/09/2024 às 18:24 pm
            </p>
          </div>
        </div>
        <div className="w-full p-6 bg-WHITE flex items-center justify-between rounded-lg">
          <div className="flex items-center w-full">
            <div className="w-full md:max-w-[384px] flex items-center gap-4">
              <div className="bg-gray-200 h-10 w-10 rounded-full grid place-content-center">
                <Icon
                  icon={"radix-icons:dashboard"}
                  className="text-GRAY_400 text-body16"
                />
              </div>
              <p className="font-display text-body18 font-semibold text-BLACK">
                Aporte
              </p>
            </div>
            <div className="flex flex-col w-full md:max-w-[384px]">
              <p className="text-body16 font-body font-medium text-GRAY_400">
                Aline M. dos Santos
              </p>
              <span className="text-body14 font-body font-normal text-GRAY_400">
                alinemendessnts@gmail.com
              </span>
            </div>
          </div>
          <div className="md:max-w-[384px] w-full">
            <p className="font-body text-body14 font-normal text-GRAY_400">
              11/09/2024 às 18:24 pm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
