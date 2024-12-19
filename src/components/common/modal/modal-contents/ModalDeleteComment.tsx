import { deleteTeamPostComment } from "@/api/team.api";
import { useModalStore } from "@/stores/modal.stores";
import { useMutation } from "@tanstack/react-query";
import ButtonLoading from "../../ButtonLoading";

interface IModalDeleteCommentProps {
  teamId: string;
  postId: string;
  commentId: string;
  afterSuccessfulMutationCallback: () => void;
}

const ModalDeleteComment = ({
  teamId,
  postId,
  commentId,
  afterSuccessfulMutationCallback
}: IModalDeleteCommentProps) => {
  const { closeModal } = useModalStore();

  const deleteCommentMutation = useMutation({
    mutationFn: () => {
      return deleteTeamPostComment(teamId, postId, commentId);
    },
    onSuccess: () => {
      afterSuccessfulMutationCallback();
      closeModal();
    }
  });

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    closeModal();
  }

  const handleDeleteComment = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    deleteCommentMutation.mutate();
  };

  return (
    <div className="p-4 text-color1">
      <p>정말로 해당 댓글을 삭제하시겠습니까?</p>
      <div className="flex justify-center mt-4">
        {!deleteCommentMutation.isPending && (
          <button
            className="rounded-full py-[12px] px-[24px] mr-2 bg-[#DC0909] text-white font-semibold"
            onClick={handleCancelClick}
          >
            취소
          </button>
        )}
        <button
          className="rounded-full py-[12px] px-[24px] bg-color1 text-white font-semibold"
          onClick={handleDeleteComment}
          disabled={deleteCommentMutation.isPending}
        >
          {deleteCommentMutation.isPending ? <ButtonLoading /> : "삭제"}
        </button>
      </div>
    </div>
  );
}

export default ModalDeleteComment;