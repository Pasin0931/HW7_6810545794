import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        const [result] = await pool.query(
            `DELETE FROM School WHERE schID = ?`,
            [id]
        );

        return NextResponse.json({ success: true, res: "School Deleted" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while deleting School" }, { status: 500 });
    }
}