const UserCommentsContainerSkeleton = () => {
  return (
    <div className="desktop-1:grid grid-cols-2 desktop-1:items-start gap-[24px] items-stretch flex flex-col animate-pulse">
      <div className="h-[250px] bg-color3 rounded-md" />
      <div className="h-[250px] bg-color3 rounded-md" />
    </div>
  );
}

export default UserCommentsContainerSkeleton;