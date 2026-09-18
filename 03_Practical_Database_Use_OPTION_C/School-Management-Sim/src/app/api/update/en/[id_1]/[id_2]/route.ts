import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id_1: string; id_2: string }> }
) {
    try {
        const { id_1, id_2 } = await params;
        const { enrollDate, grade } = await request.json();

        const [result]: any = await pool.query(
            `UPDATE Enrollment SET enrollDate = ?, grade = ? WHERE stuID = ? AND subjectID = ?`,
            [enrollDate, grade, id_1, id_2]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "Enrollment not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, res: "Enrollment Updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while updating ENROLLMENT" }, { status: 500 });
    }
}