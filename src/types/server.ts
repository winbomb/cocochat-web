// call `organization` in backend
import { PriceType } from "./common";
import { User } from "./user";

export interface Server extends SystemCommon {
  name: string;
  description: string;
}
export type ChatLayout = "SelfRight" | "Left";
export type MessageExpireMode = "Off" | "Day1" | "Day7" | "Day30" | "Day90" | "Day180";
export interface SystemCommon {
  show_user_online_status?: boolean;
  webclient_auto_update?: boolean;
  contact_verification_enable?: boolean;
  chat_layout_mode?: ChatLayout;
  max_file_expiry_mode?: MessageExpireMode;
  only_admin_can_create_group: boolean;
  who_can_invite_users: boolean;
  ext_setting: null | string;
  msg_smtp_notify_enable: boolean;
  msg_smtp_notify_delay_seconds: number;
}
export type WhoCanSignUp = "EveryOne" | "InvitationOnly";
export interface LoginConfig {
  who_can_sign_up: WhoCanSignUp;
  password: boolean;
  magic_link: boolean;
  guest: boolean;
  third_party: boolean;
  passkey?: boolean;
}
export interface LicenseResponse {
  domains: string[];
  created_at: string;
  expired_at: string;
  sign: boolean;
  base58: string;
  user_limit: number;
}
export interface LicenseMetadata {
  expire: string;
  user_limit: number;
  domain: string | string[];
}
export interface RenewLicense {
  type: PriceType;
  priceId: string;
  metadata: LicenseMetadata;
  cancel_url: string;
  success_url: string;
}
export interface RenewLicenseResponse {
  session_url: string;
}
export interface CreateAdminDTO extends Pick<User, "email" | "name" | "gender"> {
  password: string;
}
