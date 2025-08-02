import { HomeWifiAngleLinear } from "../../icons/Home";
import { CardOutline } from "../../icons/Tariffs";
import { Referrals } from "../../icons/Referrals";
import { Profile } from "../../icons/Profile";

type NavbarItem = {
  labelKey: string;
  href: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

export const navbarItems: NavbarItem[] = [
  {
    labelKey: "main",
    href: "/",
    Icon: HomeWifiAngleLinear,
  },
  {
    labelKey: "tariffs",
    href: "/tariffs",
    Icon: CardOutline,
  },
  {
    labelKey: "referrals",
    href: "/referrals",
    Icon: Referrals,
  },
  {
    labelKey: "profile",
    href: "/profile",
    Icon: Profile,
  },
];
