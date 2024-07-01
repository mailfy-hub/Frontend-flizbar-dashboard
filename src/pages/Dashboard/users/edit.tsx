import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../../../client/api";
import { SectionTitle } from "../../../components/sectionTitle";
import { User } from "../../../types/dashboard/users";
import { CountryType, countries } from "../../../utils/number-config";
import { InputWithDropdown } from "../../../components/inputWithDropdown";

export const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [user, setUser] = useState<User | null>(null);

  const [editUser, setEditUser] = useState({
    email: user?.email || "",
    password: "",
    name: user?.name || "",
    surname: user?.surname || "",
    phone: user?.phone || "",
  });

  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );

  console.log("user", user);

  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditUser({
      ...editUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleNavigateBack = () => {
    navigate(-1);
  };

  const getUser = async (id: string) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getUser(id);
    }
  }, [id]);

  return (
    <div>
      <div className="flex items-center gap-4">
        <button onClick={handleNavigateBack} className="">
          <ArrowLeftIcon
            height={18}
            className="text-GRAY_400 hover:text-GOLD_DARK transition-all"
          />
        </button>
        <SectionTitle text="Dados do usuário" />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle size="sm" text="Usuário" />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input value={user?.name} type="text" label="Nome*" />
              <Input value={user?.surname} type="text" label="Sobrenome*" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                value={user?.email}
                type="email"
                label="E-mail de acesso*"
              />
              <InputWithDropdown
                handleChangeCountry={handleSelectedCountry}
                selectedCountry={selectedCountry}
                id="phone"
                name="phone"
                type="text"
                defaultValue={user?.phone || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input value={user?.username} type="text" label="Username*" />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button className="bg-GOLD_MAIN w-full md:w-auto">
            Atualizar dados
          </Button>
        </div>
      </form>
    </div>
  );
};
