interface IGoogleCallbackLayoutProps {
  children: React.ReactNode;
}

const GoogleCallbackLayout : React.FC<IGoogleCallbackLayoutProps> = ({
  children
}) => {
  return (
    <div className="mx-[256px] my-[32px] flex flex-col items-stretch gap-[24px]">
      {children}
    </div>
  )
}

export default GoogleCallbackLayout;