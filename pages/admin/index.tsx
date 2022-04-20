import { NextPage } from "next";
import Image from "next/image";
// import dynamic from "next/dynamic";
import EditorBlock from "../../components/EditorBlock";
import { PostType } from "../../components/Posts";
import Table, { TableColumnType } from "../../components/Table";
import { WithProps } from "../../interfaces/index.types";
// const EditorBlock = dynamic(() => import("../../components/EditorBlock"), {
//   ssr: false,
// });

import useUser from "../../libs/useUser";
import ApiCaller from "../../utils/services/ApiCaller";
import endpoints from "../../utils/services/endpoints";
import { User } from "../api/user";

const AdminPage: NextPage<{ posts: PostType[] }> = ({ posts }) => {
  const { user, mutateUser } = useUser({ redirectTo: "/admin/login" });

  const handleLogout = async () => {
    const response = await ApiCaller({ method: "post", url: "/api/logout" });

    if (response.status) {
      mutateUser(response.data as User);
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
      width: "25%",
    },
    {
      key: "description",
      name: "description",
      title: "Description",
      width: "55%",
      render: (label) => <div className="limit-3-lines">{label}</div>,
    },
    {
      key: "action",
      name: "action",
      title: "",
      width: "10%",
      render: (_label, item) => (
        <div className="">
          <button className="btn-primary">edit: {item?.title}</button>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-gray-800 text-white">
      {user?.isLoggedIn && user.login ? (
        <div>
          <header className="border-b border-gray-500">
            <div className="page-container flex">
              <h1 className="text-3xl font-semibold py-5">
                Welcome to Admin site 🚀
              </h1>
              <button
                className="ml-auto hover:text-primary-500"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          </header>
          <div className="page-container">
            <div className="min-h-screen">
              <button className="btn-primary mt-4 mb-6">Add +</button>
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
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center">
          <Image
            src="/images/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
            width={100}
            height={100}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export async function getStaticProps(): Promise<
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
