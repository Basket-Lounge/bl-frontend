import { deletePostComment } from "@/api/admin.api";
import TeamHeaderLikeButtonSpinner from "@/components/team-page/TeamHeaderLikeButtonSpinner";
import { useModalStore } from "@/stores/modal.stores";
import { useMutation } from "@tanstack/react-query";


interface IModalAdminDeleteCommentProps {
  userId: number;
  commentId: string;
  afterSuccessfulMutationCallback: () => void;
}

const ModalAdminDeleteComment = ({
  userId,
  commentId,
  afterSuccessfulMutationCallback
}: IModalAdminDeleteCommentProps) => {
  const { closeModal } = useModalStore();

  const deleteCommentMutation = useMutation({
    mutationFn: () => {
      return deletePostComment(userId, commentId);
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
        <button
          className="btn btn-secondary mr-2"
          onClick={handleCancelClick}
        >
          취소
        </button>
        <button
          className="btn btn-primary"
          onClick={handleDeleteComment}
          disabled={deleteCommentMutation.isPending}
        >
          {deleteCommentMutation.isPending ? <TeamHeaderLikeButtonSpinner /> : "삭제"}
        </button>
      </div>
    </div>
  );
}

export default ModalAdminDeleteComment;