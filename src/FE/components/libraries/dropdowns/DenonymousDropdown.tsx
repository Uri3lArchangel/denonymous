import React from "react";
import { DropdownApp } from "../antd";
import { BsThreeDotsVertical } from "react-icons/bs";
import { DenonymousMediaSettingDropdownItems } from "@/src/core/data/DenonymousDropdownItems";

function DenonymousDropdown({
  key_,
  owner,
  status,
}: {
  status: { video: boolean; image: boolean; audio: boolean };
  key_: string;
  owner: string;
}) {
  return (
    <DropdownApp
      items={DenonymousMediaSettingDropdownItems(status, key_, owner)}
      placement="bottomRight"
      rootClassName="DenonymousMediaDropdown"
      className={"absolute top-5 left-5 cursor-pointer "}
      triggerComponent={<BsThreeDotsVertical size={20} />}
    />
  );
}

export default DenonymousDropdown;
