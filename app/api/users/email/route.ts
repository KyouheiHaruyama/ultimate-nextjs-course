import handleError from "@/lib/handlers/error";
import {APIErrorResponse} from "@/types/global";
import {UserSchema} from "@/lib/validations";
import {NotFoundError, ValidationError} from "@/lib/http-errors";
import User from "@/database/models/user.models";
import {NextResponse} from "next/server";


// email でのUser情報取得は、email が個人情報のため、POSTを使用する
export async function POST(request: Request) {
    const { email } = await request.json();

    try {
        // 成功した場合は解析されたデータを含む結果オブジェクトを、失敗した場合はエラーオブジェクトを返します。
        // これは予測可能性が低いデータを扱う場合に最適で、検証の問題を適切に処理できる
        const validatedData = UserSchema.partial().safeParse({ email });
        if (!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors);

        const user = await User.findOne({ email });
        if (!user) throw new NotFoundError("User");

        return NextResponse.json({ success: true, data: user }, { status: 200 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}