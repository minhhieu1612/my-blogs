import dynamic from "next/dynamic";

const dynamicClientImport = (importPath = "") =>
  dynamic(() => import(importPath), { ssr: false });

export default dynamicClientImport;
