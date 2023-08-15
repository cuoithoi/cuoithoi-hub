import React from "react";
import IcLogo from "@/assets/home-image/IcLogo.svg";
import background from '../../assets/home-image/time-schedule-bg.png'

const FooterLogo = () => {
  return (
    <div className="layout-mw section-mb footer-letter flex justify-center items-center py-5" style={{ backgroundImage: `url(${background})` }}>
      <a href="/">
        <img style={{ width: 200 }} src={IcLogo} alt="" />
      </a>
    </div>
  );
};

export default FooterLogo;
