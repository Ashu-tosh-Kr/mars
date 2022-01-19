export const companies = [
  {
    name: 'MHK',
    postCode: '4123456',
    officeAddress: '東京都 千代田区',
    note: 'タトゥーは隠すこと',
  },
  {
    name: '西海テレビ',
    postCode: '4833410',
    officeAddress: '愛知県名古屋市中区栄123',
    note: '原則として青木さんが担当',
  },
  {
    name: '大京テレビ',
    postCode: '4119320',
    officeAddress: '大阪市堺市999',
    note: '必ず社長に相談してから受注すること',
  },
];

export const clients = [
  {
    name: '古立善之',
    title: 'ディレクター',
    clientTeam: '映像企画部',
    email: 'tat@example.com',
    phone: '09073829981',
    note: '交通費は出ない, 請求書は月末に送ること',
  },
  { name: '土屋敏男', title: 'ディレクター', clientTeam: '映像企画部', email: 'tat@example.com', phone: ' 09073829981', note: '優しい人です' },
  { name: '友寄隆英', title: '部長', clientTeam: 'スポーツ映像部', email: 'tomo@example.com', phone: ' 09073829981', note: '' },
  { name: '加地倫三', title: 'ADD', clientTeam: '映像企画部', email: 'kaji@example.com', phone: ' 09073829981', note: '金曜は連絡が取れない' },
  { name: '舟橋政宏', title: '企画室長', clientTeam: '企画室', email: 'funahashi@example.com', phone: ' 09073829981', note: '厳しいので失礼のないように' },
];

// don't export ↓
const ROLES = { TALENT: 0, ASSISTANT: 1, SV: 2, CEO: 3, ADMIN: 4 };

// ↑ avoid magic numbers in ↓ roles property

// don't export ↓ - it'll be mapped to create "final" obj
const usersBeforeMap = [
  {
    employeeId: '011',
    username: 'ueda',
    role: ROLES.ADMIN,
    phone: '05299384716',
  },
  {
    employeeId: '001',
    username: 'CEO',
    role: ROLES.CEO,
    phone: '09088374618',
  },
  {
    employeeId: '029',
    username: 'isobata',
    role: ROLES.SV,
    phone: '05299384716',
  },
  {
    employeeId: '041',
    username: 'tanaka',
    role: ROLES.ASSISTANT,
    phone: '07099364777',
  },
  {
    employeeId: '058',
    username: 'yoshida',
    role: ROLES.ASSISTANT,
    phone: '05287992810',
  },
  {
    employeeId: '002',
    username: 'takeshi',
    role: ROLES.TALENT,
    phone: '07011887369',
  },
  {
    employeeId: '051',
    username: 'yamamoto',
    role: ROLES.TALENT,
    phone: '07074329301',
  },
];

// don't export ↓
const EMAIL_DOMAIN = '@example.com';
const INIT_PASSWORD = '123456';
const AVATAR_API = 'https://ui-avatars.com/api/?name=';

// ↑ are consts to be used for ↓

export const users = usersBefore.map((e) => ({ ...e, email: e.username + EMAIL_DOMAIN, password: bcrypt.hashSync(INIT_PASSWORD, 10), avatar: AVATAR_API + e.username, active: true }));
