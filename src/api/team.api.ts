import { 
  ConferenceStandings, 
  Team, 
  TeamFranchiseHistory, 
  TeamWithLikes,
  TeamPost, 
  TeamPostComment, 
  TeamPostCommentLikes, 
  TeamPostStatus, 
  TTeamLikesResult,
  TeamPostCommentStatus,
  TeamPostCommentReply
} from "@/models/team.models";
import { httpClient } from "./http";
import { Game } from "@/models/game.models";
import { IPaginationResult } from "@/models/common.models";


export const getAllTeams = async () => {
  const response = await httpClient.get<Team[]>(`/api/teams/`);
  return response.data as Team[];
}

export const getMyFavoriteTeams = async () => {
  const response = await httpClient.get<Team[]>(`/api/users/me/favorite-teams/`);
  return response.data as Team[];
}

export const getUserFavoriteTeams = async (userId: number) => {
  const response = await httpClient.get<Team[]>(`/api/users/${userId}/favorite-teams/`);
  return response.data as Team[];
}

export const updateUserFavoriteTeams = async (teams: Team[]) => {
  const teamIds : {id: string, favorite?: boolean}[] = [];
  for (let i = 0; i < teams.length; i++) {
    teamIds.push({id: teams[i].id});
    if (teams[i].favorite) {
      teamIds[i].favorite = true;
    }
  };

  const response = await httpClient.put<typeof teamIds>(`/api/users/me/favorite-teams/`, teamIds);
  return response.data;
}

export const addUserFavoriteTeam = async (teamId: string) => {
  const response = await httpClient.post<TTeamLikesResult>(`/api/users/me/favorite-teams/${teamId}/`);
  return response.data as TTeamLikesResult;
}

export const removeUserFavoriteTeam = async (teamId: string) => {
  const response = await httpClient.delete<TTeamLikesResult>(`/api/users/me/favorite-teams/${teamId}/`);
  return response.data as TTeamLikesResult;
}

export const getPopularPosts = async () => {
  const response = await httpClient.get<IPaginationResult<TeamPost>>(`/api/teams/posts/popular/`);
  return response.data as IPaginationResult<TeamPost>;
}

export const getTeamPopularPosts = async (teamId: string) => {
  const response = await httpClient.get<TeamPost[]>(`/api/teams/${teamId}/posts/popular/`);
  return response.data as TeamPost[];
}

export const getTeamGeneralInfo = async (teamId: string) => {
  const response = await httpClient.get<TeamWithLikes>(`/api/teams/${teamId}/`);
  return response.data as TeamWithLikes;
}

export const getTeamFranchiseHistory = async (teamId: string) => {
  const response = await httpClient.get<TeamFranchiseHistory>(`/api/teams/${teamId}/franchise-history/`);
  return response.data as TeamFranchiseHistory;
}

export const getTeamPosts = async (
  teamId: string, 
  page: number,
  data: {sort?: string, search?: string}
) => {
  const { sort, search } = data;
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (sort) {
    searchParams.set('sort', sort);
  }

  if (search) {
    searchParams.set('search', search);
  }

  const response = await httpClient.get<IPaginationResult<TeamPost>>(`/api/teams/${teamId}/posts/?${searchParams.toString()}`);
  return response.data as IPaginationResult<TeamPost>;
}

export const getTeamPostStatus = async () => {
  const response = await httpClient.get<TeamPostStatus[]>(`/api/teams/posts/statuses/`);
  return response.data as TeamPostStatus[];
}

export const getTeamPostCommentStatus = async () => {
  const response = await httpClient.get<TeamPostCommentStatus[]>(`/api/teams/posts/comments/statuses/`);
  return response.data as TeamPostCommentStatus[];
}

export const getTeamPostStatusForCreate = async () => {
  const response = await httpClient.get<TeamPostStatus[]>(`/api/teams/posts/statuses/for-creation/`);
  return response.data as TeamPostStatus[];
}

