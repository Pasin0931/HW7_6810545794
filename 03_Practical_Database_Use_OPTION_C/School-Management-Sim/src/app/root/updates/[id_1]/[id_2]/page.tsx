"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function UpdateEnrollmentPage() {
    const param = useParams()
    const router = useRouter()

    const id_1 = param.id_1 as string
    const id_2 = param.id_2 as string

    const [enrollDate, setEnrollDate] = useState("")
    const [grade, setGrade] = useState("")

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchEnrollment() {
            try {
                const res = await fetch(`/api/read/en?stuID=${id_1}&subjectID=${id_2}`)
                const { data } = await res.json()

                if (data?.[0]) {
                    const e = data[0]
                    setEnrollDate(e.enrollDate ?? "")
                    setGrade(e.grade?.toString() ?? "")
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        fetchEnrollment()
    }, [id_1, id_2])

    const handleUpdate = async () => {
        if (!confirm("Update ?")) return

        if (enrollDate.trim() === "" || grade.trim() === "") {
            alert("All form must be filled !")
            return
        }

        try {
            const res = await fetch(`/api/update/en/${id_1}/${id_2}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    enrollDate,
                    grade: Number(grade),
                }),
            })

            if (!res.ok) {
                alert("Error while updating ENROLLMENT")
                return
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
                <h2 className="font-bold text-lg">Update Enrollment: {id_1} / {id_2}</h2>

                <div className="flex flex-col gap-2 pb-3">
                    <Label>Enroll Date</Label>
                    <Input type="date" lang="en-US" value={enrollDate} onChange={(e) => setEnrollDate(e.target.value)} />
                </div>
                <div className="flex flex-col gap-2 pb-3">
                    <Label>Grade</Label>
                    <Input type="number" value={grade} onChange={(e) => setGrade(e.target.value)} />
                </div>

                <Button onClick={handleUpdate}>Update</Button>
            </Card>
        </div>
    )
}