import Link from "next/link";

export type PostType = {
  _id: string;
  title: string;
  description: string;
  createdDate: string;
};

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <ul className="posts">
      {posts.map(({ _id, title, description }) => (
        <li
          className="post-item border rounded-lg border-gray-200 dark:border-gray-700 mb-5"
          key={_id}
        >
          <Link href={`/posts/${_id}`} passHref>
            <div className="block p-5 cursor-pointer">
              <h3 className="post-title text-2xl mb-3 font-bold">{title}</h3>
              <p className="post-description">{description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Posts;
