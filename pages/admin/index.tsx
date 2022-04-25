import moment from "moment";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { FiEdit, FiTrash } from "react-icons/fi";
import LayoutAdmin from "../../components/LayoutAdmin";
import { PostType } from "../../components/Posts";
import Table, { TableColumnType } from "../../components/Table";
import { WithProps } from "../../interfaces/index.types";
import { DEFAULT_DATE_FORMAT } from "../../utils/constants";
import ApiCaller from "../../utils/services/ApiCaller";
import endpoints from "../../utils/services/endpoints";

const AdminPage: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  const router = useRouter();

  const resfreshPage = () => {
    router.replace(router.asPath);
  };

  const handleDeletePost = async (id: string) => {
    if (confirm("Do you want to delete this post!!!")) {
      const response = await ApiCaller<{ message: string }>({
        method: "delete",
        url: "/api/posts",
        params: { id },
      });

      if (response.status) {
        resfreshPage();
        alert(response.data?.message);
      } else {
        alert(response.data?.message);
      }
    }
  };

  const PostColumn: TableColumnType<PostType>[] = [
    {
      key: "order",
      name: "order",
      title: "STT",
      width: "10%",
    },
    {
      key: "title",
      name: "title",
      title: "Title",
      width: "45%",
    },
    {
      key: "createdDate",
      name: "createdDate",
      title: "Created Date",
      width: "25%",
      render: (label: string) => moment(label).format(DEFAULT_DATE_FORMAT),
    },
    {
      key: "action",
      name: "action",
      title: "",
      width: "25%",
      render: (_label, item) => (
        <div>
          <Link href={`/admin/posts/${item?._id}/edit`} passHref>
            <button className="btn-primary mr-3">
              <FiEdit />
            </button>
          </Link>
          <button
            className="btn-danger"
            onClick={() => handleDeletePost(item._id)}
          >
            <FiTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <LayoutAdmin title="Admin Dashboard">
      <div className="page-container">
        <div className="min-h-screen">
          <Link href="/admin/posts/create" passHref>
            <button className="btn-primary mt-4 mb-6">Add +</button>
          </Link>
          <Table
            dataSource={posts.map((item, index) => ({
              key: item._id,
              order: index + 1,
              ...item,
            }))}
            column={PostColumn}
          />
        </div>
      </div>
    </LayoutAdmin>
  );
};

export async function getServerSideProps(): Promise<
  WithProps<{ posts: PostType[] }>
> {
  const response = await ApiCaller<PostType[]>({
    method: "get",
    url: endpoints.POSTS,
  });
  if (response.status) {
    return { props: { posts: response.data || [] } };
  }

  return { props: { posts: [] } };
}

export default AdminPage;
