import {NotFoundError, ValidationError} from "@/lib/http-errors";
import handleError from "@/lib/handlers/error";

import dbConnect from "@/lib/mongoose";
import User from "@/database/models/user.models";
import {NextResponse} from "next/server";
import {UserSchema} from "@/lib/validations";

export async function GET(_:Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    console.log(id);
    if (!id) throw new NotFoundError("User");

    try {
        await dbConnect();

        const user = await User.findById(id);
        if (!user) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: user }, { status: 200 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// DELETE /api/users/:id
export async function DELETE(_:Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) throw new NotFoundError("User");

    try {
        await dbConnect();

        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: deletedUser }, { status: 204 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

export async function PUT(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    if (!id) throw new NotFoundError("User");

    try {
        await dbConnect();

        const body = await request.json();
        // 検証に失敗した場合、エラーをスローします。データの構造に高い信頼性があり、潜在的なエラーを早期に検出したい場合に使用
        const validatedData = UserSchema.partial().parse(body);

        const updatedUser = await User.findByIdAndUpdate(
            id,
            validatedData,
            { new: true }
        );

        if (!updatedUser) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: updatedUser }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}