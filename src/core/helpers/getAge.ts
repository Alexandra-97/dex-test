export const getAge = (birthday: string) => {
  const current = new Date();
  const birth = new Date(birthday);
  let age = current.getFullYear() - birth.getFullYear();
  current.getDate() < birth.getDate() && age--;
  return age;
};
