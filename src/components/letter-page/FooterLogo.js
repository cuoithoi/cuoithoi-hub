import React from "react";

const FooterLogo = ({ album, weddingVow }) => {
  return (
    <div className="wedding-vow">
      <div className="background_couple" style={album ? { backgroundImage: `url('${album}')` } : undefined}>
        <div className="content_wedding_vow">
          <div className="quote quote_top">
          </div>
          <div className="content">
            {
              weddingVow ? <div dangerouslySetInnerHTML={{ __html: weddingVow }} /> : <div>
                Gặp gỡ, yêu và cưới. Điều bạn vừa nghe không nằm trong một câu chuyện cổ tích, mà chính là câu chuyện về cuộc đời hai chúng tôi <br /><br />
                Chúng tôi sẽ yêu thương, chăm sóc, trân trọng và nắm tay nhau cùng đi đến hết cuộc đời này. <br /><br />
                Thật là một niềm vinh hạnh lớn khi ngày hạnh phúc nhất cuộc đời chúng tôi có sự hiện diện và chúc phúc của bạn!
              </div>
            }

          </div>
          <div className="quote quote_bottom"></div>
        </div>
      </div>
    </div>
  );
};

export default FooterLogo;
