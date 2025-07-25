import s3 from "@/lib/s3_config";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const referenceNumber = searchParams.get("reference_number");
    const formData = await req.formData();
    const files = formData.getAll("files");

    console.log(files);

    const filesUrls: {
      name: string;
      key: string;
    }[] = [];

    for (const file of files) {
      if (file instanceof File) {
 const timestamp = new Date()
          .toISOString()
          .replace(/[-:T]/g, "")
          .split(".")[0]; // "20250712T132412" => "20250712T132412"
        const fileExtension = file.name.split('.').pop(); // e.g., 'mp4'
        const baseName = file.name.replace(/\.[^/.]+$/, ""); // remove extension

        const fileName = `accidents/videos/${referenceNumber}/${baseName}_${timestamp}.${fileExtension}`;

        const body = Buffer.from(await file.arrayBuffer());

        const command = new PutObjectCommand({
          Bucket: process.env.BUCKET_NAME,
          Key: fileName,
          Body: body,
          ContentType: file.type,
        });
        const data = await s3.send(command);

        console.log("File uploaded successfully:");

        // const fileUrl = `https://${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com/${fileName}`;
        filesUrls.push({
          name: file.name,
          key: fileName,
        });
      } else {
        console.log(`no files found, skipping....`);
      }
    }

    return NextResponse.json({
      status: 200,
      data: filesUrls,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: "Internel server error" });
  }
}
