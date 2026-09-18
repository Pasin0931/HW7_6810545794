import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function POST(request: Request) {
    try {
        const { schID, schName, schStatus, schOrganization, schRegister } = await request.json();

        const [result] = await pool.query(
            `INSERT INTO School (schID, schName, schStatus, schOrganization, schRegister) VALUES (?, ?, ?, ?, ?)`,
            [schID, schName, schStatus, schOrganization, schRegister]
        );

        return NextResponse.json({ success: true, res: "School Added" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while creating new SCHOOL" }, { status: 500 });
    }
}