/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ToggleLikeInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: toggleLike
// ====================================================

export interface toggleLike_toggleLike {
  __typename: "ToggleLikeOutput";
  ok: boolean;
  error: string | null;
  message: string | null;
}

export interface toggleLike {
  toggleLike: toggleLike_toggleLike;
}

export interface toggleLikeVariables {
  toggleLikeInput: ToggleLikeInput;
}
