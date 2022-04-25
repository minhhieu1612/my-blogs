import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import LayoutAdmin from "../../../components/LayoutAdmin";
import TiptapEditor from "../../../components/TiptapEditor";
import { OrNull } from "../../../interfaces/index.types";
import ApiCaller from "../../../utils/services/ApiCaller";

const AdminCreatePost: NextPage = () => {
  const DEFAULT_TITLE = "Type a Title here!!";
  const DEFAULT_DESCRIPTION = "<p>Type anything here....</p>"
  const titleRef = useRef<OrNull<HTMLHeadingElement>>(null);
  const [htmlDescription, setHTMLDescription] = useState(DEFAULT_DESCRIPTION);
  const Router = useRouter();

  const handleSubmit = async () => {
    const response = await ApiCaller<{ message: string }>({
      method: "post",
      url: "/api/posts",
      data: {
        title: titleRef.current?.innerHTML,
        description: htmlDescription,
      },
    });

    if (!response.status) {
      alert(response.data?.message);
      setHTMLDescription("");
    } else {
      alert(response.data?.message);
      Router.push('/admin');
    }
  };

  return (
    <LayoutAdmin>
      <div className="page-container pt-8 pb-16">
        <div className="flex mb-3">
          <button className="btn-info mr-3" onClick={handleSubmit}>
            Create
          </button>
          <Link href='/admin' passHref><button className="btn-danger">Go back</button></Link>
        </div>
        <h2
          id="postTitle"
          ref={(ref) => (titleRef.current = ref)}
          className="text-3xl font-bold pb-2"
          contentEditable={true}
          onKeyUp={(e) => console.log(e)}
          placeholder={DEFAULT_TITLE}
        >
          {DEFAULT_TITLE}
        </h2>
        <TiptapEditor
          className="prose-invert"
          content={DEFAULT_DESCRIPTION}
          hasMenu={true}
          editable={true}
          autofocus={true}
          getHTMLContent={(data) => setHTMLDescription(data as string)}
        />
      </div>
    </LayoutAdmin>
  );
};

export default AdminCreatePost;
