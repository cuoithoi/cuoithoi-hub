import React from "react";
import { Carousel } from "react-responsive-carousel";
import bankQr from "@/assets/temp-file/bank-qr.png";
import bankText from "@/assets/temp-file/bank-text.png";
const BankInfo = () => {
  return (
    <div>
      <h2 className="text-center text-second">Thông tin nhà gái</h2>
      <div>
        <Carousel showArrows={true} centerMode={true}>
          <div>
            <img src={bankText} alt="" />
            <img src={bankQr} alt="" />
          </div>
          <div>
            <img src={bankText} alt="" />
            <img src={bankQr} alt="" />
          </div>
          <div>
            <img src={bankText} alt="" />
            <img src={bankQr} alt="" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BankInfo;
