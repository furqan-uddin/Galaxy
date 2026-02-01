import { authenticate } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    // 1. Authenticate user
    const auth = await authenticate(req);
    if (auth.error) {
      return NextResponse.json(
        { message: auth.error },
        { status: auth.status }
      );
    }

    // 2. Read form data
    const formData = await req.formData();
    const file = formData.get("image");

    if (!file) {
      return NextResponse.json(
        { message: "No file uploaded" },
        { status: 400 }
      );
    }

    // 3. Validate type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only image files are allowed" },
        { status: 400 }
      );
    }

    // 4. Validate size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Image must be less than 2MB" },
        { status: 400 }
      );
    }

    // 5. Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 6. Upload to Cloudinary
    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "galaxy-assignment/profile-images",
          },
          (error, result) => {
            if (error) reject(error);
            resolve(result);
          }
        )
        .end(buffer);
    });

    // 7. Save image URL in DB
    await prisma.user.update({
      where: { id: auth.user.id },
      data: {
        profileImage: uploadResult.secure_url,
      },
    });

    await prisma.activityLog.create({
      data: {
        userId: auth.user.id,
        action: "UPDATED_PROFILE_IMAGE",
      },
    });

    return NextResponse.json({
      message: "Profile image uploaded successfully",
      image: uploadResult.secure_url,
    });
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    return NextResponse.json(
      { message: "Upload failed" },
      { status: 500 }
    );
  }
}
