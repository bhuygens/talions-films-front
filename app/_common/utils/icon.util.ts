import arrowBack from "../assets/icons/arrow_back.svg.svg"

export enum Icons {
  arroowBack = "arrowBack",
}

export class IconsHelper {
  static getIcon = (icon: Icons) => {
    switch (icon) {
      case Icons.arroowBack:
        return arrowBack;
    }
  }

}
