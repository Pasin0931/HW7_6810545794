import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function POST(request: Request) {
    try {
        const { stuID, schID, sName, sStatus, sGPAX, curriculum, createdAt } = await request.json();

        const [result] = await pool.query(
            `INSERT INTO Student (stuID, schID, sName, sStatus, sGPAX, curriculum, createdAt) VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [stuID, schID, sName, sStatus, sGPAX, curriculum, createdAt]
        );

        return NextResponse.json({ success: true, res: "Student Added" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while creating new STUDENT" }, { status: 500 });
    }
}