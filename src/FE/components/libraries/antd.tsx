"use client";
import React, { CSSProperties, ReactNode, useState } from "react";
import { ButtonProps, Modal } from "antd";
import { Carousel } from "antd";
import { CommentOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import { BsReplyFill, BsThreeDots, BsThreeDotsVertical } from "react-icons/bs";
import { Download, EyeIcon, EyeOffIcon, Share2Icon, XIcon } from "lucide-react";

export interface ModalStyles {
  header?: CSSProperties;
  body?: CSSProperties;
  footer?: CSSProperties;
  mask?: CSSProperties;
  wrapper?: CSSProperties;
  content?: CSSProperties;
}
export const ModalComponent = ({
  children,
  state,
  setState,
  styles,
  ok,
  title,
  key,
  mask,
  maskC,
  CancelButton,
  onOk,
}: {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  ok?: boolean;
  title: string | React.ReactNode;
  key?: any;
  mask?: boolean;
  maskC?: boolean;
  styles?: Omit<ModalStyles, "wrapper"> | undefined;
  CancelButton?: ButtonProps;
  onOk?: any;
}) => {
  return (
    <>
      <Modal
        key={key}
        styles={styles}
        title={title}
        mask={mask}
        maskClosable={maskC}
        open={state}
        cancelButtonProps={{ className: "text-white", danger: true }}
        onOk={onOk}
        okType={"default"}
        okText={ok ? "ok" : null}
        okButtonProps={ok ? { className: "text-[#fff]" } : { hidden: true }}
        onCancel={() => {
          setState(false);
        }}
      >
        {children}
      </Modal>
    </>
  );
};

const contentStyle: React.CSSProperties = {
  margin: 0,
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
};

export const CarouselApp = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: any;
}) => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };

  return (
    <Carousel afterChange={onChange} className={className}>
      {children}
    </Carousel>
  );
};

// icon={<BsThreeDotsVertical size className="text-black" />}

export const FloatButtonComponent = ({
  className,
  selected,
  replySS,
}: {
  className?: string;
  selected: number;
  replySS: any;
}) => (
  <>
    <FloatButton.Group
      aria-label="Share Responses Menu Float Button "
      className={className+ ' text-black'}
      type="primary"
      style={{ right: 50 }}
      closeIcon={<XIcon className="text-black transform translate-x-[-3px]" />}
      icon={<BsThreeDotsVertical className="text-black" />}
      trigger="click"
    >
      {/* <TooltipApp text='' title='share resonses'>

      <FloatButton  icon={
      <Share2Icon size={20} className="translate-x-[-2px]" />
      }  />
      </TooltipApp> */}

      {selected <= 3 ? (
        <TooltipApp title="Reply and share" text="">
          <FloatButton icon={<BsReplyFill className="text-black" size={20} />} onClick={replySS} />
        </TooltipApp>
      ) : (
        <></>
      )}
    </FloatButton.Group>
  </>
);

import { Tooltip } from "antd";

export const TooltipApp = ({
  title,
  text,
  children,
}: {
  title: string;
  text: string;
  children?: any;
}) => {
  if (children) {
    return <Tooltip title={title}>{children}</Tooltip>;
  }

  if (text.length >= 24) {
    let t = text.substring(0, 26);
    text = t + "...";

    return (
      <Tooltip title={title}>
        <p className={` cursor-pointer topicTextLarge`}>{text}</p>
      </Tooltip>
    );
  } else {
    return (
      <Tooltip title={title}>
        <p className={` cursor-pointer topicText`}>{text}</p>
      </Tooltip>
    );
  }
};

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space } from "antd";
import Backarrow from "../subcomponents/Backarrow";

export const DropdownApp = ({
  items,
  trigger,
  triggerComponent,
  className,
  rootClassName,
  placement,
}: {
  items?: MenuProps["items"];
  triggerComponent: ReactNode;
  trigger?: ("contextMenu" | "click" | "hover")[];
  className?: any;
  rootClassName?: any;
  placement?:
    | "topLeft"
    | "topCenter"
    | "topRight"
    | "bottomLeft"
    | "bottomCenter"
    | "bottomRight"
    | "top"
    | "bottom";
}) => {
  return (
    <Dropdown
      menu={{ items }}
      rootClassName={rootClassName}
      className={className}
      placement={placement}
      trigger={trigger}
    >
      <a aria-label="Dropdown Menu" href="" onClick={(e) => e.preventDefault()}>
        <Space>
          {triggerComponent}
          {/* hover me */}
        </Space>
      </a>
    </Dropdown>
  );
};

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem("Company", "sub1", null, [
    getItem("About Us", "1"),
    getItem("Community", "2"),
  ]),
  getItem("Contact", "sub2", null, [
    getItem("Option 5", "5"),
    getItem("Option 6", "6"),
    getItem("Submenu", "sub3", null, [
      getItem("Option 7", "7"),
      getItem("Option 8", "8"),
    ]),
  ]),
];

// submenu keys of first level
const rootSubmenuKeys = ["sub1", "sub2", "sub4"];

const MenuApp = () => {
  const [openKeys, setOpenKeys] = useState(["sub1"]);

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Menu
      mode="inline"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      style={{ width: 256 }}
      items={items}
    />
  );
};

export default MenuApp;
