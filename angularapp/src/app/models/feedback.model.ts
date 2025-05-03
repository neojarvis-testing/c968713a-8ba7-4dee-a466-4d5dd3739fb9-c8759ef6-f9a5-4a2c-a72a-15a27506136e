import { User } from "./user.model";
 
export class Feedback{
    FeedbackId?:number;
    UserId:number;
    FeedbackText?:string;
    Date:Date;
    user?:User;
   
}