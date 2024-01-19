export default class WindowUtil {
  public static isHoverInTopTenOrLessTenPercentOfScreen(e: MouseEvent) {
    const topTenPercentOfScreen = window.innerHeight - (window.innerHeight * 0.9);
    const bottomTenPercentOfScreen = window.innerHeight - topTenPercentOfScreen;
    return (e.clientY < topTenPercentOfScreen) || (bottomTenPercentOfScreen < e.clientY && e.clientY < window.innerHeight);
  }
}
