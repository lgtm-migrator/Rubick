import { ENV, getEnv } from './env'

export const CCP_CONFIG = {
  ACCOUNT_SID: getEnv(ENV.CCP_ACCOUNTSID),
  ACCOUNT_TOKEN: getEnv(ENV.CCP_ACCOUNTTOKEN),
  APP_ID: getEnv(ENV.CCP_APPID),
  TEMPLATE_ID: getEnv(ENV.CCP_TEMPLATEID),
  SERVER_IP: getEnv(ENV.CCP_SERVERIP),
  SERVER_PORT: getEnv(ENV.CCP_SERVERPORT),
  SOFT_VERSION: getEnv(ENV.CCP_SOFTVERSION),
}
