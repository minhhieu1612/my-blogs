import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import useUser from "../libs/useUser";
import { User } from "../pages/api/user";
import ApiCaller from "../utils/services/ApiCaller";

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
          <div className="min-h-screen flex items-center justify-center">
            <Image
              src="/images/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
              width={100}
              height={100}
              alt=""
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutAdmin;
