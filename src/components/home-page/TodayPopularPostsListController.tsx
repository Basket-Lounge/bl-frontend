import { useCallback, useContext } from "react";
import { pageSizeControllerStoreContext } from "../common/PageSizeController";
import { useStore } from "zustand";
import { Carousel } from "@material-tailwind/react";
import { TeamPost } from "@/models/team.models";
import TodayPopularPost from "./TodayPopularPost";


interface ITodayPopularPostsListControllerProps {
  posts: TeamPost[];
}

export default function TodayPopularPostsListController(
  { posts }: ITodayPopularPostsListControllerProps
) {
  const store = useContext(pageSizeControllerStoreContext);
  const { pageWidth } = useStore(store);

  // divide the posts into lists of 3
  const dividePosts = useCallback((posts: TeamPost[]) => {
    const postsLists = [];
    if (pageWidth < 768) {
      for (let i = 0; i < posts.length; i += 1) {
        postsLists.push(posts.slice(i, i + 1));
      }
    } else {
      for (let i = 0; i < posts.length; i += 2) {
        postsLists.push(posts.slice(i, i + 2));
      }
    }

    return postsLists;
  }, [pageWidth]);

  const className = pageWidth < 768 ? "grid grid-cols-1" : "grid grid-cols-2";

  return (
    <Carousel 
      placeholder={undefined} 
      onPointerEnterCapture={undefined} 
      onPointerLeaveCapture={undefined}
      className="mt-[16px] w-full"
      navigation={({ setActiveIndex, activeIndex, length }) => {
        if (length === 1) return null;
        if (activeIndex >= length) setActiveIndex(0);

        return (
          <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
            {new Array(length).fill("").map((_, i) => (
              <span
                key={i}
                className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                  activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                }`}
                onClick={() => setActiveIndex(i)}
              />
            ))}
          </div>
        )
      }}
    >
      {dividePosts(posts).map((postsList, index) => (
        <div key={index} className={"gap-[16px] mx-auto " + className}>
          {postsList.map((post) => (
            <TodayPopularPost 
              key={post.id}
              post={post}
            />
          ))}
        </div>
      ))}
    </Carousel>
  );
}