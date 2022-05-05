import Image from "next/image";
import { CSSProperties } from "react";

type LoaderPropsType = {
  className?: string;
  style?: CSSProperties;
};

const Loader = ({ className, style }: LoaderPropsType) => (
  <div
    className={`flex items-center justify-center ${className || ""}`}
    style={style}
  >
    <Image
      src="/images/a4f2cb80ff2ae2772e80bf30e9d78d4c.gif"
      width={100}
      height={100}
      alt=""
    />
  </div>
);

export default Loader;
