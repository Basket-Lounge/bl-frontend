'use client'

import { getTeamPost, getTeamPostStatusForCreate } from "@/api/team.api";
import { useAuthStore } from "@/stores/auth.stores";
import { TeamStoreContext, useTeamStore } from "@/stores/teams.stores";
import { useSuspenseQuery } from "@tanstack/react-query";
import { notFound, useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { useStore } from "zustand";


export default function TeamEditLayout({children}: {children: React.ReactNode}) {
  const { teamId, postId } = useParams<{ teamId: string, postId: string }>();

  const {
    userId,
    isAuthenticated
  } = useAuthStore();

  // const store = useContext(TeamStoreContext);
  // const updateTitle = useStore(store, (state) => state.updatePostsEditTitle);
  // const updateContent = useStore(store, (state) => state.updatePostsEditContent);

  const {
    updatePostsEditTitle: updateTitle,
    updatePostsEditContent: updateContent
  } = useTeamStore();

  useSuspenseQuery({
    queryKey: ["team", "post-status", "create"],
    queryFn: async () => {
      return await getTeamPostStatusForCreate();
    }
  });

  const postQuery = useSuspenseQuery({
    queryKey: ["team", teamId, "posts", postId, "post"],
    queryFn: async () => {
      return await getTeamPost(teamId, postId);
    }
  });

  useEffect(() => {
    if (postQuery.data) {
      updateTitle(postQuery.data.title);
      updateContent(postQuery.data.content!);
    }
  }, [postQuery.data]);

  if (!isAuthenticated || userId !== postQuery.data?.user_data.id) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-[24px] items-stretch">
      {children}
    </div>
  )
}