import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useState } from "react";

type Country = {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  format: string;
  maxLength: number; // Adicionando a propriedade maxLength para cada país
};

const countries: Country[] = [
  {
    name: "United States",
    code: "US",
    dialCode: "+1",
    flag: "https://flagcdn.com/us.svg",
    format: "(XXX) XXX-XXXX",
    maxLength: 10, // Definindo o tamanho máximo do número para os Estados Unidos
  },
  {
    name: "Canada",
    code: "CA",
    dialCode: "+1",
    flag: "https://flagcdn.com/ca.svg",
    format: "(XXX) XXX-XXXX",
    maxLength: 10, // Definindo o tamanho máximo do número para o Canadá
  },
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: "https://flagcdn.com/br.svg",
    format: "(XX) XXXXX-XXXX",
    maxLength: 11, // Definindo o tamanho máximo do número para o Brasil
  },
];

export function InputWithDropdown() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(countries[0]);
  const [_, setPhoneNumber] = useState<string>("");
  const [formattedPhoneNumber, setFormattedPhoneNumber] = useState<string>("");

  const handlePhoneNumberChangeInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const rawNumber = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos
    console.log(rawNumber);
    setPhoneNumber(rawNumber); // Armazena o número sem formatação no estado
    formatAndSetPhoneNumber(rawNumber, selectedCountry.format); // Formata e exibe o número formatado
  };

  const formatAndSetPhoneNumber = (rawNumber: string, _: string) => {
    // Lógica de formatação do número
    // Aqui você pode implementar a lógica de formatação do número de acordo com o formato específico do país
    setFormattedPhoneNumber(rawNumber); // Por enquanto, apenas definindo o número formatado como o número sem formatação
  };

  const handleSelectedCountry = (country: Country) => {
    setPhoneNumber(""); // Limpa o número ao mudar de país
    setSelectedCountry(country);
    formatAndSetPhoneNumber("", country.format); // Formata o número vazio para exibir o formato correto do país selecionado
  };

  return (
    <div className="relative flex w-full ">
      <Menu placement="bottom-start">
        <MenuHandler>
          <Button
            ripple={false}
            variant="text"
            color="blue-gray"
            className="flex items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3 h-10"
          >
            <img
              src={selectedCountry.flag}
              alt={selectedCountry.name}
              className="h-4 w-4 rounded-full object-cover"
            />
            {selectedCountry.dialCode}
          </Button>
        </MenuHandler>
        <MenuList className="max-h-[20rem] max-w-[18rem] ">
          {countries.map((country) => (
            <MenuItem
              key={country.code}
              className="flex items-center gap-2"
              onClick={() => handleSelectedCountry(country)}
            >
              <img
                src={country.flag}
                alt={country.name}
                className="h-5 w-5 rounded-full object-cover"
              />
              {country.name} <span className="ml-auto">{country.dialCode}</span>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
      <Input
        type="tel"
        placeholder="Insira seu número"
        value={formattedPhoneNumber} // Exibe o número sem formatação
        onChange={handlePhoneNumberChangeInput}
        className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900 h-10"
        labelProps={{
          className: "before:content-none after:content-none",
        }}
        containerProps={{
          className: "min-w-0",
        }}
        maxLength={selectedCountry.maxLength} // Definindo o tamanho máximo do número com base no país selecionado
      />
    </div>
  );
}
