import styled from 'styled-components';

export const HoyoButtonContainer = styled.div`
  background: #efefef;
  border-radius: 50px;
  font-size: 16px;
  width: 150px;
  flex: 0 0 auto;
  color: #4d6eff;
  margin-top: 24px;
  cursor: pointer;
`;

export const ButtonWrap = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  // height: 45px;
  height: calc(var(--rx-pc) * var(--rem-ratio) * 2px);
  padding: 10px 24px;
`;

export const FillBg = styled.div`
  // border-radius: 50px;
  border-radius: calc(var(--rx-pc) * var(--rem-ratio) * 1px);
  z-index: 1;
  opacity: ${(props) => (props.isHovered ? '0' : '')};
  transition: opacity 0.4s;
  background: transparent;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

export const SvgWrap = styled.svg`
  z-index: 3;
  position: absolute;
  height: 100%;
  width: 100%;
  overflow: hidden;
  top: 0;
  left: 0;
`;

export const Rect = styled.rect`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 2px);
  height: calc(100% - 2px);
  transform: translate(1px, 1px);
  fill: none;
  stroke: #4d6eff;
  visibility: ${(props) => (props.isHovered ? 'visible' : 'hidden')};
  stroke-width: ${(props) => (props.isHovered ? '2' : '1')};
  stroke-dasharray: ${(props) => (props.isHovered ? '100,0' : '0,100')};
  stroke-dashoffset: ${(props) => (props.isHovered ? '0' : '100')};
  transition: all 0.6s cubic-bezier(0, 0.5, 0.35, 1);
`;

export const Desc = styled.div`
  z-index: 2;
  position: relative;
`;
