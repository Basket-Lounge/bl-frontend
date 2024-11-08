import { UserChat, UserChatMessage, UserChatMessageWithUserData, UserChatParticipants } from "@/models/user.models";

export const translateRoleNameToKorean = (role: string) => {
  switch (role) {
    case 'user':
      return '일반 사용자';
    case 'banned':
      return '계정 정지';
    case 'deactivated':
      return '계정 비활성화';
    case 'site_moderator':
      return '사이트 관리자';
    case 'chat_moderator':
      return '채팅 관리자';
    case 'admin':
      return '관리자';
    default:
      return '알 수 없음';
  }
}

export const createChannelNameForPrivateChat = (chatId: string, participants: UserChatParticipants[]) => {
  const participants1Id = participants[0].user_data.id;
  const participants2Id = participants[1].user_data.id;

  return chatId + `#${participants1Id},${participants2Id}`;
}


export const sortUserChatMessagesByDate = (messages: UserChatMessageWithUserData[]) => {
  return messages.sort((a, b) => {
    return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
  });
}

export const sortUserChatByLastMessageDate = (
  chats: UserChat[], 
  newChat: UserChat, 
) => {
  const newChatIndex = chats.findIndex((chat) => chat.id === newChat.id);
  if (newChatIndex === -1) {
    chats.push(newChat);
  } else {
    chats[newChatIndex] = newChat;
  }

  const newChats = chats.sort((a, b) => {
    const aLastMessageDate = new Date(a.updated_at).getTime();
    const bLastMessageDate = new Date(b.updated_at).getTime();

    return bLastMessageDate - aLastMessageDate;
  });

  while (newChats.length > 10) {
    newChats.pop();
  }

  return newChats;
}

export const getLastMessageFromUserChat = (chat: UserChat, username: string) => {
  const user = chat.participants.find(participant => participant.user_data.username === username);
  const otherUser = chat.participants.find(participant => participant.user_data.username !== username);

  const userlastMessage = user?.last_message?.created_at || '2000-01-01T00:00:00Z';
  const otherUserlastMessage = otherUser?.last_message?.created_at || '2000-01-01T00:00:00Z';

  return new Date(userlastMessage).getTime() > new Date(otherUserlastMessage).getTime() ? 
    user?.last_message : 
    otherUser?.last_message;
}