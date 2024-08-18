import { FormControl } from "@angular/forms";

export enum AuthStep {
    LOGIN_PHONE_EMAIL_USERNAME = 1,
    REGISTER = 2,
    FACEBOOK = 3,
    GOOGLE = 4,
    TWITTER = 5,
    APPLE = 6,
}


export interface IloginForm {
    username: FormControl<string>;
    password: FormControl<string>;
}