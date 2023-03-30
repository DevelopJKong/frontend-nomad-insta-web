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

export interface seeFeed_seeFeed_photos_comments_user {
  __typename: "User";
  username: string;
  avatar: string | null;
}

export interface seeFeed_seeFeed_photos_comments {
  __typename: "Comment";
  id: number;
  user: seeFeed_seeFeed_photos_comments_user | null;
  payload: string;
  isMine: boolean;
  createdAt: any | null;
}

export interface seeFeed_seeFeed_photos {
  __typename: "Photo";
  user: seeFeed_seeFeed_photos_user | null;
  caption: string | null;
  createdAt: any | null;
  isMine: boolean | null;
  comments: seeFeed_seeFeed_photos_comments[] | null;
}

export interface seeFeed_seeFeed {
  __typename: "SeeFeedOutput";
  photos: seeFeed_seeFeed_photos[] | null;
}

export interface seeFeed {
  seeFeed: seeFeed_seeFeed;
}
