import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { schName, schStatus, schOrganization, schRegister } = await request.json();

        const [result]: any = await pool.query(
            `UPDATE School SET schName = ?, schStatus = ?, schOrganization = ?, schRegister = ? WHERE schID = ?`,
            [schName, schStatus, schOrganization, schRegister, id]
        );

        if (result.affectedRows === 0) {
            return NextResponse.json({ success: false, error: "School not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, res: "School Updated" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while updating SCHOOL" }, { status: 500 });
    }
}