import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";

export const authenticate = async (req) => {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return { error: "Unauthorized", status: 401 };
    }

    const token = authHeader.split(" ")[1];

    const decoded = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profileImage: true,
        createdAt: true,
      },
    });

    if (!user) {
      return { error: "User not found", status: 401 };
    }

    return { user };
  } catch (error) {
    return { error: "Invalid or expired token", status: 401 };
  }
};
