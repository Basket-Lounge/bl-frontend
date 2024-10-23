
const redirectURLEncoded = encodeURIComponent(process.env.NEXT_PUBLIC_GOOGLE_LOGIN_REDIRECT_URL as string);
export const GOOGLE_LOGIN_URL = `https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=${redirectURLEncoded}&prompt=consent&response_type=code&client_id=612897772106-bhc82eb8f6a61hsf4v1j2v6cghagg1pb.apps.googleusercontent.com&scope=openid%20email%20profile&access_type=offline`;