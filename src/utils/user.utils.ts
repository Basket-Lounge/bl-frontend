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