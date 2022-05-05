import Link from "next/link";
import moment from "moment";
import TiptapEditor from "./TiptapEditor";

export type PostType = {
  _id: string;
  title: string;
  description: string;
  createdDate: string;
  updatedDate: string;
};

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <ul className="posts">
      {posts.map(({ _id, title, description, updatedDate }) => (
        <li
          className="post-item border rounded-lg border-gray-200 hover:border-gray-400 dark:border-gray-700 mb-5 hover:dark:border-gray-500"
          key={_id}
        >
          <Link href={`/posts/${_id}`} passHref>
            <div className="block p-5 cursor-pointer">
              <h3 className="post-title text-2xl mb-3 font-bold">{title}</h3>
              <div className="text-gray-400 text-xs -mt-2">
                updated {moment(updatedDate).fromNow()}
              </div>
              <TiptapEditor content={description} shorterContent={true} />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
