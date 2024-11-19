interface IAdminReportsDetailsResolveButtonProps {
  onResolve: () => void;
  resolved: boolean;
  isPending: boolean;
}

const AdminReportsDetailsResolveButton = (
  { onResolve, resolved, isPending } : IAdminReportsDetailsResolveButtonProps
) => {
  const bgColor = resolved ? "bg-[#16A34A]" : "bg-color1";
  const textColor = resolved ? "text-white" : "text-white";

  return (
    <button
      onClick={() => onResolve()}
      className={"rounded-full py-[12px] text-center w-1/2 font-semibold mx-auto block " + bgColor + " " + textColor}
    >
      {isPending ? "처리 중..." : null}
      {(!isPending && !resolved) ? "해결로 변경" : null}
      {(!isPending && resolved) ? "미해결로 변경" : null}
    </button>
  );
}

export default AdminReportsDetailsResolveButton;