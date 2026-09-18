import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function POST(request: Request) {
    try {
        const { subjectID, subjectName, credits } = await request.json();

        const [result] = await pool.query(
            `INSERT INTO AvaliableSubjects (subjectID, subjectName, credits) VALUES (?, ?, ?)`,
            [subjectID, subjectName, credits]
        );

        return NextResponse.json({ success: true, res: "Subject Added" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while creating new SUBJECT" }, { status: 500 });
    }
}