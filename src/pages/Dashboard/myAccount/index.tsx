import {
  ArrowUpTrayIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Input,
  Option,
  Popover,
  PopoverContent,
  PopoverHandler,
  Select,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";
import { useState } from "react";
import { DayPicker } from "react-day-picker";

export const MyAccount = () => {
  const [date, setDate] = useState();

  return (
    <>
      <section className="pt-12 container mx-auto">
        <Typography variant="h5" color="black">
          Imagem de perfil
        </Typography>
        <Typography variant="small" className="text-GRAY_400 font-normal mt-1">
          Atualize sua imagem de perfil na plataforma
        </Typography>
        <div className="flex justify-between items-start mt-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="flex items-center gap-3">
              <img
                src="https://www.material-tailwind.com/img/avatar1.jpg"
                alt="dark"
                className="w-14 rounded-lg"
              />
              <div>
                <Typography color="black" className="!font-semibold mb-1">
                  Selecione e faça o upload do avatar.
                </Typography>
                <Typography
                  variant="small"
                  className="!font-medium text-GRAY_400"
                >
                  .svg, .png, .jpg (size 400x400px).
                </Typography>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button className="flex gap-2 bg-GOLD_MAIN">
                <ArrowUpTrayIcon
                  strokeWidth={2}
                  className="h-4 w-4 text-white"
                />
                Atualizar avatar
              </Button>
              <Button className="bg-GRAY_400">Remover</Button>
            </div>
          </div>
        </div>
      </section>
      <section className=" mt-12 container mx-auto">
        <Typography variant="h5" color="black">
          Suas informações
        </Typography>
        <Typography variant="small" className="text-GRAY_400 font-normal mt-1">
          Atualize seus dados da conta abaixo
        </Typography>
        <div className="flex flex-col mt-8">
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Primeiro nome
              </Typography>
              <Input
                size="lg"
                label="Primeiro nome"
                className="w-full placeholder:opacity-100  "
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Sobrenome
              </Typography>
              <Input
                size="lg"
                label="Sobrenome"
                className="w-full placeholder:opacity-100  "
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Seu gênero
              </Typography>
              <Select
                size="lg"
                label="Gênero"
                className=" aria-[expanded=true]:border-t-primary"
              >
                <Option>Male</Option>
                <Option>Female</Option>
              </Select>
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Data de nascimento
              </Typography>
              <Popover placement="bottom">
                <PopoverHandler>
                  <Input
                    size="lg"
                    onChange={() => null}
                    placeholder="Selecione o dia"
                    value={date ? format(date, "PPP") : ""}
                    labelProps={{
                      className: "hidden",
                    }}
                    className="w-full placeholder:opacity-100 "
                  />
                </PopoverHandler>
                <PopoverContent>
                  <DayPicker
                    mode="single"
                    selected={date}
                    onSelect={setDate as any}
                    showOutsideDays
                    className="border-0"
                    classNames={{
                      caption:
                        "flex justify-center py-2 mb-4 relative items-center",
                      caption_label: "text-sm !font-medium text-gray-900",
                      nav: "flex items-center",
                      nav_button:
                        "h-6 w-6 bg-transparent hover:bg-black-50 p-1 rounded-md transition-colors duration-300",
                      nav_button_previous: "absolute left-1.5",
                      nav_button_next: "absolute right-1.5",
                      table: "w-full border-collapse",
                      head_row: "flex !font-medium text-gray-900",
                      head_cell: "m-0.5 w-9 !font-normal text-sm",
                      row: "flex w-full mt-2",
                      cell: "text-gray-600 rounded-md h-9 w-9 text-center text-sm p-0 m-0.5 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-gray-900/20 [&:has([aria-selected].day-outside)]:text-white [&:has([aria-selected])]:bg-gray-900/50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                      day: "h-9 w-9 p-0 !font-normal",
                      day_range_end: "day-range-end",
                      day_selected:
                        "rounded-md bg-gray-900 text-white hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white",
                      day_today: "rounded-md bg-gray-200 text-gray-900",
                      day_outside:
                        "day-outside text-gray-500 opacity-50 aria-selected:bg-gray-500 aria-selected:text-gray-900 aria-selected:bg-opacity-10",
                      day_disabled: "text-gray-500 opacity-50",
                      day_hidden: "invisible",
                    }}
                    components={{
                      IconLeft: ({ ...props }) => (
                        <ChevronLeftIcon
                          {...props}
                          className="h-4 w-4 stroke-2"
                        />
                      ),
                      IconRight: ({ ...props }) => (
                        <ChevronRightIcon
                          {...props}
                          className="h-4 w-4 stroke-2"
                        />
                      ),
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Email
              </Typography>
              <Input
                size="lg"
                label="E-mail de acesso"
                className="w-full placeholder:opacity-100  "
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Confirme o Email
              </Typography>
              <Input
                size="lg"
                label="Confirme seu e-mail"
                className="w-full placeholder:opacity-100  "
              />
            </div>
          </div>
          <div className="mb-6 flex flex-col items-end gap-4 md:flex-row">
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Phone Number
              </Typography>
              <Input
                size="lg"
                placeholder="+123 0123 456 789"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100  "
              />
            </div>
            <div className="w-full">
              <Typography
                variant="small"
                color="black"
                className="mb-2 font-medium"
              >
                Language
              </Typography>
              <Input
                size="lg"
                placeholder="Language"
                labelProps={{
                  className: "hidden",
                }}
                className="w-full placeholder:opacity-100  "
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
