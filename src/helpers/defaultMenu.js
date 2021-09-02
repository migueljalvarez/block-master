import { Link } from "react-router-dom";

const DefaultMenu = ({ currentMenu, className }) => {
  return currentMenu.map((item, index) => (
    <Link className={className} key={index} to={item.path}>
      {item.label}
    </Link>
  ));
};
export { DefaultMenu };
