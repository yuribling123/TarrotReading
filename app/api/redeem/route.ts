import { redis } from "@/lib/redis/redis";
//检查redis里存好的兑换码
export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return Response.json(
        { success: false, message: "请输入兑换码" },
        { status: 400 }
      );
    }

    const savedCode = await redis.get<string>("code");

    if (
      !savedCode ||
      code.trim().toUpperCase() !== savedCode.toUpperCase()
    ) {
      return Response.json(
        { success: false, message: "兑换码无效" },
        { status: 400 }
      );
    }

    return Response.json({
      success: true,
    });
  } catch (error) {
    console.error("Redeem error:", error);
    return Response.json(
      { success: false, message: "兑换失败" },
      { status: 500 }
    );
  }
}