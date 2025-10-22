import handleError from "@/lib/handlers/error";
import {APIErrorResponse} from "@/types/global";
import {AccountSchema} from "@/lib/validations";
import {NotFoundError, ValidationError} from "@/lib/http-errors";
import Account from "@/database/models/account.models";
import {NextResponse} from "next/server";


// email でのUser情報取得は、email が個人情報のため、POSTを使用する
export async function POST(request: Request) {
    const { providerAccountId } = await request.json();

    try {
        // 成功した場合は解析されたデータを含む結果オブジェクトを、失敗した場合はエラーオブジェクトを返します。
        // これは予測可能性が低いデータを扱う場合に最適で、検証の問題を適切に処理できる
        const validatedData = AccountSchema.partial().safeParse({ providerAccountId });
        if (!validatedData.success) throw new ValidationError(validatedData.error.flatten().fieldErrors);

        const account = await Account.findOne({ providerAccountId });
        if (!account) throw new NotFoundError("Account");

        return NextResponse.json({ success: true, data: account }, { status: 200 });

    } catch (error) {
        return handleError(error, 'api') as APIErrorResponse;
    }
}