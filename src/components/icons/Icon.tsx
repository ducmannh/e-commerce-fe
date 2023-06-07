import ArrowDownIcon from "./ArrowDownIcon";
import ArrowSmallRightIcon from "./ArrowSmallRightIcon";
import CartIcon from "./CartIcon";
import ExclamationTriangleIcon from "./ExclamationTriangleIcon";
import Logo from "./Logo";
import MinusIcon from "./MinusIcon";
import PlusIcon from "./PlusIcon";
import TrashIcon from "./TrashIcon";
import XMarkIcon from "./XMarkIcon";

type IconName =
  | "arrow-down-icon"
  | "arrow-small-right"
  | "minus-icon"
  | "plus-icon"
  | "cart-icon"
  | "trash-icon"
  | "x-mark-icon"
  | "exclamation-triangle-icon"
  | "logo";

type IconType = {
  [K in IconName]: JSX.Element;
};

type IconProps = {
  name: keyof typeof Icons;
};

const Icons: IconType = {
  "arrow-down-icon": <ArrowDownIcon />,
  "arrow-small-right": <ArrowSmallRightIcon />,
  "cart-icon": <CartIcon />,
  "exclamation-triangle-icon": <ExclamationTriangleIcon />,
  "minus-icon": <MinusIcon />,
  "plus-icon": <PlusIcon />,
  "trash-icon": <TrashIcon />,
  "x-mark-icon": <XMarkIcon />,
  logo: <Logo />,
};

const Icon = ({ name }: IconProps) => {
  return Icons[name];
};

export default Icon;
