import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import { Global, Header, SliderWrapper, ImgWrapper, Indicator, Overlay, BtnClose } from './styles';

const ImagesZoom = ({ imgs, onClose }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const settings = {
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (oldIdx, newIdx) => setCurrentIdx(newIdx)
  };
  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <BtnClose onClick={onClose} />
      </Header>
      <SliderWrapper>
        <div>
          <Slider {...settings}>
            {imgs.map((img) => (
              <ImgWrapper key={img.src}>
                <img
                  src={`http://localhost:3065/${img.src}`}
                  alt={`http://localhost:3065/${img.src}`}
                />
              </ImgWrapper>
            ))}
          </Slider>
          <Indicator>
            <div>{`${currentIdx + 1} / ${imgs.length}`}</div>
          </Indicator>
        </div>
      </SliderWrapper>
    </Overlay>
  );
};

ImagesZoom.propTypes = {
  imgs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired
};

export default ImagesZoom;
