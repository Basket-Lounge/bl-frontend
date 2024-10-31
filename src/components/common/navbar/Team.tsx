import useClickOutside from "@/hooks/useClickOutside";
import { useRef, useState } from "react";


const Team = () => {
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState<boolean>(false);
  const teamMenuButtonRef = useRef<HTMLButtonElement>(null);

  useClickOutside(teamMenuButtonRef, setIsTeamMenuOpen);

  const handleTeamMenuClick = () => {
    setIsTeamMenuOpen(!isTeamMenuOpen);
  }

  return (
    <div>
      <button 
        className="relative"
        ref={teamMenuButtonRef}
        onClick={handleTeamMenuClick}
      >
        팀
        {isTeamMenuOpen && (
        <div 
          className="absolute top-[40px] left-0 w-[300px] bg-color3 rounded-md p-[24px] z-10"
        >

        </div>
        )}
      </button>
    </div>
  )
}

export default Team;