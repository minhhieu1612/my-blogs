import type { NextPage } from "next";
import Layout from "../components/Layout";
import Posts, { PostType } from "../components/Posts";
import { WithProps } from "../interfaces/index.types";
import ApiCaller from "../utils/services/ApiCaller";
import endpoints from "../utils/services/endpoints";

const Home: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  return (
    <Layout title="This is Calvin's blog">
      <div className="page-container py-5">
        <div className="introduce-section pb-5">
          <h2 className="text-3xl font-bold">About Me</h2>
          <p>I am developer with a lot of special idea.</p>
        </div>
        <div className="posts">
          <h2 className="text-3xl font-bold mb-2">Posts</h2>
          <Posts posts={posts} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticProps(): Promise<
  WithProps<{ posts: PostType[] }>
> {
  const response = await ApiCaller({
    method: "get",
    url: endpoints.POSTS,
  });

  if (response.status) {
    return { props: { posts: response.data as any } };
  }

  return { props: { posts: [] } };
}

export default Home;
