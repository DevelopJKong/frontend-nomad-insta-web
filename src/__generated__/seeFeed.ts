/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: seeFeed
// ====================================================

export interface seeFeed_seeFeed_photos_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_photos {
  __typename: "Photo";
  id: number;
  user: seeFeed_seeFeed_photos_user | null;
  file: string;
  caption: string | null;
  likes: number | null;
  comments: number | null;
  createdAt: any | null;
  isMine: boolean | null;
  isLiked: boolean | null;
}

export interface seeFeed_seeFeed {
  __typename: "SeeFeedOutput";
  photos: seeFeed_seeFeed_photos[] | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed;
}