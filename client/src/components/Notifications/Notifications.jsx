import React, { useState } from 'react';
import './Notifications.scss';
import { images } from '~/constants';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const notiIcons = [
  {
    image: images.comment,
    active_image: images.comment_active,
  },
  {
    image: images.like,
    active_image: images.like_active,
  },
  {
    image: images.heart,
    active_image: images.heart_active,
  },
  {
    image: images.noti_icon,
    active_image: images.noti_icon_active,
  },
];

const TabItem = ({ image, activeImage, active, setActive }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <li
      onClick={() => {
        setActive();
      }}
      onMouseOver={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`tab-item${active ? ' active-state' : ''}`}
    >
      <div className="notification-tab__item">
        <span className="tab-label">
          <img
            src={active || hovered ? activeImage : image}
            className="img-icon"
            alt="notification-icon"
          />
        </span>
      </div>
    </li>
  );
};

const Notifications = () => {
  // Last element in notiIcons
  const [active, setActive] = useState(notiIcons.length - 1);

  return (
    <div className="notification-dialog">
      <div className="notification-dialog__header">
        <span className="notification-dialog__title">Thông báo</span>
        <div className="notification-dialog__clear">
          <div role="button" className="notification-dialog__clear__box">
            <img src={images.clean} alt="clean-icon" className="img-icon" />
          </div>
          <div role="button" className="notification__clear__setting">
            <AiFillSetting className="clear-setting-icon" />
          </div>
        </div>
      </div>
      <div className="notification-tab">
        <ul className="tab-list">
          {notiIcons.map((item, index) => (
            <TabItem
              key={index}
              activeImage={item.active_image}
              image={item.image}
              active={index === active}
              setActive={() => setActive(index)}
            />
          ))}
        </ul>
      </div>
      <div className="notification-dialog__list">
        <div className="notification-list">
          <div>
            <div className="notification-list__item">
              <div className="actor-avatar">
                <img
                  src={images.m7ava}
                  alt="actor-avatar"
                  className="actor-avatar__img"
                />
              </div>
              <div className="notification-list__content">
                <div className="notification-list__header">
                  <span className="notification-list__title">
                    <span className="text-[#657ef8]">Ramyy</span> đã thêm một
                    thay đổi
                  </span>
                </div>
                <div className="notification-list__content__body">
                  <div className="notification-list__text">
                    <span className="notification-list__text__time">
                      2 ngày trước
                    </span>
                    <span className="notification-list__text__message"></span>
                  </div>
                </div>
              </div>
              <div className="notification-list__operator">
                <div role="button" className="notification-dialog__clear__box">
                  <img
                    src={images.clean}
                    alt="clean-icon"
                    className="img-icon"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="notification-dialog__footer">
        <Link to="/">Xem thêm</Link>
      </div>
    </div>
  );
};

export default Notifications;
