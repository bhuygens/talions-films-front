import {Client} from "@notionhq/client";

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export class NotionClient {
  public static getDatabase = async (databaseId: string) => {
    const response = await notion.databases.query({
      database_id: databaseId,
    });
    console.log(response.results);
    debugger
    return response.results;
  };

  public static getPage = async (pageId: string) => {
    const response = await notion.pages.retrieve({page_id: pageId});
    return response;
  };

  public static getBlocks = async (blockId: string) => {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 50,
    });
    return response.results;
  };

}
