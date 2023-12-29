import { Tooltip } from 'antd';
import React, { useState } from 'react';
import {
  AiFillFolder,
  AiFillFolderOpen,
  AiOutlineInfoCircle,
} from 'react-icons/ai';
import { cn } from '~/utils';

const FileLocationInput = ({ setData, label, desc }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="form-item-container">
      <div className="flex items-center">
        <span className="form-item-container__label">{label}</span>
        <div className="copyright-settings-title">
          <Tooltip title={'Default is Private Directory'} placement="top">
            <AiOutlineInfoCircle className="icon" />
          </Tooltip>
        </div>
      </div>

      <div
        className={cn(`banner-entry`, 'mt-2')}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => {
        }}
      >
        {hovered ? (
          <AiFillFolderOpen className="icon" />
        ) : (
          <AiFillFolder className="icon" />
        )}
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default FileLocationInput;
