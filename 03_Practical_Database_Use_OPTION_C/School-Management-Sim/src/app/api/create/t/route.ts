import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function POST(request: Request) {
    try {
        const { tID, schID, tName, curriculum, tStatus, createdAt } = await request.json();

        const [result] = await pool.query(
            `INSERT INTO Teacher (tID, schID, tName, curriculum, tStatus, createdAt) VALUES (?, ?, ?, ?, ?, ?)`,
            [tID, schID, tName, curriculum, tStatus, createdAt]
        );

        return NextResponse.json({ success: true, res: "Teacher Added" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while creating new TEACHER" }, { status: 500 });
    }
}