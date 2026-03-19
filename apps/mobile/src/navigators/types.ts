/**
 * Root-level navigator param list.
 * Switches between Auth and Main stacks based on session state.
 */
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

/**
 * Auth stack screens.
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};

/**
 * Main bottom tab screens.
 */
export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};
