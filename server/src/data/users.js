import bcrypt from "bcryptjs";
const users = [
  {
    avatar: "https://ui-avatars.com/api/?name=ceo",
    username: "CEO",
    email: "ceo@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: 4,
    phone: "7686456789",
    active: true,
  },
  {
    avatar: "https://ui-avatars.com/api/?name=admin",
    username: "Admin",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: 3,
    phone: "7686456780",
    active: true,
  },
  {
    avatar: "https://ui-avatars.com/api/?name=superviser",
    username: "Superviser",
    email: "sv@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: 2,
    phone: "7686656789",
    active: true,
  },
  {
    avatar: "https://ui-avatars.com/api/?name=assistant",
    username: "Assistant",
    email: "assistant@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: 1,
    phone: "7666456789",
    active: true,
  },
  {
    avatar: "https://ui-avatars.com/api/?name=talent",
    username: "Talent",
    email: "talent@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    role: 0,
    phone: "7686450789",
    active: true,
  },
];
export default users;
