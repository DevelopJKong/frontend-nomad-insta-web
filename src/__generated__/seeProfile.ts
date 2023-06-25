/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { SeeProfileInput } from "./globalTypes";

// ====================================================
// GraphQL query operation: seeProfile
// ====================================================

export interface seeProfile_seeProfile_user_photos {
  __typename: "Photo";
  id: number;
  file: string;
  likes: number | null;
  commentNumber: number | null;
  isLiked: boolean | null;
}

export interface seeProfile_seeProfile_user_following {
  __typename: "User";
  id: number;
  username: string;
}

export interface seeProfile_seeProfile_user_followers {
  __typename: "User";
  id: number;
  username: string;
}

export interface seeProfile_seeProfile_user {
  __typename: "User";
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  bio: string | null;
  avatar: string | null;
  photos: seeProfile_seeProfile_user_photos[] | null;
  totalFollowers: number | null;
  totalFollowing: number | null;
  isMe: boolean | null;
  isFollowing: boolean | null;
  following: seeProfile_seeProfile_user_following[] | null;
  followers: seeProfile_seeProfile_user_followers[] | null;
}

export interface seeProfile_seeProfile {
  __typename: "SeeProfileOutput";
  user: seeProfile_seeProfile_user;
}

export interface seeProfile {
  seeProfile: seeProfile_seeProfile;
}

export interface seeProfileVariables {
  seeProfileInput: SeeProfileInput;
}
