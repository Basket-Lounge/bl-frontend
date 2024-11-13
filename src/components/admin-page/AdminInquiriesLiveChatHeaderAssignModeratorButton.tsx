import { assignInquiry, unassignInquiry } from "@/api/admin.api";
import { UserInquiryModerator } from "@/models/user.models";
import { useAuthStore } from "@/stores/auth.stores";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import TeamHeaderLikeButtonSpinner from "../team-page/TeamHeaderLikeButtonSpinner";


interface IAdminInquiriesLiveChatHeaderAssignModeratorButtonProps {
  moderators: UserInquiryModerator[];
}

const AdminInquiriesLiveChatHeaderAssignModeratorButton = (
  { moderators }: IAdminInquiriesLiveChatHeaderAssignModeratorButtonProps
) => {
  const { userId } = useAuthStore();
  const searchParams = useSearchParams();
  const inquiryId = searchParams.get("inquiry") || '';

  const isUserModerator = useCallback(() => {
    for (const moderator of moderators) {
      if (moderator.moderator_data.id === userId && moderator.in_charge) {
        return true;
      }
    }
    return false;
  }, [moderators]);

  const assignMutation = useMutation({
    mutationFn: () => {
      return assignInquiry(inquiryId);
    },
  });

  const unassignMutation = useMutation({
    mutationFn: () => {
      return unassignInquiry(inquiryId);
    },
  });

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (isUserModerator()) {
      unassignMutation.mutate();
    } else {
      assignMutation.mutate();
    }
  }

  if (assignMutation.isPending || unassignMutation.isPending) {
    return (
      <button
        disabled
      >
        <TeamHeaderLikeButtonSpinner />
      </button>
    )
  }

  if (isUserModerator()) {
    return (
      <button
        onClick={handleClick}
      >
        <Image
          src={"/icons/person_off_24dp_FFFFFF.svg"}
          alt="Unassign moderator"
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
        src={"/icons/person_24dp_FFFFFF.svg"}
        alt="Assign moderator"
        width={24}
        height={24}
      />
    </button>
  )
}

export default AdminInquiriesLiveChatHeaderAssignModeratorButton;