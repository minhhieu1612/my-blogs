import moment from "moment";
import { NextPage } from "next";
import Layout from "../../components/Layout";
import { PostType } from "../../components/Posts";
import TiptapEditor from "../../components/TiptapEditor";
import { WithParams, WithProps } from "../../interfaces/index.types";
import formatDate from "../../utils/built-ins/formatDate";
import ApiCaller from "../../utils/services/ApiCaller";
import endpoints from "../../utils/services/endpoints";

const PostDetailPage: NextPage<{ post: PostType }> = ({ post }) => {
  return (
    <Layout>
      <div className="page-container pt-8 pb-16">
        <h3 className="text-3xl font-bold pb-2">{post.title}</h3>
        <div className="text-gray-400">
          {formatDate(post.createdDate)} (updated{" "}
          {moment(post.updatedDate).fromNow()})
        </div>
        <TiptapEditor content={post.description} />
      </div>
    </Layout>
  );
};

export async function getStaticPaths(): Promise<{
  paths: WithParams<{ id: string }>[];
  fallback: boolean | string;
}> {
  const response = await ApiCaller<PostType[]>({
    method: "get",
    url: endpoints.POSTS,
  });

  if (response.status) {
    return {
      paths: response.data?.length
        ? response.data.map(({ _id }) => ({
            params: { id: _id },
          }))
        : [],
      fallback: false,
    };
  }

  return {
    paths: [],
    fallback: false,
  };
}

export async function getStaticProps({
  params: { id },
}: WithParams<{ id: string }>): Promise<WithProps<{ post: PostType | null }>> {
  const response = await ApiCaller({
    method: "get",
    url: endpoints.POSTS,
    params: { id },
  });

  if (response.status) {
    return { props: { post: response.data as PostType } };
  }

  return { props: { post: null } };
}

export default PostDetailPage;
