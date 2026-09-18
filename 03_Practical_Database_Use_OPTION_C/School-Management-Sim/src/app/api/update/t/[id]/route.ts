import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { schID, tName, curriculum, tStatus, createdAt } = await request.json();

        const [result]: any = await pool.query(
            `UPDATE Teacher SET schID = ?, tName = ?, curriculum = ?, tStatus = ?, createdAt = ? WHERE tID = ?`,
            [schID, tName, curriculum, tStatus, createdAt, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "Teacher not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, res: "Teacher Updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while updating TEACHER" }, { status: 500 });
    }
}