import {
  HomeIcon,
  ClockIcon,
  ScaleIcon,
  CreditCardIcon,
  UserGroupIcon,
  DocumentChartBarIcon,
  UsersIcon,
  BellIcon,
  ShieldExclamationIcon,
  PresentationChartLineIcon,
  EnvelopeOpenIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import Menu from "./Menu";
import pic from "./logo_white.png";
interface TabInfo {
  icons: React.ReactNode;
  name: string;
  current: string;
}

const SideBar: React.FC = () => {
  const Tabs: { upperTabs: TabInfo[] } = {
    upperTabs: [
      {
        icons: <HomeIcon />,
        name: "Dashboard",
        current: "fale",
      },
      {
        icons: <UsersIcon />,
        name: "Active Users",
        current: "fale",
      },
      {
        icons: <ScaleIcon />,
        name: "Gate Activity",
        current: "fale",
      },
      {
        icons: <CreditCardIcon />,
        name: "Events",
        current: "fale",
      },
      {
        icons: <PresentationChartLineIcon />,
        name: "News",
        current: "fale",
      },
      {
        icons: <BellIcon />,
        name: "Notifications",
        current: "fale",
      },
      {
        icons: <EnvelopeOpenIcon />,
        name: "Guest Inivitations",
        current: "fale",
      },
      {
        icons: <ShieldExclamationIcon />,
        name: "Manage Gate Access",
        current: "fale",
      },
    ],
  };

  return (
    <div className="bg-[#00629D] overflow-hidden px-3 py-10 w-full">
      <div className="flex items-center ">
        <img src={pic} alt="logo" className="w-14 h-12 mb-4 flex " />
        <p className="px-3 text-white font-bold text-2xl">Admin Panal</p>
      </div>

      <Menu Tabs={Tabs} />
    </div>
  );
};

export default SideBar;
