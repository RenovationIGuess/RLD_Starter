import React, { useState } from 'react';
import {
  ButtonWrap,
  Desc,
  FillBg,
  Rect,
  SvgWrap,
  HoyoButtonContainer,
} from './HoyoButtonStyle';
import { motion } from 'framer-motion';
import './HoyoButton.scss';

const HoyoButton = (props) => {
  const [isHoyoButtonHovered, setIsHoyoButtonHovered] = useState(false);

  return (
    <HoyoButtonContainer
      as={motion.div}
      variants={props.variants}
      onMouseOver={() => setIsHoyoButtonHovered(true)}
      onMouseOut={() => setIsHoyoButtonHovered(false)}
      onClick={props.handleFunc}
      style={props.style}
    >
      <ButtonWrap
        style={{
          '--rx-pc': 30,
          '--rx-mo': 16,
          '--rem-ratio': 0.75,
        }}
      >
        <FillBg isHovered={isHoyoButtonHovered}></FillBg>
        <SvgWrap>
          <Rect isHovered={isHoyoButtonHovered} rx="23" pathLength="700"></Rect>
        </SvgWrap>
        {!props.loading ? (
          <Desc id="button__title">{props.description}</Desc>
        ) : (
          <span className="my-loader"></span>
        )}
      </ButtonWrap>
    </HoyoButtonContainer>
  );
};

export default HoyoButton;
