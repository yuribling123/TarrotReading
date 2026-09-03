import { redis } from "@/lib/redis/redis";

// 检查 Redis 里存好的兑换码
export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (!code) {
      return Response.json(
        { success: false, message: "请输入兑换码" },
        { status: 400 }
      );
    }

    const normalizedCode = code.trim();

    // 检查这个兑换码是否存在
    const exists = await redis.sismember("code", normalizedCode);

    if (!exists) {
      return Response.json(
        { success: false, message: "兑换码无效" },
        { status: 400 }
      );
    }

    // 兑换成功，只删除使用过的这个码
    await redis.srem("code", normalizedCode);

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