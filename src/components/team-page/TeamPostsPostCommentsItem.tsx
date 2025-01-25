import { TeamPostComment} from "@/models/team.models";
import { createContext, useEffect, useMemo, useState } from "react";
import { createStore, useStore } from "zustand";
import TeamPostsPostCommentsItemUser from "./TeamPostsPostCommentsItemUser";
import TeamPostsPostCommentsItemLikesRepliesButtonsContainer from "./TeamPostsPostCommentsItemLikesReplies";
import TeamPostsPostCommentsItemRepliesContainer from "./TeamPostsPostCommentsItemRepliesContainer";


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
  const [realComment, setRealComment] = useState(comment);
  const store = useMemo(() => createPostCommentReplyStore(), []);

  const isReplyOpen = useStore(store, (state) => state.isReplyOpen);

  useEffect(() => {
    setRealComment(comment);
    store.getState().updateLiked(comment.liked || false);
    store.getState().updateLikesCount(comment.likes_count);
    store.getState().updateRepliesCount(comment.replies_count);
  }, [comment]);

  return (
    <PostCommentReplyContext.Provider value={store}>
      <li className="flex flex-col gap-[24px] items-stretch px-[24px] py-[16px]">
        <TeamPostsPostCommentsItemUser userData={realComment.user_data} />
        <p className="text-white text-[14px] leading-4">{realComment.content}</p>
        <TeamPostsPostCommentsItemLikesRepliesButtonsContainer
          isLiked={comment.liked || false}
          commentId={comment.id}
        />
        {isReplyOpen && (
          <TeamPostsPostCommentsItemRepliesContainer
            comment={realComment}
          />
        )}
      </li>
    </PostCommentReplyContext.Provider>
  );
}

export default TeamPostsPostCommentsItem;