import React, { useState, useEffect } from "react";
import { Breadcrumb, Typography } from "antd";
import { useLocation } from "react-router-dom";
import menuList from "../../config/menuConfig";

import "./index.less";

const { Title } = Typography;

const BcComponent = () => {
  const [parentTag, setParentTag] = useState("");
  const [childrenTag, setChildrenTag] = useState("");
  const [icon, setIcon] = useState("");
  const location = useLocation();

  useEffect(() => {
    menuList.find((item) => {
      if (!item.children && item.key === location.pathname) {
        setIcon(item.icon);
        setParentTag(item.title);
        return;
      }
      if (item.children) {
        const cItem = item.children.find(
          (cItem) => location.pathname.indexOf(cItem.key) === 0
        );
        if (cItem) {
          setIcon(item.icon);
          setParentTag(item.title);
          setChildrenTag(cItem.title);
        }
        return;
      }
    });
    return () => {
      setChildrenTag("");
    };
  }, [location.pathname]);

  const getItems = () => {
    return [
      icon && {
        title: icon,
      },

      {
        title: parentTag,
      },
      childrenTag && {
        title: childrenTag,
      },
    ].filter((item) => item !== "");
  };

  return (
    <div className="BCcontainer">
      <Breadcrumb separator=">" items={getItems()} className="tagContent" />
      {childrenTag ? (
        <Title className="tagTitle">{childrenTag}</Title>
      ) : (
        <Title className="tagTitle">{parentTag}</Title>
      )}
    </div>
  );
};

export default BcComponent;
