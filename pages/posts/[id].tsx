import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { PostType } from "../../components/Posts";
import { WithParams, WithProps } from "../../interfaces/index.types";
import ApiCaller from "../../utils/services/ApiCaller";

const PostDetailPage = ({ id }: { id: string }) => {
  const router = useRouter();
  console.log('====================================');
  console.log('query: ', router.query);
  console.log('====================================');
  return (
    <Layout>
      <div className="page-container">
        <h3 className="text-2xl">this is page for post number: {id}</h3>
      </div>
    </Layout>
  );
};

export async function getStaticPaths(): Promise<{
  paths: WithParams<{ id: string }>[];
  fallback: boolean;
}> {
  const response = await ApiCaller<{ status: boolean; data: PostType[] }>({
    method: "get",
    url: "http://localhost:3000/data/posts.json",
  });

  if (response.status) {
    return {
      paths: response.data?.data?.length
        ? response.data.data.map(({ id }) => ({
            params: { id },
          }))
        : [],
      fallback: false,
    };
  }

  return {
    paths: [],
    fallback: true,
  };
}

export async function getStaticProps({
  params: { id },
}: WithParams<{ id: string }>): Promise<WithProps<{id: string}>> {
  return { props: { id } };
}

export default PostDetailPage;
