export type CountryType = {
  name: string;
  code: string;
  dialCode: string;
  flag: string;
  format: string;
  maxLength: number; // Adicionando a propriedade maxLength para cada país
};

export const countries: CountryType[] = [
  {
    name: "Brazil",
    code: "BR",
    dialCode: "+55",
    flag: "https://flagcdn.com/br.svg",
    format: "(XX) XXXXX-XXXX",
    maxLength: 11, // Definindo o tamanho máximo do número para o Brasil
  },
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
];
