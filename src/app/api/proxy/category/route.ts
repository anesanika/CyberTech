import db from "@/app/req/axios"; // Your Axios instance
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data } = await db.get("/store/category");
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.error();
  }
}
