import connectDB from "@/config/db";
import { getAuth } from "@clerk/nextjs/server";
import User from "@/models/User";
import { NextResponse } from "next/server";
import { err } from "inngest/types";

export async function GET(request) {
    try {
        const {userId} = getAuth(request)
        await connectDB()
        const user = await User.findById(userId)

        if (!user) {
            return NextResponse.json({ success: false, message: "User not found" }) 
        }

        return NextResponse.json({ success: true, userData: user })
    } catch (error) {
            return NextResponse.json({ success: false, message: error.message }) 

    }
}