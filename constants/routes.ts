export const ROUTES = {
    HOME: "/",
    SIGN_IN: "/sign-in",
    SIGN_UP: "/sign-up",
    ASK_QUESTION: "/ask-question",
    PROFILE: (_id: string) => `/profile/${_id}`,
    QUESTION: (_id: string) => `/question/${_id}`,
    TAGS: (_id: string) => `/tags/${_id}`,
};