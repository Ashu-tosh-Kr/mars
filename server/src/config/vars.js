import { config } from "dotenv";
config();

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  /**
   * Port the app should run on
   */
  port: parseInt(process.env.PORT) || 5050,

  /**
   * Base urls
   */
  baseUrl: process.env.APP_BASE_URL,
  clientUrl: process.env.CLIENT_URL,

  /**
   * Database the app should connect to
   */
  databaseURL: process.env.MONGODB_URI,

  /**
   * The secret sauce to validate JWT
   */
  accessToken: process.env.ACCESS_TOKEN_SECRET,
  refreshToken: process.env.REFRESH_TOKEN_SECRET,

  /**
   * Google
   */
  googleOAuthClientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  googleOAuthClientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
  googleOAuthRefreshToken:process.env.GOOGLE_OAUTH_REFRESH_TOKEN,

  /**
   * API configs
   */
  api: {
    prefix: "/api",
  },
};
