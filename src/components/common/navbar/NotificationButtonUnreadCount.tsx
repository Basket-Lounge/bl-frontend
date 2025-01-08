

const NotificationButtonUnreadCount = ({ count }: { count: number | undefined }) => {
  if (!count || count === 0) {
    return null;
  }

  return (
    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-semibold rounded-full px-1">
      {count}
    </span>
  );
}

export default NotificationButtonUnreadCount;