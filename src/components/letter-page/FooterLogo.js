import React from "react";
import IcLogo from "@/assets/home-image/IcLogo.svg";
const FooterLogo = () => {
  return (
    <div className="layout-mw section-mb footer-letter flex justify-center items-center py-5">
      <img style={{width: 200}} src={IcLogo} alt="" />
    </div>
  );
};

export default FooterLogo;
