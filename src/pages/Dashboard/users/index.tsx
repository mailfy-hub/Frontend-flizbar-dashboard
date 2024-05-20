import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/16/solid";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import { SectionTitle } from "../../../components/sectionTitle";
import { useNavigate } from "react-router-dom";

const TABLE_ROW = [
  {
    id: "1",
    name: "Emma Roberts",
    email_address: "emma@mail.com",
    created_at: "23/04/18",
  },
];

const TABLE_HEAD = ["ID", "Nome", "Endereço de e-mail", "Data de criação", " "];

export const Users = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("insert");
  };
  return (
    <div>
      <SectionTitle text="Todos usuários" />
      <Card shadow={false} className="h-full w-full mt-8">
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex flex-wrap gap-4 justify-between mb-4 p-2"
        >
          <div>
            <Typography variant="h6" color="#0C0B0A">
              Tabela de usuários
            </Typography>
            <Typography variant="small" className="text-GRAY_400 font-normal">
              Veja informações sobre todos seus usuários
            </Typography>
          </div>
          <div className="flex flex-wrap items-center w-full shrink-0 gap-4 md:w-max">
            <div className="w-full md:w-72">
              {/* <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              /> */}
            </div>
            <Button
              onClick={handleNavigate}
              className="md:max-w-fit w-full bg-GOLD_MAIN"
            >
              ADICIONAR USUÁRIO
            </Button>
          </div>
        </CardHeader>
        <CardBody className="overflow-auto !p-0">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th key={head} className="!p-6">
                    <Typography
                      color="blue-gray"
                      variant="small"
                      className="!font-bold"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROW.map(({ id, name, email_address, created_at }) => {
                const classes = "!p-6 ";
                return (
                  <tr key={name}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-semibold"
                          >
                            {id}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="!font-semibold"
                          >
                            {name}
                          </Typography>
                          {/*                             <Typography
                              variant="small"
                              className="!font-normal text-gray-600"
                            >
                              {detail}
                            </Typography> */}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div>
                        <Typography
                          variant="small"
                          color="#757575"
                          className="!font-normal"
                        >
                          {email_address}
                        </Typography>
                      </div>
                    </td>

                    <td className={classes}>
                      <Typography
                        variant="small"
                        className="!font-normal text-gray-600"
                      >
                        {created_at}
                      </Typography>
                    </td>
                    <td className="flex items-center justify-end text-right p-4 border-b border-gray-300 gap-2">
                      <Tooltip content="Editar usuário">
                        <IconButton variant="text">
                          <PencilIcon className="w-4 h-4 text-gray-400" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip content="Deletar usuário">
                        <IconButton variant="text">
                          <TrashIcon className="w-4 h-4 text-gray-400" />
                        </IconButton>
                      </Tooltip>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex justify-between items-center">
          <Typography variant="h6" color="blue-gray">
            Página 2 <span className="font-normal text-BLACK">of 10</span>
          </Typography>
          <div className="flex gap-4">
            <Button variant="text" className="flex items-center gap-1">
              <ChevronLeftIcon strokeWidth={3} className="h-3 w-3" />
              Anterior
            </Button>
            <Button variant="text" className="flex items-center gap-1">
              Próximo
              <ChevronRightIcon strokeWidth={3} className="h-3 w-3" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};