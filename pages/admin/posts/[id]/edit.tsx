import moment from "moment";
import { NextPage } from "next";
import { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import LayoutAdmin from "../../../../components/LayoutAdmin";
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
  const titleRef = useRef<OrNull<HTMLHeadingElement>>(null);
  const [isEditing, setEditing] = useState(false);
  const [htmlDescription, setHTMLDescription] = useState(post.description);

  const handleReset = () => {
    if (titleRef.current && titleRef.current.textContent) {
      titleRef.current.textContent = post.title;
    }
  };

  const handleSubmit = async () => {
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

    if (!response.status) {
      alert(response.data?.message);
      setHTMLDescription(post.description);
    } else {
      alert(response.data?.message);
      setEditing(false);
    }
  };

  return (
    <LayoutAdmin>
      <div className="page-container pt-8 pb-16">
        {!isEditing ? (
          <button
            className="btn-primary flex mb-3"
            onClick={() => setEditing(true)}
          >
            Edit <FiEdit className="ml-2 mt-1" />
          </button>
        ) : (
          <div className="flex mb-3">
            <button className="btn-info mr-3" onClick={handleSubmit}>
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
        <h2
          id="postTitle"
          ref={(ref) => (titleRef.current = ref)}
          className="text-3xl font-bold pb-2"
          contentEditable={isEditing}
        >
          {post.title}
        </h2>
        <div className="text-gray-400 text-sm">
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
      </div>
    </LayoutAdmin>
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

export default AdminPostEditDetail;
