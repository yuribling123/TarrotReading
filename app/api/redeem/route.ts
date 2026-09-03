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

    const normalizedCode = code.trim().toUpperCase();

    // 获取兑换码剩余次数
    const remaining = await redis.hget<number>(
      "code",
      normalizedCode
    );

    if (!remaining || remaining <= 0) {
      return Response.json(
        { success: false, message: "兑换码无效" },
        { status: 400 }
      );
    }

    if (remaining === 1) {
      // 最后一次，用完后删除
      await redis.hdel("code", normalizedCode);
    } else {
      // 剩余次数 -1
      await redis.hincrby("code", normalizedCode, -1);
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