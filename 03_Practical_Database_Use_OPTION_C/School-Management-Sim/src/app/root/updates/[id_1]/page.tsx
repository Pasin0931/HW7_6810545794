"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter, useSearchParams } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function UpdatePages() {
    const param = useParams()
    const router = useRouter()
    const searchParams = useSearchParams()

    const id_1 = param.id_1 as string
    const entity = searchParams.get("entity")

    const [loading, setLoading] = useState(true)

    const [sName, setSName] = useState("")
    const [sStatus, setSStatus] = useState("")
    const [sGPAX, setSGPAX] = useState("")
    const [curriculum, setCurriculum] = useState("")
    const [schID, setSchID] = useState("")
    const [sCreatedAt, setSCreatedAt] = useState("")

    const [tName, setTName] = useState("")
    const [tCurriculum, setTCurriculum] = useState("")
    const [tStatus, setTStatus] = useState("")
    const [tSchID, setTSchID] = useState("")
    const [tCreatedAt, setTCreatedAt] = useState("")

    const [schName, setSchName] = useState("")
    const [schStatus, setSchStatus] = useState("")
    const [schOrganization, setSchOrganization] = useState("")
    const [schRegister, setSchRegister] = useState("")

    const [subjectName, setSubjectName] = useState("")
    const [credits, setCredits] = useState("")

    useEffect(() => {
        async function fetchData() {
            try {
                if (entity === "student") {
                    const res = await fetch(`/api/read/s?stuID=${id_1}`)
                    const { data } = await res.json()
                    if (data?.[0]) {
                        const s = data[0]
                        setSName(s.sName ?? "")
                        setSStatus(s.sStatus ?? "")
                        setSGPAX(s.sGPAX?.toString() ?? "")
                        setCurriculum(s.curriculum ?? "")
                        setSchID(s.schID ?? "")
                        setSCreatedAt(s.createdAt ?? "")
                    }
                }
                else if (entity === "teacher") {
                    const res = await fetch(`/api/read/t?tID=${id_1}`)
                    const { data } = await res.json()
                    if (data?.[0]) {
                        const t = data[0]
                        setTName(t.tName ?? "")
                        setTCurriculum(t.curriculum ?? "")
                        setTStatus(t.tStatus ?? "")
                        setTSchID(t.schID ?? "")
                        setTCreatedAt(t.createdAt ?? "")
                    }
                }
                else if (entity === "school") {
                    const res = await fetch(`/api/read/sch?schID=${id_1}`)
                    const { data } = await res.json()
                    if (data?.[0]) {
                        const sch = data[0]
                        setSchName(sch.schName ?? "")
                        setSchStatus(sch.schStatus ?? "")
                        setSchOrganization(sch.schOrganization ?? "")
                        setSchRegister(sch.schRegister ?? "")
                    }
                }
                else if (entity === "subject") {
                    const res = await fetch(`/api/read/sub?subjectID=${id_1}`)
                    const { data } = await res.json()
                    if (data?.[0]) {
                        const subj = data[0]
                        setSubjectName(subj.subjectName ?? "")
                        setCredits(subj.credits?.toString() ?? "")
                    }
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [entity, id_1])

    const handleUpdate = async () => {
        if (!confirm("Update ?")) return

        try {
            if (entity === "student") {
                if (sName.trim() === "" || sStatus.trim() === "" || sGPAX.trim() === "" || curriculum.trim() === "" || schID.trim() === "" || sCreatedAt.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch(`/api/update/s/${id_1}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ schID, sName, sStatus, sGPAX: Number(sGPAX), curriculum, createdAt: sCreatedAt }),
                })
                if (!res.ok) { alert("Error while updating STUDENT"); return }
            }
            else if (entity === "teacher") {
                if (tName.trim() === "" || tCurriculum.trim() === "" || tStatus.trim() === "" || tSchID.trim() === "" || tCreatedAt.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch(`/api/update/t/${id_1}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ schID: tSchID, tName, curriculum: tCurriculum, tStatus, createdAt: tCreatedAt }),
                })
                if (!res.ok) { alert("Error while updating TEACHER"); return }
            }
            else if (entity === "school") {
                if (schName.trim() === "" || schStatus.trim() === "" || schOrganization.trim() === "" || schRegister.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch(`/api/update/sch/${id_1}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ schName, schStatus, schOrganization, schRegister }),
                })
                if (!res.ok) { alert("Error while updating SCHOOL"); return }
            }
            else if (entity === "subject") {
                if (subjectName.trim() === "" || credits.trim() === "") {
                    alert("All form must be filled !")
                    return
                }

                const res = await fetch(`/api/update/sub/${id_1}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ subjectName, credits: Number(credits) }),
                })
                if (!res.ok) { alert("Error while updating SUBJECT"); return }
            }

            router.push("/")
        } catch (error) {
            alert("Error while updating")
            console.error(error)
        }
    }

    if (loading) {
        return <div className="flex flex-col items-center justify-center">Loading...</div>
    }

    return (
        <div className="flex flex-col items-center justify-center gap-6">
            <Card className="flex flex-col gap-5 w-xl p-8">
                <h2 className="font-bold text-lg">Update {entity}: {id_1}</h2>

                {entity === "student" && (
                    <>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Name</Label>
                            <Input value={sName} onChange={(e) => setSName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Status</Label>
                            <Input value={sStatus} onChange={(e) => setSStatus(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>GPAX</Label>
                            <Input type="number" step="0.01" value={sGPAX} onChange={(e) => setSGPAX(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Curriculum</Label>
                            <Input value={curriculum} onChange={(e) => setCurriculum(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>School ID</Label>
                            <Input value={schID} onChange={(e) => setSchID(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Created At</Label>
                            <Input type="date" lang="en-US" value={sCreatedAt} onChange={(e) => setSCreatedAt(e.target.value)} />
                        </div>
                    </>
                )}

                {entity === "teacher" && (
                    <>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Name</Label>
                            <Input value={tName} onChange={(e) => setTName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Curriculum</Label>
                            <Input value={tCurriculum} onChange={(e) => setTCurriculum(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Status</Label>
                            <Input value={tStatus} onChange={(e) => setTStatus(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>School ID</Label>
                            <Input value={tSchID} onChange={(e) => setTSchID(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Created At</Label>
                            <Input type="date" lang="en-US" value={tCreatedAt} onChange={(e) => setTCreatedAt(e.target.value)} />
                        </div>
                    </>
                )}

                {entity === "school" && (
                    <>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Name</Label>
                            <Input value={schName} onChange={(e) => setSchName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Status</Label>
                            <Input value={schStatus} onChange={(e) => setSchStatus(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Organization</Label>
                            <Input value={schOrganization} onChange={(e) => setSchOrganization(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Register Date</Label>
                            <Input type="date" lang="en-US" value={schRegister} onChange={(e) => setSchRegister(e.target.value)} />
                        </div>
                    </>
                )}

                {entity === "subject" && (
                    <>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Subject Name</Label>
                            <Input value={subjectName} onChange={(e) => setSubjectName(e.target.value)} />
                        </div>
                        <div className="flex flex-col gap-2 pb-3">
                            <Label>Credits</Label>
                            <Input type="number" value={credits} onChange={(e) => setCredits(e.target.value)} />
                        </div>
                    </>
                )}

                <Button onClick={handleUpdate}>Update</Button>
            </Card>
        </div>
    )
}