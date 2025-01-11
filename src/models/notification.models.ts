export interface INotification {
  id: string;
  picture_url: string | null;
  redirect_url: string | null;
  contents: INotificationContents;
  created_at: string;
  updated_at: string;
  recipients: INotificationRecipient[];
  template_data: INotificationTemplate;
}

export interface INotificationTemplate {
  id: number;
  name: string;
  type_data: {display_names: {English: string, Korean: string}, color_code: string};
}

export interface INotificationRecipient {
  recipient_data: {id: number, username: string};
  read: boolean;
  read_at: string | null;
}

export interface INotificationContents {
  [key: string]: string;
}

export interface INotificationTemplateType{
  id: number;
  display_names: {English: string, Korean: string};
  name: string;
  description: string;
  color_code: string;
}