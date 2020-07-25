import styled, { createGlobalStyle } from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';

export const Overlay = styled.div`
  position: fixed;
  z-index: 5000;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
`;

export const BtnClose = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const SliderWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;

export const ImgWrapper = styled.div`
  paddign: 32px;
  text-align: center;
  & img {
    margin: 0 auto;
    vertical-align: middle;
    max-height: 750px;
  }
`;

export const Indicator = styled.div`
  text-align: center;
  padding: 10px;

  & > div {
    display: inline-block;
    padding: 3px 10px;
    border-radius: 5px;
    background-color: #313131;
    color: white;
  }
`;

export const Global = createGlobalStyle`
.slick-slide{
  display: inline-block;
}
`;
