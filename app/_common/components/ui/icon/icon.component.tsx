import "./icon.component.scss";
import {Icons, IconsHelper} from "@/app/_common/utils/icon.util";
import Image from "next/image";

type IconProps = {
  iconName: Icons,
  alt: string,
  color_hover?: "blue",
  size: 20 | 32 | 42
}
export default function IconComponent({iconName, alt = iconName, color_hover = "blue", size}: IconProps) {

  const getClassNames = () => {
    let classNames = ["icon_container"];


    switch (size) {
      case 32:
        classNames.push("size_32");
        break;
      case 42:
        classNames.push("size_42");
        break;
      default: {
        classNames.push("size_20");
      }

        switch (color_hover) {
          case "blue":
            classNames.push("icon_hoverBlue");
        }
    }

    return classNames.join(" ");
  }

  const getIcon = () => IconsHelper.getIcon(iconName);

  return (
    <Image className={getClassNames()}
           src={getIcon()}
           alt={alt}/>
  );
}
