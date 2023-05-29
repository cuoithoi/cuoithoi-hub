import React from "react";
import TitleSection from "@/components/letter-page/sub-comp/TitleSection";
import WeddingCmt from "@/components/letter-page/sub-comp/WeddingCmt";
const CommentDetail = () => {
  return (
    <div className="letter-wrapper h-full">
      <div className=" letter-layout h-full">
        <div className="text-center  relative section-mb layout-mw h-full">
          <div className="congrats-wrapper pt-16">
            <TitleSection title="LỜI CHÚC" />
          </div>
          {new Array(10).fill(0).map((_, i) => {
            return (
              <div key={i}>
                <WeddingCmt viewDetail={true} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentDetail;
