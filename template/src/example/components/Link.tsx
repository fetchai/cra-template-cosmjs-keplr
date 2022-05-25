import {ReactNode} from "react";

export interface LinkProps {
  children: ReactNode;
  href: string;
  target?: "_self" | "_blank" | "_parent" | "_top";
}

const Link: React.FC<LinkProps> = ({children, href, target}) => (
  <a className="text-blue-500 underline"
    href={href} target={target}>
    {children}
  </a>
);
export default Link;
