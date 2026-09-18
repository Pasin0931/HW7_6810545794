import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function GET(request: Request) {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM Student`);

        const formatted = rows.map((row: any) => ({
            ...row,
            createdAt: row.createdAt instanceof Date
                ? row.createdAt.toISOString().split('T')[0]
                : row.createdAt,
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while reading Student" }, { status: 500 });
    }
}