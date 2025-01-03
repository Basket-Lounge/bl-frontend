import UserMenuHeader from "./UserMenuHeader";
import UserMenuContent from "./UserMenuContent";


const UserMenuContainer = () => {
  return (
    <div
      className={`w-[300px] bg-color3 rounded-md z-50 divide-y divide-white flex flex-col items-stretch shadow-xl`}
    >
      <UserMenuHeader />
      <UserMenuContent />
    </div>
  )
}

export default UserMenuContainer;