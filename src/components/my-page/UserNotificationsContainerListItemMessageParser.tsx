import { useRouter } from "next/navigation";


interface IUserNotificationsContainerListItemMessageParserProps {
  message: string;
  redirectURL: string | null;
  clickCallback?: () => void;
}

const UserNotificationsContainerListItemMessageParser = ( 
  { message, redirectURL, clickCallback }: IUserNotificationsContainerListItemMessageParserProps
) => {
  const router = useRouter();

  // Regular expression to match substrings within [[ ]]
  const regex = /\[\[(.*?)\]\]/g;

  // Split the message into parts and process matches
  const parts = [];
  let lastIndex = 0;
  let match;

  // Process each match
  while ((match = regex.exec(message)) !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [fullMatch, content] = match;

    // Add plain text before the match
    if (match.index > lastIndex) {
      parts.push(message.slice(lastIndex, match.index));
    }

    // Add the matched content wrapped in a <span>
    parts.push(<span className="font-bold" key={parts.length}>{content}</span>);

    // Update the last index
    lastIndex = regex.lastIndex;
  }

  // Add remaining plain text after the last match
  if (lastIndex < message.length) {
    parts.push(message.slice(lastIndex));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectURL) {
      router.push(redirectURL);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    clickCallback && clickCallback();
  };

  return (
    <button 
      className="text-[16px] text-white line-clamp-1 leading-relaxed block text-left grow cursor-pointer"
      onClick={handleClick}
    >
      {parts}
    </button>
  );
};

export default UserNotificationsContainerListItemMessageParser;