import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import useUser from "../libs/useUser";
import { User } from "../pages/api/user";
import ApiCaller from "../utils/services/ApiCaller";
import Loader from "./Loader";

const LayoutAdmin = ({
  title = "",
  desc = "",
  children,
}: PropsWithChildren<{ title?: string; desc?: string }>) => {
  const { user, mutateUser } = useUser({ redirectTo: "/admin/login" });

  const handleLogout = async () => {
    const response = await ApiCaller({ method: "post", url: "/api/logout" });

    if (response.status) {
      mutateUser(response.data as User);
    }
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-800 text-white">
        {user?.isLoggedIn && user.login ? (
          <div>
            <header className="border-b border-gray-500">
              <div className="page-container flex">
                <Link href="/admin" passHref>
                  <h1 className="text-3xl font-semibold py-5">
                    Welcome to Admin site 🚀
                  </h1>
                </Link>
                <button
                  className="ml-auto hover:text-primary-500"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </header>
            <main>{children}</main>
          </div>
        ) : (
          <Loader className="min-h-screen" />
        )}
      </div>
    </div>
  );
};

export default LayoutAdmin;
