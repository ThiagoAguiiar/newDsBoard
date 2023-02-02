export const randomCode = (maxLength: number): string => {
  const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJLMNOPQRSTUVWXYZ";
  let code = "";

  for (let i = 0; i < maxLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length);
    code += chars.substring(randomNumber, randomNumber + 1);
  }

  return code;
};
