import { Icon } from "@iconify/react/dist/iconify.js";
import { Button, Input, Typography } from "@material-tailwind/react";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";
import { HeaderMobile } from "../../../components/headerMobile";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
export function ResetPassword() {
  const [inputPassType, setInputPassType] = useState("password");

  const formik = useFormik({
    initialValues: {
      newPassword: "",
      confirmationPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Preencha esse campo"),
      confirmationPassword: Yup.string()
        .required("Required")
        .oneOf([Yup.ref("newPassword")], "Passwords must match"),
    }),
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleSeePass = () => {
    if (inputPassType === "password") {
      setInputPassType("text");
    } else {
      setInputPassType("password");
    }
  };

  return (
    <div className="h-screen w-full md:flex bg-WHITE">
      <SideImageAuthorization />
      <HeaderMobile />

      <div className="w-full h-full flex justify-center items-center">
        <form
          onSubmit={formik.handleSubmit}
          className="p-6 bg-white rounded-md"
        >
          <Typography variant="h4" color="blue-gray">
            Altere sua senha
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Que legal te ver aqui, vamos alterar sua senha.
          </Typography>
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Nova senha
                  </Typography>
                  {formik.errors.newPassword && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.newPassword}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.newPassword}
                  id="newPassword"
                  name="newPassword"
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

              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between mb-3">
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Confirmação de senha
                  </Typography>
                  {formik.errors.confirmationPassword && (
                    <Typography variant="small" className="text-red-500">
                      {formik.errors.confirmationPassword}
                    </Typography>
                  )}
                </div>
                <Input
                  value={formik.values.confirmationPassword}
                  id="confirmationPassword"
                  name="confirmationPassword"
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

            <div className="mt-6 flex flex-col items-center">
              <Button
                disabled={formik.isSubmitting}
                fullWidth
                className="mt-2 bg-GOLD_MAIN disabled:opacity-65"
                type="submit"
              >
                Alterar minha senha
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
