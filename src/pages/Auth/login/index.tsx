import { Button, Option, Select, Typography } from "@material-tailwind/react";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SideImageAuthorization } from "../../../components/sideImageAuthorization";
import { useAuth } from "../../../hook/auth";

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const handleChangeRole = (newRole: string) => {
    setRole(newRole);
  };
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    if (role == "user") {
      login({
        email: "marlon@mailfy.com",
        password: "marlon123",
      });
    } else {
      login({
        email: "admin@flibzar.com",
        password: "admin",
      });
    }

    navigate("/");
  };

  return (
    <div className="h-screen w-full flex bg-WHITE">
      <SideImageAuthorization />
      <div className="w-full h-full flex justify-center items-center">
        <form onSubmit={handleLogin} className="p-6 bg-white rounded-md">
          <Typography variant="h4" color="blue-gray">
            Entre na sua conta
          </Typography>
          <Typography color="gray" className="mt-1 font-normal">
            Que bom te ver denovo, faça seu login.
          </Typography>
          <div className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-1 flex flex-col gap-6">
              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Seu e-mail
              </Typography>
              <Select
                label="Autorização no sistema"
                value={role}
                onChange={(val) => {
                  val && handleChangeRole(val);
                }}
              >
                <Option value="user">User</Option>
                <Option value="admin">Admin</Option>
              </Select>
              {/* <Input
                size="md"
                placeholder="Insira seu e-mail"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              />

              <Typography variant="h6" color="blue-gray" className="-mb-3">
                Senha de acesso
              </Typography> */}
              {/*  <Input
                type="password"
                size="md"
                placeholder="********"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
              /> */}
            </div>

            <Button className="mt-6 bg-GOLD_MAIN" fullWidth type="submit">
              Entrar
            </Button>
            <Typography color="gray" className="mt-4 text-center font-normal">
              Ainda não tem uma conta?{" "}
              <Link to="/register" className="font-medium text-gray-900">
                Cadastrar
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </div>
  );
}
