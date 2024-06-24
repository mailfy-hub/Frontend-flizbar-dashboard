export const generateUniqueUsername = (name: string, surname: string) => {
  const cleanName = name.trim().toLowerCase();
  const cleanSurname = surname.trim().toLowerCase();

  const timestamp = Date.now();

  const username = `${cleanName}.${cleanSurname}.${timestamp}`;

  return username;
};
