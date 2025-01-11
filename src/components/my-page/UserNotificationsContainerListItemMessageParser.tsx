import { useRouter } from "next/navigation";
import NotificationCardUnreadMarker from "../common/navbar/NotificationCardUnreadMarker";
import Image from "next/image";


interface IUserNotificationsContainerListItemMessageParserProps {
  message: string;
  redirectURL: string | null;
  pictureURL: string | null;
  read?: boolean;
  clickCallback?: () => void;
}

const UserNotificationsContainerListItemMessageParser = ( 
  { message, redirectURL, clickCallback, read, pictureURL }: IUserNotificationsContainerListItemMessageParserProps
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

    if (clickCallback)
      clickCallback();
  };

  return (
    <div className="w-[60%] lg:w-[55%] flex items-center gap-[24px]">
      <div className="relative w-fit">
        {read === false && (
          <NotificationCardUnreadMarker />
        )}
        <div className="w-[24px] h-[24px] lg:w-[40px] lg:h-[40px] rounded-full overflow-hidden relative">
          {pictureURL ? (
            <Image
              className="w-auto absolute top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]"
              src={pictureURL}
              alt="team-logo"
              width={20}
              height={20}
            />
          ) : (
            <div className="w-full h-full bg-white/25" />
          )}
        </div>
      </div>
      <button 
        className="lg:text-[16px] text-[14px] text-white leading-relaxed line-clamp-2 lg:line-clamp-none text-left grow cursor-pointer lg:truncate w-[50px] overflow-hidden"
        onClick={handleClick}
      >
        {parts}
      </button>
    </div>
  );
};

export default UserNotificationsContainerListItemMessageParser;