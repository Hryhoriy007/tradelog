export const dict = {
  loginTitle: "Login",
  loginSubtitle: "Sign in to TradeLog",
  email: "Email",
  password: "Password",
  signIn: "Sign in",
  loading: "Loading...",
  logout: "Logout",
  dashboard: "Dashboard",
  noAccount: "No account?",
  createAccount: "Create one",
  loginError: "Invalid credentials",
} as const;

export type DictKey = keyof typeof dict;
export const t = (key: DictKey) => dict[key];
