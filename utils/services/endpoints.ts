export const BASE_URL = `${process.env.HOST}:${process.env.PORT}/api`;

const endpoints = {
  POSTS: `${BASE_URL}/posts`,
  USER: `${BASE_URL}/user`
}

export default endpoints;