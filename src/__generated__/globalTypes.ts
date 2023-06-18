/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface CreateCommentInput {
  payload: string;
  photoId: number;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface DeleteCommentInput {
  id: number;
}

export interface FollowUserInput {
  username: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface SeeFeedInput {
  page: number;
}

export interface SeeProfileInput {
  username: string;
}

export interface ToggleLikeInput {
  id: number;
}

export interface UnFollowUserInput {
  username: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
