import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderMobile } from "../../../components/headerMobile";
import { InputWithDropdown } from "../../../components/inputWithDropdown";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../../../hook/auth";
import { AUTH_ERROR, SignUpProps } from "../../../types/auth";
import { generateUniqueUsername } from "../../../utils/generateUsername";
import { CountryType, countries } from "../../../utils/number-config";

export function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { t } = useTranslation();

  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      phone: "",
      agree: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Preencha esse campo"),
      surname: Yup.string().required("Preencha esse campo"),
      email: Yup.string().email().required("Preencha esse campo"),
      password: Yup.string().required("Preencha esse campo"),
      phone: Yup.string().required("Preencha esse campo"),
      agree: Yup.boolean().oneOf(
        [true],
        "Você precisa concordar com nossos termos e condições."
      ),
    }),
    onSubmit: (values) => {
      const username = generateUniqueUsername(values.name, values.surname);
      handleSignUp({ username, ...values });
    },
  });

  const handleSignUp = async (info: SignUpProps) => {
    try {
      await signUp(info);
      toast("Conta criada!", {
        position: "bottom-right",
        type: "success",
      });
      navigate("/login");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setResponseError(error.response?.data as AUTH_ERROR);
        console.log(error.response?.data);
      } else {
        console.error(error);
      }
    } finally {
      formik.setSubmitting(false);
    }
  };

  const [selectedCountry, setSelectedCountry] = useState<CountryType>(
    countries[0]
  );

  const [inputPassType, setInputPassType] = useState("password");
  const handleSeePass = () => {
    if (inputPassType === "password") {
      setInputPassType("text");
    } else {
      setInputPassType("password");
    }
  };

  const handleSelectedCountry = (selected: CountryType) => {
    setSelectedCountry(selected);
  };

  const [isDialogContractOpen, setIsDialogContractOpen] = useState(false);
  const handleDialogContract = () => [
    setIsDialogContractOpen((state) => !state),
  ];

  const [responseError, setResponseError] = useState<AUTH_ERROR | null>();
  const mappedError = useMemo(() => {
    switch (responseError?.message) {
      case "User e-mail already exists":
        return "Endereço de e-mail já está em uso.";
      default:
        "Erro de servidor, tente novamente ou retorne mais tarde.";
        break;
    }
  }, [responseError]);

  return (
    <div className="h-screen w-full md:flex bg-white">
      <Dialog
        open={isDialogContractOpen}
        handler={handleDialogContract}
        size="lg"
      >
        <DialogHeader>{t("default.termsAndConditions.title")}</DialogHeader>
        <DialogBody divider className="max-h-[400px] overflow-y-auto">
          <Typography variant="h6" color="blue-gray">
            {t("default.termsAndConditions.subtitle")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.welcomeText")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.firstTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.secondTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.thirdTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.fourthTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.fifthTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.sixthTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.seventhTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.eighthTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.ninthTerm")}
          </Typography>
          <Typography variant="body2" color="gray" className="mt-2">
            {t("default.termsAndConditions.tenthTerm")}
          </Typography>
        </DialogBody>
        <DialogFooter>
          <Button color="gray" onClick={handleDialogContract}>
            {t("default.buttonClose")}
          </Button>
        </DialogFooter>
      </Dialog>

      <SideImageAuthorization />
      <HeaderMobile />

      <div className="w-full h-full flex justify-center  pt-[72px] overflow-y-scroll">
        <form onSubmit={formik.handleSubmit} className=" bg-white rounded-md">
          <Typography variant="h4" color="blue-gray">
            {t("default.register.title")}
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            {t("default.register.subtitle")}
          </Typography>
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="">
                    {t("default.register.labelName")}
                  </Typography>
                  {formik.errors.name && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.name}
                    </Typography>
                  )}
                </div>

                <Input
                  value={formik.values.name}
                  id="name"
                  name="name"
                  type="text"
                  onChange={formik.handleChange}
                  size="md"
                  placeholder={t("default.register.placeHolderName")}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray">
                    {t("default.register.labelSurname")}
                  </Typography>
                  {formik.errors.surname && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.surname}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.surname}
                  id="surname"
                  name="surname"
                  type="text"
                  onChange={formik.handleChange}
                  size="md"
                  placeholder={t("default.register.placeHolderSurname")}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray">
                    {t("default.register.labelEmail")}
                  </Typography>
                  {formik.errors.email && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.email}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.email}
                  id="email"
                  name="email"
                  type="email"
                  onChange={formik.handleChange}
                  size="md"
                  placeholder={t("default.register.placeHolderEmail")}
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    {t("default.labelPhone")}
                  </Typography>
                  {formik.errors.phone && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.phone}
                    </Typography>
                  )}
                </div>
                <InputWithDropdown
                  handleChangeCountry={handleSelectedCountry}
                  selectedCountry={selectedCountry}
                  value={formik.values.phone}
                  id="phone"
                  name="phone"
                  type="text"
                  onChange={formik.handleChange}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    {t("default.register.labelPassword")}
                  </Typography>
                  {formik.errors.password && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.password}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.password}
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  type={inputPassType}
                  size="md"
                  placeholder="********"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  icon={
                    <button onClick={handleSeePass} type="button">
                      <Icon
                        color="#90A4AE"
                        icon={"heroicons:eye"}
                        height={16}
                      />
                    </button>
                  }
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center">
                <Checkbox
                  id="agree"
                  name="agree"
                  checked={formik.values.agree}
                  onChange={formik.handleChange}
                />
                <Typography variant="paragraph" color="gray">
                  {t("default.register.textTerms")}{" "}
                  <button
                    type="button"
                    onClick={handleDialogContract}
                    className="text-blue-500"
                  >
                    {t("default.register.linkTerms")}
                  </button>
                </Typography>
              </div>
              {formik.errors.agree && (
                <Typography variant="small" className="text-red-500">
                  {formik.errors.agree}
                </Typography>
              )}
            </div>

            <div className="mt-6 flex flex-col items-center">
              {responseError?.message && (
                <div>
                  <Typography variant={"small"} color={"red"}>
                    {mappedError}
                  </Typography>
                </div>
              )}
              <Button
                disabled={formik.isSubmitting}
                type="submit"
                className="mt-6 bg-GOLD_MAIN disabled:opacity-65"
                fullWidth
              >
                {t("default.register.button")}
              </Button>
            </div>

            <Typography color="gray" className="mt-4 text-center font-normal">
              {t("default.register.haveAccount")}{" "}
              <Link to="/login" className="font-medium text-gray-900">
                {t("default.register.linkLogin")}
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
