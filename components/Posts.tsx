import Link from "next/link";

export type PostType = {
  id: string;
  title: string;
  description: string;
  createdDate: Date;
};

const Posts = ({ posts }: { posts: PostType[] }) => {
  return (
    <ul className="posts">
      {posts.map(({ id, title, description }) => (
        <li
          className="post-item border rounded-lg border-gray-200 dark:border-gray-700 mb-5"
          key={id}
        >
          <Link href={`/posts/${id}`} passHref>
            <div className="block p-5 cursor-pointer hover:text-primary-700 hover:dark:text-primary-400">
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
