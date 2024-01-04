import { Tab } from "@headlessui/react";
import React from "react";

interface TabInfo {
  current: string;
  icons: React.ReactNode;
  name: string;
}

interface Tabs {
  upperTabs: TabInfo[];
}

const Menu: React.FC<{ Tabs: Tabs }> = ({ Tabs }) => {
  return (
    <div className="divide-indigo-900 grid grid-cols-1 gap-y-4 py-5">
      <div className="px-1 flex flex-col gap-y-2">
        {Tabs.upperTabs.map((tab) => (
          <button
            key={tab.name}
            className={`${
              tab.current === "true" && "bg-indigo-800 "
            } px-4 py-2 flex items-center gap-x-4 rounded-md text-white hover:bg-[#E5F2FA] }`}
          >
            <div className="w-6 h-6">{tab.icons}</div>
            <div>{tab.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
