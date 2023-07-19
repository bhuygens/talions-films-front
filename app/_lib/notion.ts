import {Client} from "@notionhq/client";
import {PageTypeEnum} from "@/app/_common/domain/enums/pageType.enum";
import {RequestParameters} from "@notionhq/client/build/src/Client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export class NotionClient {

  private static databaseId = process.env.NOTION_DATABASE_ID;
  public static getDatabase = async (databaseId: string) => {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response.results);
    debugger
    return response.results;
  };

  public static getPage = async (pageId: string, pageType: PageTypeEnum) => {
    const response = await notion.pages.retrieve({
      page_id: pageId,
    });
    return response;
  };

  public static getBlocks = async (blockId: string) => {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
    });
    return response.results;
  };

  public static test = async () => {
    console.log(notion);
    console.log(notion.users.list);
    /*const payload: RequestParameters = {
      path: `databases/92a7528ba93e4248bd44f294a65167d3/query`,
      method: "post",
      auth: 'secret_b2dqtASnJMjndzOIFiDG1elu0ssHlcOVEW4WgKTFHJD',
    };
    // @ts-ignore
    const {results} = await notion.request(<RequestParameters>payload);
    return results
     */
  }
}
