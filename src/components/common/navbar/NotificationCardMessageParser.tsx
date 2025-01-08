import { useRouter } from "next/navigation";


interface INotificationCardMessageParserProps {
  message: string;
  redirectURL: string | null;
  clickCallback?: () => void;
}

const NotificationCardMessageParser = (
  { message, redirectURL, clickCallback }: INotificationCardMessageParserProps
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

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (redirectURL) {
      router.push(redirectURL);
    }
    clickCallback && clickCallback();
  };

  return (
    <button 
      className="grow text-[14px] text-white line-clamp-2 leading-relaxed block text-left"
      onClick={handleClick}
    >
      {parts}
    </button>
  );
};

export default NotificationCardMessageParser;