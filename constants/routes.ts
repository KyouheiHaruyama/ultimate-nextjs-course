export const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    ASK_QUESTION: "/ask-question",
    COLLECTION: "/collections",
    TAGS: "/tags",
    JOBS: "/jobs",
    PROFILE: (_id: string) => `/profile/${_id}`,
    QUESTION: (_id: string) => `/questions/${_id}`,
    TAG: (_id: string) => `/tags/${_id}`,
    SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};