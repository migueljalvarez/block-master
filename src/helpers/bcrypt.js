import bcrypt from "bcryptjs";

const encode = (str) => {
  return bcrypt.hashSync(str, 10);
};
const decode = (str) => {
  const hash = encode(str);
  return bcrypt.compareSync(str, hash);
};

export { encode, decode };
