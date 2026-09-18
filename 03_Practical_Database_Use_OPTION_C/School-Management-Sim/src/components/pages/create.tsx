"use client"

import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"

type EntityType = "student" | "teacher" | "school" | "subject" | "enrollment"

export default function CreatePage() {
    const [entity, setEntity] = useState<EntityType>("student")

    const [stuID, setStuID] = useState("")
    const [sName, setSName] = useState("")
    const [sStatus, setSStatus] = useState("")
    const [sGPAX, setSGPAX] = useState("")
    const [curriculum, setCurriculum] = useState("")
    const [schID, setSchID] = useState("")
    const [sCreatedAt, setSCreatedAt] = useState("2000-01-01")

    const [tID, setTID] = useState("")
    const [tName, setTName] = useState("")
    const [tCurriculum, setTCurriculum] = useState("")
    const [tStatus, setTStatus] = useState("")
    const [tSchID, setTSchID] = useState("")
    const [tCreatedAt, setTCreatedAt] = useState("2000-01-01")

    const [schoolID, setSchoolID] = useState("")
    const [schName, setSchName] = useState("")
    const [schStatus, setSchStatus] = useState("")
    const [schOrganization, setSchOrganization] = useState("")
    const [schRegister, setSchRegister] = useState("2000-01-01")

    const [subjID, setSubjID] = useState("")
    const [subjectName, setSubjectName] = useState("")
    const [credits, setCredits] = useState("")

    const [enrStuID, setEnrStuID] = useState("")
    const [enrSubjectID, setEnrSubjectID] = useState("")
    const [enrollDate, setEnrollDate] = useState("2000-01-01")
    const [grade, setGrade] = useState("")

    const handleSubmit = async () => {
        if (!confirm("Submit ?")) {
            return;
        }

        try {

            if (entity === 'student') {
                if (stuID.trim() === "" || sName.trim() === "" || sStatus.trim() === "" || sGPAX.trim() === "" || curriculum.trim() === "" || schID.trim() === "" || sCreatedAt.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch("/api/create/s", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        stuID: stuID,
                        schID: schID,
                        sName: sName,
                        sStatus: sStatus,
                        sGPAX: Number(sGPAX),
                        curriculum: curriculum,
                        createdAt: sCreatedAt,
                    }),
                });

                if (!res.ok) {
                    alert(`Error while creating STUDENT`)
                }
                else {
                    setStuID("")
                    setSName("")
                    setSStatus("")
                    setSGPAX("")
                    setCurriculum("")
                    setSchID("")
                    setSCreatedAt("2000-01-01")
                }

                return
            }

            else if (entity === 'teacher') {
                if (tID.trim() === "" || tName.trim() === "" || tCurriculum.trim() === "" || tStatus.trim() === "" || tSchID.trim() === "" || tCreatedAt.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch("/api/create/t", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tID: tID,
                        schID: tSchID,
                        tName: tName,
                        curriculum: tCurriculum,
                        tStatus: tStatus,
                        createdAt: tCreatedAt,
                    }),
                });

                if (!res.ok) {
                    alert(`Error while creating TEACHER`)
                }
                else {
                    setTID("")
                    setTName("")
                    setTCurriculum("")
                    setTStatus("")
                    setTSchID("")
                    setTCreatedAt("2000-01-01")
                }

                return
            }

            else if (entity === 'school') {
                if (schoolID.trim() === "" || schName.trim() === "" || schStatus.trim() === "" || schOrganization.trim() === "" || schRegister.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch("/api/create/sch", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        schID: schoolID,
                        schName: schName,
                        schStatus: schStatus,
                        schOrganization: schOrganization,
                        schRegister: schRegister,
                    }),
                });

                if (!res.ok) {
                    alert(`Error while creating SCHOOL`)
                }
                else {
                    setSchoolID("")
                    setSchName("")
                    setSchStatus("")
                    setSchOrganization("")
                    setSchRegister("2000-01-01")
                }

                return
            }

            else if (entity === 'subject') {
                if (subjID.trim() === "" || subjectName.trim() === "" || credits.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch("/api/create/sub", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        subjectID: subjID,
                        subjectName: subjectName,
                        credits: credits,
                    }),
                });

                if (!res.ok) {
                    alert(`Error while creating SUBJECT`)
                }
                else {
                    setSubjID("")
                    setSubjectName("")
                    setCredits("")
                }

                return
            }

            else if (entity === 'enrollment') {
                if (enrStuID.trim() === "" || enrSubjectID.trim() === "" || enrollDate.trim() === "" || grade.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch("/api/create/en", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        stuID: enrStuID,
                        subjectID: enrSubjectID,
                        enrollDate: enrollDate,
                        grade: Number(grade),
                    }),
                });

                if (!res.ok) {
                    alert(`Error while creating ENROLLMENT`)
                }
                else {
                    setEnrStuID("")
                    setEnrSubjectID("")
                    setEnrollDate("")
                    setGrade("")
                }

                return
            }

        } catch (error) {
            alert('Error while creating');
            console.error(error);
            return
        }
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Card className="flex flex-col gap-5 w-xl p-8">
                <div className="flex flex-col gap-2">
                    <Label>Entity Type</Label>
                    <Select value={entity} onValueChange={(v) => setEntity(v as EntityType)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select entity" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="student">student</SelectItem>
                            <SelectItem value="teacher">teacher</SelectItem>
                            <SelectItem value="school">school</SelectItem>
                            <SelectItem value="subject">subject</SelectItem>
                            <SelectItem value="enrollment">enrollment</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {entity === "student" && (
                    <div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Student ID</Label>
                            <Input type="number" value={stuID} onChange={(e) => setStuID(e.target.value)} placeholder="Student ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Name</Label>
                            <Input value={sName} onChange={(e) => setSName(e.target.value)} placeholder="Student name" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Status</Label>
                            <Input value={sStatus} onChange={(e) => setSStatus(e.target.value)} placeholder="undergraduate / graduated" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>GPAX</Label>
                            <Input type="number" step="0.01" value={sGPAX} onChange={(e) => setSGPAX(e.target.value)} placeholder="0.00 - 4.00" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Curriculum</Label>
                            <Input value={curriculum} onChange={(e) => setCurriculum(e.target.value)} placeholder="e.g. math-science" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>School ID</Label>
                            <Input type="number" value={schID} onChange={(e) => setSchID(e.target.value)} placeholder="School ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Created At</Label>
                            <Input type="date" lang="en-US" value={sCreatedAt} onChange={(e) => setSCreatedAt(e.target.value)} />
                        </div>
                    </div>
                )}

                {entity === "teacher" && (
                    <div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Teacher ID</Label>
                            <Input type="number" value={tID} onChange={(e) => setTID(e.target.value)} placeholder="Teacher ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Name</Label>
                            <Input value={tName} onChange={(e) => setTName(e.target.value)} placeholder="Teacher name" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Curriculum</Label>
                            <Input value={tCurriculum} onChange={(e) => setTCurriculum(e.target.value)} placeholder="e.g. math-science" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Status</Label>
                            <Input value={tStatus} onChange={(e) => setTStatus(e.target.value)} placeholder="station / outoffservice" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>School ID</Label>
                            <Input type="number" value={tSchID} onChange={(e) => setTSchID(e.target.value)} placeholder="School ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Created At</Label>
                            <Input type="date" lang="en-US" value={tCreatedAt} onChange={(e) => setTCreatedAt(e.target.value)} />
                        </div>
                    </div>
                )}

                {entity === "school" && (
                    <div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>School ID</Label>
                            <Input type="number" value={schoolID} onChange={(e) => setSchoolID(e.target.value)} placeholder="School ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Name</Label>
                            <Input value={schName} onChange={(e) => setSchName(e.target.value)} placeholder="School name" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Status</Label>
                            <Input value={schStatus} onChange={(e) => setSchStatus(e.target.value)} placeholder="operating / closed" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Organization</Label>
                            <Input value={schOrganization} onChange={(e) => setSchOrganization(e.target.value)} placeholder="private / government" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Register Date</Label>
                            <Input type="date" lang="en-US" value={schRegister} onChange={(e) => setSchRegister(e.target.value)} />
                        </div>
                    </div>
                )}

                {entity === "subject" && (
                    <div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Subject ID</Label>
                            <Input type="number" value={subjID} onChange={(e) => setSubjID(e.target.value)} placeholder="Subject ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Subject Name</Label>
                            <Input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} placeholder="e.g. math" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Credits</Label>
                            <Input type="number" value={credits} onChange={(e) => setCredits(e.target.value)} placeholder="e.g. 3" />
                        </div>
                    </div>
                )}

                {entity === "enrollment" && (
                    <div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Student ID</Label>
                            <Input type="number" value={enrStuID} onChange={(e) => setEnrStuID(e.target.value)} placeholder="Student ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Subject ID</Label>
                            <Input type="number" value={enrSubjectID} onChange={(e) => setEnrSubjectID(e.target.value)} placeholder="Subject ID" />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Enroll Date</Label>
                            <Input type="date" lang="en-US" value={enrollDate} onChange={(e) => setEnrollDate(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Grade</Label>
                            <Input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} placeholder="0 - 4" />
                        </div>
                    </div>
                )}

                <Button onClick={handleSubmit}>Create</Button>
            </Card>
        </div>
    )
}