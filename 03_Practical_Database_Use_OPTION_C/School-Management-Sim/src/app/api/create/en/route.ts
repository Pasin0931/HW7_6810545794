import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function POST(request: Request) {
    try {
        const { stuID, subjectID, enrollDate, grade } = await request.json();

        const [result] = await pool.query(
            `INSERT INTO Enrollment (stuID, subjectID, enrollDate, grade) VALUES (?, ?, ?, ?)`,
            [stuID, subjectID, enrollDate, grade]
        );

        return NextResponse.json({ success: true, res: "Enrollment Added" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while creating new ENROLLMENT" }, { status: 500 });
    }
}