export const getTeamsStandings = async () => {
  const response = await httpClient.get<ConferenceStandings>(`/api/teams/standings/`);
  return response.data as ConferenceStandings;
}

export const getLast4Games = async (teamId: string) => {
  const response = await httpClient.get<Game[]>(`/api/teams/${teamId}/last-4-games/`);
  return response.data as Game[];
}

export const publishTeamPost = async (
  teamId: string, 
  title: string, 
  content: string,
  status: number
) => {
  const response = await httpClient.post<TeamPost>(`/api/teams/${teamId}/posts/`, { title, content, status });
  return response.data;
}

export const editTeamPost = async (
  teamId: string,
  postId: string,
  title: string,
  content: string,
  status: number
) => {
  const response = await httpClient.patch<TeamPost>(`/api/teams/${teamId}/posts/${postId}/`, { title, content, status });
  return response.data;
}

export const deleteTeamPost = async (teamId: string, postId: string) => {
  const response = await httpClient.delete(`/api/teams/${teamId}/posts/${postId}/`);
  return response.data;
}

export const getTeamPost = async (teamId: string, postId: string) => {
  const response = await httpClient.get<TeamPost>(`/api/teams/${teamId}/posts/${postId}/`);
  return response.data;
}

export const addTeamPostLike = async (teamId: string, postId: string) => {
  const response = await httpClient.post<TeamPostCommentLikes>(`/api/teams/${teamId}/posts/${postId}/likes/`);
  return response.data;
}

export const removeTeamPostLike = async (teamId: string, postId: string) => {
  const response = await httpClient.delete<TeamPostCommentLikes>(`/api/teams/${teamId}/posts/${postId}/likes/`);
  return response.data;
}

export const getTeamPostComments = async (
  teamId: string, 
  postId: string, 
  page: number,
  sort?: string,
) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  if (sort) {
    searchParams.set('sort', sort);
  }

  const response = await httpClient.get<IPaginationResult<TeamPostComment>>(`/api/teams/${teamId}/posts/${postId}/comments/?${searchParams.toString()}`);
  return response.data as IPaginationResult<TeamPostComment>;
}

export const publishTeamPostComment = async (
  teamId: string,
  postId: string,
  content: string
) => {
  const response = await httpClient.post(`/api/teams/${teamId}/posts/${postId}/comments/`, { content });
  return response.data;
}

export const editTeamPostComment = async (
  teamId: string,
  postId: string,
  commentId: string,
  content: string
) => {
  const response = await httpClient.put(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/`, { content });
  return response.data;
}

export const deleteTeamPostComment = async (
  teamId: string,
  postId: string,
  commentId: string
) => {
  const response = await httpClient.delete(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/`);
  return response.data;
}

export const getTeamPostComment = async (
  teamId: string,
  postId: string,
  commentId: string
) => {
  const response = await httpClient.get<TeamPostComment>(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/`);
  return response.data;
}

export const likeTeamPostComment = async (
  teamId: string,
  postId: string,
  commentId: string
) => {
  const response = await httpClient.post<TeamPostCommentLikes>(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/likes/`);
  return response.data;
}

export const unlikeTeamPostComment = async (
  teamId: string,
  postId: string,
  commentId: string
) => {
  const response = await httpClient.delete(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/likes/`);
  return response.data;
}

export const getTeamPostCommentReplies = async (
  teamId: string,
  postId: string,
  commentId: string,
  page: number
) => {
  const response = await httpClient.get<IPaginationResult<TeamPostCommentReply>>(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/replies/?page=${page}`);
  return response.data as IPaginationResult<TeamPostCommentReply>;
}

export const publishTeamPostCommentReply = async (
  teamId: string,
  postId: string,
  commentId: string,
  content: string
) => {
  const response = await httpClient.post(`/api/teams/${teamId}/posts/${postId}/comments/${commentId}/replies/`, { content });
  return response.data;
}