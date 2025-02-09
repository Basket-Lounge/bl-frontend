import { TeamPostComment} from "@/models/team.models";
import { createContext, useEffect, useMemo, useState } from "react";
import { createStore, useStore } from "zustand";
import TeamPostsPostCommentsItemUser from "./TeamPostsPostCommentsItemUser";
import TeamPostsPostCommentsItemLikesRepliesButtonsContainer from "./TeamPostsPostCommentsItemLikesReplies";
import TeamPostsPostCommentsItemRepliesContainer from "./TeamPostsPostCommentsItemRepliesContainer";
import { timeAgoKorean } from "@/utils/common.utils";
import DropdownButton from "../common/DropdownButton";
import Image from "next/image";
import TeamPostsPostCommentsItemReaderOptions from "./TeamPostsPostCommentsItemReaderOptions";
import { useParams } from "next/navigation";
import { useAuthStore } from "@/stores/auth.stores";
import TeamPostsPostCommentsItemAuthorOptions from "./TeamPostsPostCommentsItemAuthorOptions";


interface IPostCommentReplyStore {
  page: number;
  updatePage: (page: number) => void;
  
  likesCount: number;
  updateLikesCount: (likesCount: number) => void;

  repliesCount: number;
  updateRepliesCount: (repliesCount: number) => void;

  repliesPage: number;
  updateRepliesPage: (page: number) => void;

  replyAdded: boolean;
  updateReplyAdded: (value: boolean) => void;

  replyModified: boolean;
  updateReplyModified: (value: boolean) => void;

  liked: boolean;
  updateLiked: (value: boolean) => void;

  isReplyOpen: boolean;
  updateIsReplyOpen: (value: boolean) => void;

  noRefresh: boolean;
  setNoRefresh: (value: boolean) => void;
}

const createPostCommentReplyStore = () => createStore<IPostCommentReplyStore>((set) => ({
  page: 1,
  updatePage: (page) => set({ page }),

  likesCount: 0,
  updateLikesCount: (likesCount) => set({ likesCount }),

  repliesCount: 0,
  updateRepliesCount: (repliesCount) => set({ repliesCount }),

  repliesPage: 1,
  updateRepliesPage: (page) => set({ repliesPage: page }),

  replyAdded: false,
  updateReplyAdded: (value) => set({ replyAdded: value }),

  replyModified: false,
  updateReplyModified: (value) => set({ replyModified: value }),

  liked: false,
  updateLiked: (value) => set({ liked: value }),

  isReplyOpen: false,
  updateIsReplyOpen: (value) => set({ isReplyOpen: value }),

  noRefresh: false,
  setNoRefresh: (value) => set({ noRefresh: value }),
}));

export const PostCommentReplyContext = createContext<ReturnType<typeof createPostCommentReplyStore> | null>(null);


const TeamPostsPostCommentsItem = ({
  comment
}: {comment: TeamPostComment}) => {
  const { teamId, postId } = useParams<{teamId: string, postId: string}>();
  const [realComment, setRealComment] = useState(comment);
  const store = useMemo(() => createPostCommentReplyStore(), []);

  const isReplyOpen = useStore(store, (state) => state.isReplyOpen);

  const createdAtInKorean = timeAgoKorean(realComment.created_at);

  const {
    userId,
    isAuthenticated
  } = useAuthStore();

  useEffect(() => {
    setRealComment(comment);
    store.getState().updateLiked(comment.liked || false);
    store.getState().updateLikesCount(comment.likes_count);
    store.getState().updateRepliesCount(comment.replies_count);
  }, [comment]);

  return (
    <PostCommentReplyContext.Provider value={store}>
      <li className="flex flex-col gap-[24px] items-stretch px-[24px] py-[16px]" aria-label="comment">
        <div className="flex justify-between items-center">
          <div className="flex gap-[32px] items-center">
            <TeamPostsPostCommentsItemUser userData={realComment.user_data} />
            <p className="text-white/75 text-[14px]" aria-label="comment-created-at">
              {createdAtInKorean}
            </p>
          </div>
          <DropdownButton>
            <Image
              src="/icons/settings_24dp_FFFFFF.svg"
              alt="ellipsis"
              width={20}
              height={20}
            />
            {(isAuthenticated && realComment.user_data.id === userId) ? (
              <TeamPostsPostCommentsItemAuthorOptions
                teamId={teamId}
                postId={postId}
                commentId={comment.id}
              />
            ) : (
              <TeamPostsPostCommentsItemReaderOptions
                teamId={teamId}
                postId={postId}
                commentId={comment.id}
              />
            )}
          </DropdownButton>
        </div>
        <p className="text-white text-[14px] leading-4" aria-label="comment-content">{realComment.content}</p>
        <TeamPostsPostCommentsItemLikesRepliesButtonsContainer
          commentId={comment.id}
        />
        {isReplyOpen && (
          <TeamPostsPostCommentsItemRepliesContainer
            commentId={realComment.id}
          />
        )}
      </li>
    </PostCommentReplyContext.Provider>
  );
}

export default TeamPostsPostCommentsItem;