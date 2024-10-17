export interface IemailData {
  id: string;
  from: {
    email: string;
    name: string;
  };
  date: Date;
  subject: string;
  short_description: string;
}

export interface IinitialState {
  activeEmail: IemailData | null;
  readEmails: IemailData[] | null;
  unreadEmails: IemailData[] | null;
  favorites: IemailData[] | null;
  emailsList: IemailData[] | null;
}

export interface IemailBody {
  id: string;
  body: string;
}
export type TapiData = {
  list: IemailData[];
  total:number
};