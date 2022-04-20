import dynamic from "next/dynamic";
import Head from "next/head";
import React, { PropsWithChildren } from "react";
import Footer from "./Footer";
// import Header from "./Header";
const Header = dynamic(() => import("./Header"), {ssr: false});

const Layout = ({
  title = '',
  desc = '',
  children,
}: PropsWithChildren<{ title?: string; desc?: string }>) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content={desc} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
