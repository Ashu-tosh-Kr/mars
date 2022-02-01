import bcrypt from "bcryptjs";

// don't export ↓
const ROLES = { TALENT: 0, ASSISTANT: 1, SV: 2, CEO: 3, ADMIN: 4 };

// ↑ avoid magic numbers in ↓ roles property

// don't export ↓ - it'll be mapped to create "final" obj
const usersBeforeMap = [
  {
    employeeId: "011",
    username: "ueda",
    role: ROLES.ADMIN,
    phone: "05299384716",
  },
  {
    employeeId: "001",
    username: "CEO",
    role: ROLES.CEO,
    phone: "09088374618",
  },
  {
    employeeId: "029",
    username: "isobata",
    role: ROLES.SV,
    phone: "05299384716",
  },
  {
    employeeId: "041",
    username: "tanaka",
    role: ROLES.ASSISTANT,
    phone: "07099364777",
  },
  {
    employeeId: "058",
    username: "yoshida",
    role: ROLES.ASSISTANT,
    phone: "05287992810",
  },
  {
    employeeId: "002",
    username: "takeshi",
    role: ROLES.TALENT,
    phone: "07011887369",
  },
  {
    employeeId: "051",
    username: "yamamoto",
    role: ROLES.TALENT,
    phone: "07074329301",
  },
];

// don't export ↓
const EMAIL_DOMAIN = "@example.com";
const INIT_PASSWORD = "123456";
const AVATAR_API = "https://ui-avatars.com/api/?name=";

// ↑ are consts to be used for ↓

const users = usersBeforeMap.map((e) => ({
  ...e,
  email: e.username + EMAIL_DOMAIN,
  password: bcrypt.hashSync(INIT_PASSWORD, 10),
  avatar: AVATAR_API + e.username,
  active: true,
}));

export default users;
