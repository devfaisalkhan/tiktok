import { environment } from "../../environments/environment";

export class AppConstant {
  public static readonly DEBUG = !environment.production;

  public static readonly BASE_URL = !environment.production
    ? 'http://localhost:4000/api/'
    : 'http://www.choisy.com/api/';

  public static readonly BASE_API_URL = `${AppConstant.BASE_URL}`;
  public static readonly GOOGLE_MAP_API_KEY = 'AIzaSyCXujmXkCtvP_4C03hOqdoy2sOMnFfZF98'; 

  // public static readonly DEFAULT_DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
  public static readonly DATETIME_FORMAT = 'yyyy-MM-dd HH:mm:ss';
  public static readonly DATE_FORMAT = 'yyyy-MM-dd';
  public static readonly TIME_FORMAT = 'HH:mm';
  public static readonly TIME_FORMAT_AMPM = 'hh:mm a';
  public static readonly PAGE_SIZE = 15;

  public static readonly EVENT_TAB_SELECT = 'event:tabSelect';
  public static readonly EVENT_LANGUAGE_CHANGED = 'event:languageChanged';
  public static readonly EVENT_NAVIGATE_TO = 'event:navigateTo';
}
