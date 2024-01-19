import React from "react";
import {Icons} from "@/app/_common/utils/icon.util";
import IconComponent from "@/app/_common/components/ui/icon/icon.component";

type ButtonComponentProps = {
  text: string,
  width: number,
  height: number,
  hoverColor: string,
  bgColor: string,
  onClick: () => any,
  icon?: Icons,
  iconSize?: 20 | 32 | 42,
}

function ButtonComponent({bgColor, height, hoverColor, onClick, text, width, icon, iconSize}: ButtonComponentProps) {
  return (
    <div>
      {(icon && iconSize) && <IconComponent alt={text} size={iconSize} iconName={icon}/>}
      <button>{text}</button>
    </div>
  );
}

export default ButtonComponent;
