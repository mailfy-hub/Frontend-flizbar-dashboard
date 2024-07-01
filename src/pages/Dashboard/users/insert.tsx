import { useState } from "react";
import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { SectionTitle } from "../../../components/sectionTitle";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { CountryType, countries } from "../../../utils/number-config";
import { generateUniqueUsername } from "../../../utils/generateUsername";
import { useAuth } from "../../../hook/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { SignUpProps } from "../../../types/auth";

export const UserInsert = () => {
  const navigate = useNavigate();
  const { signUpAdmin } = useAuth();
  const handleNavigateBack = () => {
    navigate(-1);
  };

  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    surname: "",
    phone: "",
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  const onSubmit = async () => {
    const username = generateUniqueUsername(user.name, user.surname);
    handleSignUp({ username, ...user });
  };

  const handleSignUp = async (info: SignUpProps) => {
    try {
      await signUpAdmin(info);
      toast("Conta criada!", {
        position: "bottom-right",
        type: "success",
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast(error.response?.data, {
          position: "bottom-right",
          type: "error",
        });
      } else {
        console.error(error);
      }
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Preencha o formulário de inclusão" />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle size="sm" text="Usuário" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                type="email"
                name="email"
                label="E-mail de acesso*"
                onChange={handleInputChange}
              />
              <Input
                type="password"
                name="password"
                label="Senha*"
                onChange={handleInputChange}
              />
              <Input
                type="text"
                label="Nome*"
                onChange={handleInputChange}
                name="name"
              />
              <Input
                type="text"
                name="surname"
                label="Sobrenome*"
                onChange={handleInputChange}
              />
              <InputWithDropdown
                handleChangeCountry={handleSelectedCountry}
                selectedCountry={selectedCountry}
                id="phone"
                name="phone"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            className="bg-GOLD_MAIN w-full md:w-auto"
            type="button"
            onClick={() => {
              onSubmit();
              console.log("Adicionar usuário");
            }}
          >
            Adicionar Usuário
          </Button>
        </div>
      </form>
    </div>
  );
};
