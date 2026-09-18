import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function GET(request: Request) {
    try {
        const [rows]: any = await pool.query(`SELECT * FROM School`);

        const formatted = rows.map((row: any) => ({
            ...row,
            schRegister: row.schRegister instanceof Date
                ? row.schRegister.toISOString().split('T')[0]
                : row.schRegister,
        }));

        return NextResponse.json({ success: true, data: formatted });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while reading SCHOOL" }, { status: 500 });
    }
}