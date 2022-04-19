import { NextPage } from "next";
// import dynamic from "next/dynamic";
import EditorBlock from "../../components/EditorBlock";
// const EditorBlock = dynamic(() => import("../../components/EditorBlock"), {
//   ssr: false,
// });

const HiddenPage: NextPage = () => {
  return (
    <div className="bg-gray-100">
      <div className="page-container">
        <h1 className="text-3xl font-semibold py-5">
          Welcome to Admin site 🚀
        </h1>
        <hr />
        {/* <EditorBlock /> */}
      </div>
    </div>
  );
};

export default HiddenPage;
