import {Cloudinary} from "@cloudinary/url-gen";

const cloudinary = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  },
  url: {
    secure: true,
  },
});

export class CommonUtil {
  public static getTab(path: string) {
    const splitPath = path.split("/")[1];

    switch (splitPath) {
      case "clips" :
        return "clips";
      case "evenements":
        return "events";
      case "pubs":
        return "pubs";
      default:
        return 'home'
    }
  }

  public static formatDate(date: string) {
    const splitDate = date.split('-');
    const day = splitDate[2];
    const month = splitDate[1];
    const year = splitDate[0];
    return `${day}-${month}-${year}`;
  }

  private static setParallaxEffect() {
    const windowHeight = window.innerHeight
    const elements: NodeListOf<HTMLElement> = document.querySelectorAll(".parallax-effect");

    const offset = -60;
    elements.forEach(element => {
      const parallaxEffect = element.dataset.parallaxSpeed || 1.6;

      element.style.backgroundPositionY = `${
        (+parallaxEffect * (element.getBoundingClientRect().top / windowHeight * 100))
      }%`;
    })
  }

  public static parallaxEffect() {
    CommonUtil.setParallaxEffect()
    window.addEventListener("scroll", CommonUtil.parallaxEffect)
  }

  public static getCloudinaryUrl(image: string) {
    return cloudinary.image(image).toURL()
  }

  public static capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

}
