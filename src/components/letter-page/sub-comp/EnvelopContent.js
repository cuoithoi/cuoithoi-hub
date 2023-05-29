import React from "react";
import homeMain from "@/assets/home-image/home-main.png";
const EnvelopContent = () => {
  return (
    <div className="text-center text-xs  relative section-mb layout-mw">
      <h2 className="text-main text-xs">Thân mời tới dự bữa tiệc</h2>
      <h1 className="text-xs">Việt Anh & Phương Anh</h1>
      <div className="flex justify-center pt-3">
        <img src={homeMain} alt="" />
      </div>
      <h1 className="wind-song big-size text-sm ">18.02</h1>
    </div>
  );
};

export default EnvelopContent;
