import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const [result]: any = await pool.query(
            `DELETE FROM Student WHERE stuID = ?`,
            [id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json(
                { success: false, error: "No student found with that ID" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, res: "Student Deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while deleting Student" }, { status: 500 });
    }
}