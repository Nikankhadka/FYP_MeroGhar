export interface LSR1 {
  success: boolean;
  accessToken: string;
  refreshToken: string;
  user: { userId: string; is_Admin: boolean,img:string };
}

export interface googleProfile {
  userName: string;
  email: string;
  profile_Img: string;
}

export interface refreshTService {
  success: boolean;
  message: string;
  tokens: { newaccessToken: string; newrefreshToken: string };
  user: { userId: string; is_Admin: boolean,img:string};
}
