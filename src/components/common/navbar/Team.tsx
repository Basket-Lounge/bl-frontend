import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import TeamContainer from "./TeamContainer";


const Team = () => {
  return (
    <div>
      <Popover 
        placement="bottom"
      >
        <PopoverHandler>
          <button 
            className="relative"
          >
            팀
          </button>
        </PopoverHandler>
        <PopoverContent 
          placeholder={undefined} 
          onPointerEnterCapture={undefined} 
          onPointerLeaveCapture={undefined}
          className="p-0 border-none z-50"
        >
          <TeamContainer />
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Team;