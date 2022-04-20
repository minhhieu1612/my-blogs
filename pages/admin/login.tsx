import { NextPage } from "next";
import { FormEvent, useState } from "react";
// import dynamic from "next/dynamic";
import EditorBlock from "../../components/EditorBlock";
import useUser from "../../libs/useUser";
import ApiCaller from "../../utils/services/ApiCaller";
import { User } from "../api/user";
// const EditorBlock = dynamic(() => import("../../components/EditorBlock"), {
//   ssr: false,
// });

const LoginPage: NextPage = () => {
  const [message, setMessage] = useState("");
  const { mutateUser } = useUser({
    redirectTo: "/admin",
    redirectIfFound: true,
  });

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    let data: { [key: string]: any } = {};

    for (var [key, value] of formData.entries()) {
      data[key] = value;
    }

    const response = await ApiCaller({
      method: "post",
      url: "/api/login",
      data,
    });

    if (response.status) {
      mutateUser(response?.data as User);
    } else {
      setMessage(response.message || "");
    }
  };

  return (
    <div className="bg-gray-800 text-gray-200 min-h-screen flex">
      <div className="w-80 mx-auto text-center my-auto">
        <h1 className="text-4xl font-semibold pb-5">Login</h1>
        <form id="loginForm" action="" onSubmit={handleLogin}>
          <input
            type="text"
            name="username"
            placeholder="User Name"
            className="w-full px-4 py-2 bg-gray-900 focus:outline-none mb-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full px-4 py-2 bg-gray-900 focus:outline-none mb-4"
            required
          />
          {message.length ? (
            <p className="-mt-3 text-left mb-3 text-red-400 text-sm">
              {message}
            </p>
          ) : (
            ""
          )}
          <input
            type="submit"
            className="w-full px-4 py-2 bg-gray-900 focus:outline-none cursor-pointer"
          />
        </form>
      </div>
      <hr />
    </div>
  );
};

export default LoginPage;
