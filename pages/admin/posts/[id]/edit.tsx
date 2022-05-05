import moment from "moment";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import LayoutAdmin from "../../../../components/LayoutAdmin";
import Loader from "../../../../components/Loader";
import { PostType } from "../../../../components/Posts";
import TiptapEditor from "../../../../components/TiptapEditor";
import {
  OrNull,
  WithParams,
  WithProps,
} from "../../../../interfaces/index.types";
import formatDate from "../../../../utils/built-ins/formatDate";
import ApiCaller from "../../../../utils/services/ApiCaller";
import endpoints from "../../../../utils/services/endpoints";

const AdminPostEditDetail: NextPage<{ post: PostType }> = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const titleRef = useRef<OrNull<HTMLHeadingElement>>(null);
  const [isEditing, setEditing] = useState(false);
  const [htmlDescription, setHTMLDescription] = useState(post.description);

  const handleReset = () => {
    if (titleRef.current && titleRef.current.textContent) {
      titleRef.current.textContent = post.title;
    }
  };

  const router = useRouter();

  const resfreshPage = () => {
    router.replace(router.asPath);
  };

  const handleSubmit = async () => {
    setLoading(true);
    const response = await ApiCaller<{ message: string }>({
      method: "put",
      url: "/api/posts",
      data: {
        title: titleRef.current?.innerHTML,
        description: htmlDescription,
      },
      params: {
        id: post._id,
      },
    });

    setLoading(false);

    if (!response.status) {
      alert(response.data?.message);
    } else {
      alert(response.data?.message);
      resfreshPage();
      setEditing(false);
    }
  };

  return (
    <LayoutAdmin>
      <div className="pt-8 pb-16 page-container">
        {!isEditing ? (
          <button
            className="flex mb-3 btn-primary"
            onClick={() => setEditing(true)}
          >
            Edit <FiEdit className="mt-1 ml-2" />
          </button>
        ) : (
          <div className="flex mb-3">
            <button className="mr-3 btn-info" onClick={handleSubmit}>
              Submit
            </button>
            <button
              className="btn-danger"
              onClick={() => {
                handleReset();
                setEditing(false);
              }}
            >
              Cancel
            </button>
          </div>
        )}
        <div className="relative">
          {loading ? (
            <Loader className="w-full min-h-screen" />
          ) : (
            <>
              <h2
                id="postTitle"
                ref={(ref) => (titleRef.current = ref)}
                className="pb-2 text-3xl font-bold"
                contentEditable={isEditing}
              >
                {post.title}
              </h2>
              <div className="text-sm text-gray-400">
                {formatDate(post.createdDate)} (updated{" "}
                {moment(post.updatedDate).fromNow()})
              </div>
              <TiptapEditor
                className="prose-invert"
                content={post.description}
                hasMenu={isEditing}
                editable={isEditing}
                autofocus={isEditing}
                getHTMLContent={(data) => setHTMLDescription(data as string)}
              />
            </>
          )}
        </div>
      </div>
    </LayoutAdmin>
  );
};

//export async function getStaticPaths(): Promise<{
//paths: WithParams<{ id: string }>[];
//fallback: boolean | string;
//}> {
//const response = await ApiCaller<PostType[]>({
//method: "get",
//url: endpoints.POSTS,
//});

//if (response.status) {
//return {
//paths: response.data?.length
//? response.data.map(({ _id }) => ({
//params: { id: _id },
//}))
//: [],
//fallback: false,
//};
//}

//return {
//paths: [],
//fallback: false,
//};
//}

export async function getServerSideProps({
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

export default AdminPostEditDetail;
