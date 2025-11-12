"use server"

import { ZodSchema } from "zod/v3";
import {ZodError} from "zod";
import {UnauthorizedError, ValidationError} from "@/lib/http-errors";

import {getSession} from "next-auth/react";
import {auth} from "@/auth";
import {Session} from "next-auth";
import dbConnect from "@/lib/mongoose";

// T : どのようなデータ型が入るかを呼び出し側で指定する仕組み
//     TypeScript の Generics 要は TypeScript における型推論する仕組み
type ActionOptions<T> = {
    params?: T;
    schema?: ZodSchema<T>;
    authorize?: boolean;
}

// 1. Checking whether the schema and params are provided and validated.
// 2. Checking whether the user is authorized.
// 3. Connecting to the database.
// 4. Returning the params and session.
async function action<T>({
    params, schema, authorize = false
}: ActionOptions<T>) {
    if (schema && params) {
        try {
            schema.parse(params);
        } catch (error) {
            if (error instanceof ZodError) {
                return new ValidationError(
                    error.flatten().fieldErrors as Record<string, string[]>
                )
            } else {
                return new Error('Schema validation failed');
            }
        }
    }

    let session: Session | null = null;

    if (authorize) {
        session = await auth();

        if (!session) {
            return new UnauthorizedError();
        }
    }

    await dbConnect();

    return { params, session };
}

export default action;