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
import { updateUser, IUser } from "../../../client/users";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

export const UserEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useTranslation();

  const [user, setUser] = useState<User | null>(null);
  const [userUpdate, setUserUpdate] = useState({});
  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );

  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUpdate({
      ...userUpdate,
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

  const updateUserData = async (userUpdate: IUser) => {
    const idUser = user?.id || undefined;
    await updateUser(userUpdate, idUser as string);
    toast("Usuário atualizado!", {
      position: "bottom-right",
      type: "success",
    });
    navigate(`/users`);
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
        <SectionTitle
          text={t("default.myAccount.admin.users.addUserForm.titleTertiary")}
        />
      </div>
      <form className="mt-12">
        <div className="bg-WHITE p-8 w-full rounded-md">
          <div className="flex items-center gap-4">
            <Icon height={16} icon={"heroicons:user"} color="black" />
            <SectionTitle
              size="sm"
              text={t("default.myAccount.admin.users.addUserForm.title")}
            />
          </div>
          <div className="mt-8 flex flex-col gap-6 ">
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                defaultValue={user?.name}
                type="text"
                label={t("default.myAccount.admin.users.addUserForm.name")}
                name="name"
                onChange={handleInputChange}
              />
              <Input
                defaultValue={user?.surname}
                type="text"
                label={t("default.myAccount.admin.users.addUserForm.surname")}
                name="surname"
                onChange={handleInputChange}
              />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <Input
                defaultValue={user?.email}
                type="email"
                label={t("default.myAccount.admin.users.addUserForm.email")}
                name="email"
                onChange={handleInputChange}
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
              <Input
                defaultValue={user?.username}
                type="text"
                label={t("default.myAccount.admin.users.addUserForm.userName")}
                name="username"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end mt-8">
          <Button
            className="bg-GOLD_MAIN w-full md:w-auto"
            type="button"
            onClick={() => updateUserData(userUpdate as IUser)}
          >
            {t("default.myAccount.admin.users.addUserForm.titleTertiary")}
          </Button>
        </div>
      </form>
    </div>
  );
};
