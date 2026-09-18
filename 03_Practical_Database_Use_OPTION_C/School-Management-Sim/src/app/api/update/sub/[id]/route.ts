import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { subjectName, credits } = await request.json();

        const [result]: any = await pool.query(
            `UPDATE AvaliableSubjects SET subjectName = ?, credits = ? WHERE subjectID = ?`,
            [subjectName, credits, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "Subject not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, res: "Subject Updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while updating SUBJECT" }, { status: 500 });
    }
}