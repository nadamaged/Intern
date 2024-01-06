import React from "react";
import {
  MagnifyingGlassIcon,
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const ProfileBody: React.FC = () => {
  return (
    <div className="flex justify-between bg-white-800 py-3 pl-6">
      <div className="flex gap-x-2 items-center text-[#84878d] font-light text-5m border-b border-gray-200 drop-shadow-md w-80 h-12">
        <div className="w-6 h-6">
          <MagnifyingGlassIcon />
        </div>
        search
      </div>

      <div className="flex px-20 gap-x-4"></div>
      <div className="flex space-x-2 items-end">
        <div className="py-2">Show</div>
        <button
          className="align-middle select-none font-sans text-sm/[17px] font-bold text-center u transition-all disabled:opacity-50 disabled:shadow-none rounded-md disabled:pointer-events-none py-2 px-3 border border-gray-500 text-gray-700 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] flex items-center gap-1"
          type="button"
        >
          1
          <ChevronDownIcon className="w-5 h-5" />
        </button>
        <div className="py-2">results per page</div>
        <button
          className="align-middle select-none font-sans text-sm/[17px] font-bold text-center u transition-all disabled:opacity-50 disabled:shadow-none rounded-md disabled:pointer-events-none py-2 px-3 border border-gray-500 text-gray-700 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] flex items-center gap-1"
          type="button"
        >
          <EnvelopeIcon className="w-5 h-5" />
          Filter
        </button>
        <button
          className="align-middle select-none font-sans font-bold text-center u transition-all disabled:opacity-50 disabled:shadow-none rounded-md disabled:pointer-events-none text-sm/[17px] py-2 px-3 border border-gray-500 text-gray-700 hover:opacity-75 focus:ring focus:ring-gray-300 active:opacity-[0.85] flex items-center gap-1"
          type="button"
        >
          <EnvelopeIcon className="w-5 h-5" />
          Sort
        </button>
        <button
          className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
          type="button"
        >
          <ArrowRightStartOnRectangleIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default ProfileBody;
