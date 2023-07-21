import ky from "ky"

export class Ky {
  private static baseUrl: string;


  constructor() {
    // Ky.baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "http://api.talion-films.huygens.io";
  }

  public static async request(method: "GET", url: string) {
    const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:8080" : "https://api.talion-films.huygens.io";

    return ky.get(`${baseUrl}${url}`, {mode: "cors"}).json()
  }
}
