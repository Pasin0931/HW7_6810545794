import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { schID, sName, sStatus, sGPAX, curriculum, createdAt } = await request.json();

        const [result]: any = await pool.query(
            `UPDATE Student SET schID = ?, sName = ?, sStatus = ?, sGPAX = ?, curriculum = ?, createdAt = ? WHERE stuID = ?`,
            [schID, sName, sStatus, sGPAX, curriculum, createdAt, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "Student not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, res: "Student Updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while updating STUDENT" }, { status: 500 });
    }
}