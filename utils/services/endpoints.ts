export const BASE_URL = `${process.env.NEXT_PUBLIC_VERCEL_URL}/api`;

const endpoints = {
  POSTS: `${BASE_URL}/posts`,
  USER: `${BASE_URL}/user`
}

export default endpoints;