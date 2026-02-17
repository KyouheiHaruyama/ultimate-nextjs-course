import {NotFoundError, ValidationError} from "@/lib/http-errors";
import handleError from "@/lib/handlers/error";
import dbConnect from "@/lib/mongoose";
import Account from "@/database/models/account.models";
import {NextResponse} from "next/server";
import {AccountSchema} from "@/lib/validations";

// GET /api/accounts/[id]
export async function GET(_:Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) throw new NotFoundError("Account");

    try {
        await dbConnect();

        const account = await Account.findById(id);
        if (!account) throw new NotFoundError("Account");

        return NextResponse.json({ success: true, data: account }, { status: 200 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// DELETE /api/accounts/[id]
export async function DELETE(_:Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    if (!id) throw new NotFoundError("Account");

    try {
        await dbConnect();

        const deletedAccount = await Account.findByIdAndDelete(id);
        if (!deletedAccount) throw new NotFoundError("Account");

        return NextResponse.json({ success: true, data: deletedAccount }, { status: 204 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}

// PUT /api/accounts/[id]
export async function PUT(request: Request, {params}: { params: Promise<{ id: string }> }) {
    const {id} = await params;
    if (!id) throw new NotFoundError("Account");

    try {
        await dbConnect();

        const body = await request.json();
        // 検証に失敗した場合、エラーをスローします。データの構造に高い信頼性があり、潜在的なエラーを早期に検出したい場合に使用
        const validatedData = AccountSchema.partial().safeParse(body);
        if (!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors);

        const updatedAccount = await Account.findByIdAndUpdate(
            id, validatedData, { new: true }
        );

        if (!updatedAccount) throw new NotFoundError("Account");

        return NextResponse.json({ success: true, data: updatedAccount }, { status: 200 });
    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}