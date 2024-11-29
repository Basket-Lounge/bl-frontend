import { Popover, PopoverContent, PopoverHandler } from "@material-tailwind/react";
import TeamContainer from "./TeamContainer";
import { Suspense } from "react";


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
          <Suspense fallback={<div>로딩중...</div>}>
            <TeamContainer />
          </Suspense>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default Team;