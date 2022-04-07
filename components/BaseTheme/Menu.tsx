import { forwardRef, LegacyRef, PropsWithChildren } from "react";
import { BaseProps, OrNull } from "./index.type";

export const MenuItem = forwardRef(function Menu(
  { className, children, ...props }: PropsWithChildren<BaseProps>,
  ref: OrNull<LegacyRef<HTMLDivElement>>
) {
  return (
    <div
      ref={ref}
      className={`px-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

const Menu = forwardRef(function Menu(
  { className, children, ...props }: BaseProps & {children: typeof MenuItem},
  ref: OrNull<LegacyRef<HTMLDivElement>>
) {
  return (
    <div
      ref={ref}
      className={`flex flex-wrap -mx-2 ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
});

export default Menu;
