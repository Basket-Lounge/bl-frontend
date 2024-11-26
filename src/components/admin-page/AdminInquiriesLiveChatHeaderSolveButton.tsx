import { markInquiryAsSolved, markInquiryAsUnsolved } from "@/api/admin.api";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner";
import Image from "next/image";


interface IAdminInquiriesLiveChatHeaderSolveButtonProps {
  solved: boolean;
}

const AdminInquiriesLiveChatHeaderSolveButton = (
  { solved }: IAdminInquiriesLiveChatHeaderSolveButtonProps
) => {
  const searchParams = useSearchParams();
  const inquiryId = searchParams.get("inquiry") || '';

  const markInquiryAsResolvedMutation = useMutation({
    mutationFn: () => {
      return markInquiryAsSolved(inquiryId);
    },
  });

  const markInquiryAsUnresolvedMutation = useMutation({
    mutationFn: () => {
      return markInquiryAsUnsolved(inquiryId);
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (solved) {
      markInquiryAsUnresolvedMutation.mutate();
    } else {
      markInquiryAsResolvedMutation.mutate();
    }
  }

  if (markInquiryAsResolvedMutation.isPending || markInquiryAsUnresolvedMutation.isPending) {
    return (
      <button
        disabled
      >
        <TeamHeaderLikeButtonSpinner />
      </button>
    )
  }

  if (solved) {
    return (
      <button
        onClick={handleClick}
      >
        <Image
          src={"/icons/undo_24dp_FFFFFF.svg"}
          alt="Undo solve"
          width={24}
          height={24}
        />
      </button>
    )
  }

  return (
    <button
      onClick={handleClick}
    >
      <Image
        src={"/icons/check_circle_24dp_FFFFFF.svg"}
        alt="Solve"
        width={24}
        height={24}
      />
    </button>
  )
}

export default AdminInquiriesLiveChatHeaderSolveButton;