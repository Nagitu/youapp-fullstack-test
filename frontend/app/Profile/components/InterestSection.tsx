import React from "react";
import EditButton from "./EditButton";
import Link from "next/link";

const InterestSection = () => {
  return (
    <div className="relative w-[90%] h-max bg-[#0E191F] rounded-custom p-4 mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-white text-xl font-semibold">Interest</span>
        <Link href={"/interest"}>
          <EditButton />
        </Link>
      </div>
      <input
        type="text"
        className="w-full h-[110px] p-4 rounded-custom bg-[#0E191F] text-white"
        placeholder="Add in your interest to find a better match"
      />
    </div>
  );
};

export default InterestSection;
