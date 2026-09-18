"use client"

import { useState, useEffect } from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import { Trash, Edit } from "lucide-react"
import { useRouter } from "next/navigation"

type School = {
    schID: string;
    schName: string;
    schStatus: 'operating' | 'closed';
    schOrganization: 'private' | 'government';
    schRegister: string;
};

type Student = {
    stuID: string;
    schID: string;
    sName: string;
    sStatus: 'undergraduate' | 'graduated';
    sGPAX: number | null;
    curriculum: string | null;
    createdAt: string;
};

type Teacher = {
    tID: string;
    schID: string;
    tName: string;
    curriculum: string | null;
    tStatus: 'station' | 'outoffservice';
    createdAt: string;
};

type AvailableSubjects = {
    subjectID: string;
    subjectName: string;
    credits: number;
};

type Enrollment = {
    stuID: string;
    subjectID: string;
    enrollDate: string;
    grade: number | null;
};

type EntityType = "student" | "teacher" | "school" | "subject" | "enrollment"

export default function DashboardPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [schools, setSchools] = useState<School[]>([])
    const [teachers, setTeachers] = useState<Teacher[]>([])
    const [subjects, setSubjects] = useState<AvailableSubjects[]>([])
    const [enrollments, setEnrollments] = useState<Enrollment[]>([])

    const [sel, setSel] = useState<EntityType>("student")

    const router = useRouter()

    useEffect(() => {
        async function fetchData() {
            try {
                const [sRes, tRes, schRes, subjRes, enrRes] = await Promise.all([
                    fetch("/api/read/s"),
                    fetch("/api/read/t"),
                    fetch("/api/read/sch"),
                    fetch("/api/read/sub"),
                    fetch("/api/read/en"),
                ]);

                const sData = await sRes.json();
                const tData = await tRes.json();
                const schData = await schRes.json();
                const subjData = await subjRes.json();
                const enrData = await enrRes.json();

                setStudents(sData.data ?? []);
                setTeachers(tData.data ?? []);
                setSchools(schData.data ?? []);
                setSubjects(subjData.data ?? []);
                setEnrollments(enrData.data ?? []);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const handle_delete = async (entity: EntityType, id_: string) => {
        try {
            if (!confirm("Are you sure ?")) {
                return
            }

            let tmp = "s"
            if (entity === "student") {
                tmp = "s"
            }
            else if (entity === "teacher") {
                tmp = "t"
            }
            else if (entity === "school") {
                tmp = "sch"
            }
            else if (entity === "subject") {
                tmp = "sub"
            }

            const res_ = await fetch(`/api/delete/${tmp}/${id_}`, { method: "DELETE" })

            if (!res_.ok) {
                alert(`Error while deleting -> ${id_}`)
                return
            }

            window.location.reload()
        } catch (error) {
            alert(`Error while deleting -> ${id_}`)
            console.error(error)
        }
    }
    const handle_delete_en = async (id_1: string, id_2: string) => {
        try {
            if (!confirm("Are you sure ?")) {
                return
            }

            const res_ = await fetch(`/api/delete/en/${id_1}/${id_2}`, { method: "DELETE", })

            if (!res_.ok) {
                alert(`Error while deleting -> ${id_1}, ${id_2}`)
                return
            }

            window.location.reload()
            return
        } catch (error) {
            alert(`Error while deleting -> ${id_1}, ${id_2}`)
            console.error(`Error while deleting -> ${id_1}, ${id_2}`)
        }
    }

    const handle_edit = async (entity: EntityType, id_: string) => {
        router.push(`/root/updates/${id_}?entity=${entity}`)
    }
    const handle_edit_en = async (id_1: string, id_2: string) => {
        router.push(`/root/updates/${id_1}/${id_2}?entity=enrollment`)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10 pb-10">
            <div className="flex flex-row justify-center items-center gap-6" >
                <Card className="flex flex-col justify-center items-center p-4 w-40">
                    <h2>Total Students</h2>
                    <p className="text-xl">{students.length}</p>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 w-40">
                    <h2>Total Teachers</h2>
                    <p className="text-xl">{teachers.length}</p>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 w-40">
                    <h2>Total Subjects</h2>
                    <p className="text-xl">{subjects.length}</p>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 w-40">
                    <h2>Total Schools</h2>
                    <p className="text-xl">{schools.length}</p>
                </Card>
                <Card className="flex flex-col justify-center items-center p-4 w-40">
                    <h2>Total Enrollments</h2>
                    <p className="text-xl">{enrollments.length}</p>
                </Card>
            </div>

            <div className="flex flex-col items-center justify-center w-full max-w-4xl gap-13">
                <div className="self-start justify-center w-full">
                    <h2 className="pl-7 pb-1 text-3xl">Students</h2>

                    {students.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-2">
                            None
                        </div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            {students.map((s) => (
                                <Card key={s.stuID} className="relative flex flex-col p-4 gap-1">
                                    <p><span className="font-bold">Student ID:</span> {s.stuID}</p>
                                    <p><span className="font-bold">School ID:</span> {s.schID}</p>
                                    <p><span className="font-bold">Name:</span> {s.sName}</p>
                                    <p><span className="font-bold">Status:</span> {s.sStatus}</p>
                                    <p><span className="font-bold">GPAX:</span> {s.sGPAX ?? "N/A"}</p>
                                    <p><span className="font-bold">Curriculum:</span> {s.curriculum ?? "N/A"}</p>
                                    <p><span className="font-bold">Created At:</span> {s.createdAt}</p>

                                    <div className="absolute bottom-4 right-4 flex flex-row items-center gap-2">
                                        <Button onClick={() => handle_edit("student", s.stuID)}>
                                            <Edit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => handle_delete("student", s.stuID)}>
                                            <Trash />
                                        </Button>
                                    </div>

                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="self-start justify-center w-full">
                    <h2 className="pl-7 pb-1 text-3xl">Teachers</h2>

                    {teachers.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-2">None</div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            {teachers.map((t) => (
                                <Card key={t.tID} className="relative flex flex-col p-4 gap-1">
                                    <p><span className="font-bold">Teacher ID:</span> {t.tID}</p>
                                    <p><span className="font-bold">School ID:</span> {t.schID}</p>
                                    <p><span className="font-bold">Name:</span> {t.tName}</p>
                                    <p><span className="font-bold">Curriculum:</span> {t.curriculum ?? "N/A"}</p>
                                    <p><span className="font-bold">Status:</span> {t.tStatus}</p>
                                    <p><span className="font-bold">Created At:</span> {t.createdAt}</p>

                                    <div className="absolute bottom-4 right-4 flex flex-row items-center gap-2">
                                        <Button onClick={() => handle_edit("teacher", t.tID)}>
                                            <Edit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => handle_delete("teacher", t.tID)}>
                                            <Trash />
                                        </Button>
                                    </div>

                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="self-start justify-center w-full">
                    <h2 className="pl-7 pb-1 text-3xl">Schools</h2>

                    {schools.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-2">None</div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            {schools.map((sch) => (
                                <Card key={sch.schID} className="relative flex flex-col p-4 gap-1">
                                    <p><span className="font-bold">School ID:</span> {sch.schID}</p>
                                    <p><span className="font-bold">Name:</span> {sch.schName}</p>
                                    <p><span className="font-bold">Status:</span> {sch.schStatus}</p>
                                    <p><span className="font-bold">Organization:</span> {sch.schOrganization}</p>
                                    <p><span className="font-bold">Registered:</span> {sch.schRegister}</p>

                                    <div className="absolute bottom-4 right-4 flex flex-row items-center gap-2">
                                        <Button onClick={() => handle_edit("school", sch.schID)}>
                                            <Edit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => handle_delete("school", sch.schID)}>
                                            <Trash />
                                        </Button>

                                    </div>

                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="self-start justify-center w-full">
                    <h2 className="pl-7 pb-1 text-3xl">Subjects</h2>

                    {subjects.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-2">None</div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            {subjects.map((subj) => (
                                <Card key={subj.subjectID} className="relative flex flex-col p-4 gap-1">
                                    <p><span className="font-bold">Subject ID:</span> {subj.subjectID}</p>
                                    <p><span className="font-bold">Name:</span> {subj.subjectName}</p>
                                    <p><span className="font-bold">Credits:</span> {subj.credits}</p>

                                    <div className="absolute bottom-4 right-4 flex flex-row items-center gap-2">
                                        <Button onClick={() => handle_edit("subject", subj.subjectID)}>
                                            <Edit />
                                        </Button>
                                        <Button variant="destructive" onClick={() => handle_delete("subject", subj.subjectID)}>
                                            <Trash />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                <div className="self-start justify-center w-full">
                    <h2 className="pl-7 pb-1 text-3xl">Enrollments</h2>

                    {enrollments.length === 0 ? (
                        <div className="flex flex-col items-center justify-center pt-2">None</div>
                    ) : (
                        <div className="flex flex-col gap-3 pt-2">
                            {enrollments.map((e) => (
                                <Card key={`${e.stuID}-${e.subjectID}`} className="relative flex flex-col p-4 gap-1">
                                    <p><span className="font-bold">Student ID:</span> {e.stuID}</p>
                                    <p><span className="font-bold">Subject ID:</span> {e.subjectID}</p>
                                    <p><span className="font-bold">Enroll Date:</span> {e.enrollDate}</p>
                                    <p><span className="font-bold">Grade:</span> {e.grade ?? "N/A"}</p>

                                    <div className="absolute bottom-4 right-4 flex flex-row items-center gap-2">
                                        <Button onClick={() => {
                                            setSel("enrollment")
                                            handle_edit_en(e.stuID, e.subjectID)
                                        }}>
                                            <Edit />
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                setSel("enrollment")
                                                handle_delete_en(e.stuID, e.subjectID)
                                            }}
                                        >
                                            <Trash />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}