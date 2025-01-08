export interface INotification {
  id: string;
  picture_url: string | null;
  redirect_url: string | null;
  contents: INotificationContents;
  created_at: string;
  updated_at: string;
  recipients: INotificationRecipient[];
}

export interface INotificationPaginationResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: INotification[];
}

export interface INotificationRecipient {
  recipient_data: {id: number, username: string};
  read: boolean;
  read_at: string | null;
}

export interface INotificationContents {
  [key: string]: string;
}