import { DbServiceConfig, DbServiceType, DbSettingConfig, DbSettingConstant } from "ngx-universal-zone/database";
import { ITableOptions } from "ngx-universal-zone/database";

export class DbConstant {
    public static readonly SETTING = DbSettingConstant.SETTING;
    public static readonly USER = 'user';
}

export const dbConfig: DbServiceConfig = {
    dbType: DbServiceType.IndexDd,
    dbName: 'tiktok',
    schema: <ITableOptions[]>[
      { ...DbSettingConfig.schema },  //must needed in order to crate 'setting' table
      {
        name: DbConstant.USER,
        columns: [
          {
            name: 'email',
            isPrimaryKey: true,
            type: 'TEXT',
          },
          {
            name: 'name',
            type: 'TEXT',
          }
        ],
      },
    ],
}