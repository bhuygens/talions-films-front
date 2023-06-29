export default class WindowUtil {
  public static isHoverInTopTenOrLessTenPercentOfScreen(e: MouseEvent) {
    const topTenPercentOfScreen = window.innerHeight - (window.innerHeight * 0.9);
    const bottomTenPercentOfScreen = window.innerHeight - topTenPercentOfScreen;
    return (e.clientY < topTenPercentOfScreen) || (bottomTenPercentOfScreen < e.clientY && e.clientY < window.innerHeight);
  }

  public static getPathname() {
    console.log(window.location.pathname.split('/'));
    return window.location.pathname.split('/')[1];
  }
}
