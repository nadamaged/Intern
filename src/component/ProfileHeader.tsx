import React from "react";
import { PrinterIcon } from "@heroicons/react/24/outline";

const ProfileButtons = [
  {
    name: "Report",
    bg: "bg-[#00629D]",
    color: "text-white",
    hoverBg: "bg-indigo-700",
    icon: <PrinterIcon />,
  },
];

const ProfileHeader: React.FC = () => {
  return (
    <>
      <div className="flex justify-between py-8 bg-[#E5F2FA] w-100 h-100">
        <div></div>

        <div className="flex gap-x-1 items-center font-bold text-4xl">
          Active User
        </div>

        <button
          className="align-middle select-none font-sans font-bold text-center transition-all disabled:shadow-none disabled:pointer-events-none text-xs py-2 px-4 rounded-lg bg-[#0261A5] text-white shadow-md hover:shadow-lg flex items-center gap-3"
          type="button"
        >
          {ProfileButtons[0].icon}
          {ProfileButtons[0].name}
        </button>
      </div>
      <div className="h-10 bg-[#f3f4f6] pt-16"></div>
    </>
  );
};

export default ProfileHeader;
