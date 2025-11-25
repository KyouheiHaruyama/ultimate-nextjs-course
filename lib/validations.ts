import { z } from "zod";

export const SignInSchema = z.object({
    email: z
        .email({ message: "Please provide a valid email address" })
        .min(1, { message: "Email is required" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password cannot exceed 100 characters." })
});

export const SignUpSchema = z.object({
    username: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password cannot exceed 100 characters." })
        .regex(/^[a-zA-Z0-9_]+$/, {
            message: "Username can only contain letters, numbers, and underscores.",
        }),
    name: z
        .string()
        .min(1, { message: "Name is required." })
        .max(50, { message: "Name cannot exceed 50 characters." })
        .regex(/^[a-zA-Z\s]+$/, {
            message: "Name can only contain letters and spaces.",
        }),

    email: z
        .email({ message: "Please provide a valid email address." })
        .min(1, { message: "Email is required." }),

    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password cannot exceed 100 characters." })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Password must contain at least one special character.",
        }),
});

export const AskQuestionSchema = z.object({
    title: z
        .string()
        .min(5, { message: "Title is required." })
        .max(100, { message: "Title cannot exceed 100 characters." }),
    content: z
        .string()
        .min(1, { message: "Description is required." }),
    tags: z.array(
        z.string()
            .min(1, { message: "Tag is required." })
            .max(30, { message: "Tag cannot exceed 30 characters." })
            .regex(/^[a-zA-Z\s]+$/, {
                message: "Tag can only contain letters and spaces.",
            })
    )
    .min(1, { message: "At least one tag is required." })
    .max(3, { message: "You can only add up to 3 tags." })
});

export const UserSchema = z.object({
    name: z
        .string({error: (iss) => iss.input === undefined ? "Name is required" : "Name is invalid"})
        .min(1, { message: "Name is required" }),
    username: z
        .string({error: (iss) => iss.input === undefined ? "Username is required" : "Username is invalid"})
        .min(3, { message: "Username must be at least 3 characters long." }),
    email: z.email({ message: "Please provide a valid email address." }),
    bio: z.string().optional(),
    image: z.url({ message: "Please provide a valid URL." }).optional(),
    location: z.string().optional(),
    portfolio: z.url({ message: "Please provide a valid URL." }).optional(),
    reputation: z.number().optional(),
});

export const AccountSchema = z.object({
    userId: z
        .string({ error: (iss) => iss.input === undefined ? "UserId is required" : "UserId is invalid" })
        .min(1, { message: "UserId is required." }),
    name: z
        .string({ error: (iss) => iss.input === undefined ? "Name is required" : "Name is invalid" })
        .min(1, { message: "Name is required." }),
    image: z.url({ message: "Please provide a valid URL." }).optional(),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters long." })
        .max(100, { message: "Password cannot exceed 100 characters." })
        .regex(/[A-Z]/, {
            message: "Password must contain at least one uppercase letter.",
        })
        .regex(/[a-z]/, {
            message: "Password must contain at least one lowercase letter.",
        })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^a-zA-Z0-9]/, {
            message: "Password must contain at least one special character.",
        })
        .optional(),
    provider: z
        .string({ error: (iss) => iss.input === undefined ? "Provider is required" : "Provider is invalid" })
        .min(1, { message: "Provider is required." }),
    providerAccountId: z
        .string({ error: (iss) => iss.input === undefined ? "Provider account ID is required" : "Provider account ID is invalid" })
        .min(1, { message: "Provider account ID is required." }),
});

export const SignInWithOAuthSchema = z.object({
    provider: z.enum(["google", "github"]),
    providerAccountId: z.string().min(1, { message: "Provider account ID is required." }),
    user: z.object({
        name: z.string().min(1, { message: "Name is required." }),
        username: z.string().min(3, { message: "Username must be at least 3 characters long." }),
        email: z.email({ message: "Please provide a valid email address." }),
        image: z.url({ message: "Invalid image URL" }).optional(),
    })
});

export const EditQuestionSchema = AskQuestionSchema.extend({
    questionId: z.string().min(1, { message: "Question ID is required." })
});

export const GetQuestionSchema = z.object({
    questionId: z.string().min(1, { message: "Question ID is required." })
});