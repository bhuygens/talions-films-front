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
}
