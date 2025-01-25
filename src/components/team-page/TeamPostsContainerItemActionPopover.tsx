import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import TextButton from "../common/TextButton";


interface ITeamPostsContainerItemActionPopoverProps {
  children: React.ReactNode;
}

const TeamPostsContainerItemActionPopover = ({
  children
}: ITeamPostsContainerItemActionPopoverProps) => {
  return (
    <div>
      <Popover
        placement="bottom"
      >
        <PopoverHandler>
          <button aria-label="post-action-popover">
            <TextButton text="..." />
          </button>
        </PopoverHandler>
        <PopoverContent
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="p-0 border-none z-50"
        >
          {children}
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default TeamPostsContainerItemActionPopover;