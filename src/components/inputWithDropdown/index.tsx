import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { InputHTMLAttributes } from "react";
import { CountryType, countries } from "../../utils/number-config";


interface InputWithDropdownProps
  extends InputHTMLAttributes<HTMLInputElement> {
    selectedCountry: CountryType;
    handleChangeCountry: (selected: CountryType) => void;
  }

export function InputWithDropdown({ selectedCountry, handleChangeCountry,  ...props }: InputWithDropdownProps) {
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
              onClick={() => handleChangeCountry(country)}
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
      <input
        {...props}
        type="tel"
        placeholder="Insira seu número"
        className="rounded-l-none border-[1px] !border-blue-gray-200 h-10 w-full px-4 bg-transparent rounded-tr-md rounded-br-md"
      />
    </div>
  );
}
