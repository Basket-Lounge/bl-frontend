import { TeamStoreContext, TSection } from "@/app/teams/[teamId]/page";
import { useContext } from "react";
import { useStore } from "zustand";


interface ITeamSectionOptionButtonProps {
  designatedSection: TSection;
  name: string;
};

export default function TeamSectionOptionButton({ designatedSection, name }: ITeamSectionOptionButtonProps) {
  const store = useContext(TeamStoreContext);
  const currentSection = useStore(store, (state) => state.section);
  const updateSection = useStore(store, (state) => state.updateSection);
  
  const handleClick = (section: TSection) => {
    updateSection(section);
  };

  return (
    <button
      onClick={() => handleClick(designatedSection)} 
      className={currentSection === designatedSection ? "font-extrabold text-[16px]" : "font-medium text-[16px]"}
    >
      {name}
    </button>
  );
};