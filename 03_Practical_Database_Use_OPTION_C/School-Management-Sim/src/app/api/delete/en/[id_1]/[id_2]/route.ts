import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id_1: string; id_2: string }> }
) {
    try {
        const { id_1, id_2 } = await params;

        const [result] = await pool.query(
            `DELETE FROM Enrollment WHERE stuID = ? AND subjectID = ?`,
            [id_1, id_2]
        );

        return NextResponse.json({ success: true, res: "Enrollment Deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while deleting ENROLLMENT" }, { status: 500 });
    }
}