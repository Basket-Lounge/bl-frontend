import Image from "next/image";


interface IUserCommentsContainerEditDeleteButtonsContainerProps {
  handleEditClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleDeleteClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const UserCommentsContainerEditDeleteButtonsContainer = ({
  handleDeleteClick,
  handleEditClick 
}: IUserCommentsContainerEditDeleteButtonsContainerProps) => {
  return (
    <div className="flex items-center gap-[16px]">
      <button
        onClick={handleEditClick}
      >
        <Image
          src="/icons/edit_24dp_FFFFFF.svg"
          width={24}
          height={24}
          alt="views"
        />
      </button>
      <button
        onClick={handleDeleteClick}
      >
        <Image
          src="/icons/delete_24dp_FFFFFF.svg"
          width={24}
          height={24}
          alt="views"
        />
      </button>
    </div>
  );
}

export default UserCommentsContainerEditDeleteButtonsContainer;