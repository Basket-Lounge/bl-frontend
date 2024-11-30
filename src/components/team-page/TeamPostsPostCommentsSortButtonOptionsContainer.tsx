import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useContext, useState } from "react";
import { useStore } from "zustand";
import SortButtonOption from "../common/SortButtonOption";
import { PostCommentsContext } from "./TeamPostsPostCommentsContainer";


const TeamPostsPostCommentsSortButtonOptionsContainer = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const sort = searchParams.get('sort')?.split(',') || [];

  const createdAtIndex = sort.findIndex((value) => value === 'created_at' || value === '-created_at');
  const postcommentlikeIndex = sort.findIndex((value) => value === 'postcommentlike' || value === '-postcommentlike');
  const postcommentreplyIndex = sort.findIndex((value) => value === 'postcommentreply' || value === '-postcommentreply');

  // if sort is empty, don't set any state
  // if the value is asc, set the state to true
  // if the value is desc, set the state to false
  const [createdAtSort, setCreatedAtSort] = useState<boolean | null>(
    createdAtIndex !== -1 ? (sort[createdAtIndex] === 'created_at' ? true : false) : null
  );
  const [postcommentlikeSort, setPostCommentLikeSort] = useState<boolean | null>(
    postcommentlikeIndex !== -1 ? (sort[postcommentlikeIndex] === 'postcommentlike' ? true : false) : null
  );
  const [postcommentreplySort, setPostCommentReplySort] = useState<boolean | null>(
    postcommentreplyIndex !== -1 ? (sort[postcommentreplyIndex] === 'postcommentreply' ? true : false) : null
  );

  const store = useContext(PostCommentsContext);
  const setPostCommentsArgumentsModified = useStore(store, (state) => state.setPostCommentsArgumentsModified);

  const handleCreatedAtSortClick = (sort: string) => {
    if (sort === 'asc') {
      setCreatedAtSort(true);
    } else {
      setCreatedAtSort(false);
    }
  }

  const handlePostCommentLikeSortClick = (sort: string) => {
    if (sort === 'asc') {
      setPostCommentLikeSort(true);
    } else {
      setPostCommentLikeSort(false);
    }
  }

  const handlePostCommentReplySortClick = (sort: string) => {
    if (sort === 'asc') {
      setPostCommentReplySort(true);
    } else {
      setPostCommentReplySort(false);
    }
  }

  const createQueryString = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString())
    
    const newSorts = [];
    if (createdAtSort !== null) {
      if (createdAtSort) {
        newSorts.push('created_at');
      } else {
        newSorts.push('-created_at');
      }
    }

    if (postcommentlikeSort !== null) {
      if (postcommentlikeSort) {
        newSorts.push('postcommentlike');
      } else {
        newSorts.push('-postcommentlike');
      }
    }

    if (postcommentreplySort !== null) {
      if (postcommentreplySort) {
        newSorts.push('postcommentreply');
      } else {
        newSorts.push('-postcommentreply');
      }
    }

    if (newSorts.length === 0) {
      params.delete('sort');
    } else {
      params.set('sort', newSorts.join(','));
    }

    params.set('page', '1')

    return params.toString()
  }, [searchParams, createdAtSort, postcommentlikeSort, postcommentreplySort])

  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPostCommentsArgumentsModified(true);
    router.push(pathname + "?" + createQueryString())
  }

  const handleResetClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setCreatedAtSort(null);
    setPostCommentLikeSort(null);
    setPostCommentReplySort(null);
  }

  return (
    <div 
      className="absolute w-[350px] bg-color3 rounded-md p-[24px] z-10 flex flex-col gap-[16px] top-[150%] right-0"
    >
      <div className="flex flex-col gap-[16px]">
        <SortButtonOption
          name="생성 날짜"
          sortValue={handleCreatedAtSortClick}
          currentValue={createdAtSort}
        />
        <SortButtonOption
          name="좋아요"
          sortValue={handlePostCommentLikeSortClick}
          currentValue={postcommentlikeSort}
        />
        <SortButtonOption
          name="답글"
          sortValue={handlePostCommentReplySortClick}
          currentValue={postcommentreplySort}
        />
      </div>
      <div className="w-full flex justify-start gap-[16px] mt-[16px]">
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleResetClick}
        >
          초기화
        </button>
        <button
          className="bg-color4 text-white px-[12px] py-[8px] rounded-full w-full"
          onClick={handleApplyClick}
        >
          적용
        </button>
      </div>
    </div>
  )
}

export default TeamPostsPostCommentsSortButtonOptionsContainer;