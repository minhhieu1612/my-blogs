import type { NextPage } from "next";
import Layout from "../components/Layout";
import Posts from "../components/Posts";

const Home: NextPage = () => {
  return (
    <Layout title="This is Calvin's blog">
      <div className="dark:bg-black dark:text-white py-5">
        <div className="page-container">
          <div className="introduce-section pb-5">
            <h2 className="text-3xl font-bold">About Me</h2>
            <p>I am developer with a lot of special idea.</p>
          </div>

          <div className="posts">
            <h2 className="text-3xl font-bold mb-2">Posts</h2>
            <Posts
              posts={[
                {
                  id: "adf",
                  title: "post title 1",
                  description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Error, velit quam eveniet dolores facere voluptates consequatur. 
                    Quidem labore molestiae dolorem.`,
                  createdDate: new Date(),
                },
                {
                  id: "adf",
                  title: "post title 2",
                  description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
                    Error, velit quam eveniet dolores facere voluptates consequatur. 
                    Quidem labore molestiae dolorem.`,
                  createdDate: new Date(),
                },
              ]}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
