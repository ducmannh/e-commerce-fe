import Text from "./Text";
import Icon from "./icons/Icon";
import Logo from "./icons/Logo";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="p-[22px] flex items-center justify-between rounded-[26px] my-[18px] mx-[50px] bg-[#f5f5f5] backdrop-blur-[10px]">
      <Link to={"/"}>
        <Logo />
      </Link>
      <div className="flex items-center space-x-[38px]">
        <Link to={"/shop"}>
          <Text variant="caption-one">Shop</Text>
        </Link>
        <Link to={"/cart"}>
          <Text variant="caption-one">About</Text>
        </Link>
        <Link to={"/cart"}>
          <Icon name="cart-icon" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
