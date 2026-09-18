import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function GET(request: Request) {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM Enrollment`);

        const formatted = rows.map((row: any) => ({
            ...row,
            enrollDate: row.enrollDate instanceof Date
                ? row.enrollDate.toISOString().split('T')[0]
                : row.enrollDate,
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while reading Enrollment" }, { status: 500 });
    }
}