import arrowBack from "../assets/icons/arrow_back.svg"

export enum Icons {
  arrowBack = "arrowBack",
}

export class IconsHelper {
  static getIcon = (icon: Icons) => {
    switch (icon) {
      case Icons.arrowBack:
        return arrowBack;
    }
  }

}
