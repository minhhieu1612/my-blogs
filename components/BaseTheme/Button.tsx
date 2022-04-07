import { forwardRef, LegacyRef, PropsWithChildren } from "react";
import { BaseProps, OrNull } from "./index.type";

const Button = forwardRef(function Button(
  {
    className,
    children,
    ...props
  }: PropsWithChildren<BaseProps>,
  ref: OrNull<LegacyRef<HTMLButtonElement>>
) {

  return (
    <button
      ref={ref}
      className={`py-2 px-4 cursor-pointer border border-black ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
});

export default Button;
