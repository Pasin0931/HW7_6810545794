import { NextResponse } from "next/server";
import pool from "@/lib/db"

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const choice_ = searchParams.get("choice");

        let rows: any = null

        if (choice_ === "1") {
            [rows] = await pool.query(`
                select s.sName, s.sGPAX, s.curriculum, s.sStatus, sch.schOrganization
                from School sch join Student s on s.schID = sch.schID
                where s.curriculum = 'math-science' and sch.schOrganization = 'government';`
            );
        }
        else if (choice_ === "2") {
            [rows] = await pool.query(`
                select sch.schName, count(t.tID) as Total_Teachers
                from School sch join Teacher t on sch.schID = t.schID
                group by sch.schID;
            `);
        }
        else if (choice_ === "3") {
            [rows] = await pool.query(`
                select ava.subjectName, ava.credits, count(en.stuID) as Total_Studnets_Enrolled
                from AvaliableSubjects ava join Enrollment en on ava.subjectID = en.subjectID
                group by ava.subjectID
                having count(en.stuID) >= 2
                order by ava.credits DESC;
            `);
        }
        else if (choice_ === "4") {
            [rows] = await pool.query(`
                select s.sName, s.sGPAX, (select round(avg(s.sGPAX), 2) from Student s) as AVG_GPAX from Student s
                where s.sGPAX >= (select avg(s.sGPAX) from Student s);
            `);
        }
        else if (choice_ === "5") {
            [rows] = await pool.query(`
                select ava.subjectName, avg(en.grade) as AVG_GRADE, count(en.stuID) as TOTAL_STUDENTS
                from AvaliableSubjects ava join Enrollment en on ava.subjectID = en.subjectID
                group by en.subjectID;
            `);
        }
        else {
            [rows] = await pool.query(`
                select s.sName, s.sGPAX, s.curriculum, s.sStatus, sch.schOrganization
                from School sch join Student s on s.schID = sch.schID
                where s.curriculum = 'math-science' and sch.schOrganization = 'government';
            `);
        }

        return NextResponse.json({ success: true, data: rows });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Error while reading AvaliableSubjects" }, { status: 500 });
    }
}