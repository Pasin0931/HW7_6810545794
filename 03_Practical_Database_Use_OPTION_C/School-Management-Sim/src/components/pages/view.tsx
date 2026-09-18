"use client"

import { useState, useEffect } from "react"
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

type Queries = "None" | "Query 1" | "Query 2" | "Query 3" | "Query 4" | "Query 5"

export default function ViewPage() {
    const [queryChoice, setQueryChoice] = useState<Queries>("None")

    const [query1, setQuery1] = useState([])
    const [query2, setQuery2] = useState([])
    const [query3, setQuery3] = useState([])
    const [query4, setQuery4] = useState([])
    const [query5, setQuery5] = useState([])

    const handle_query_changes = async (this_query: Queries) => {
        try {
            setQueryChoice(this_query)

            if (this_query === "Query 1") {
                const res_ = await fetch(`/api/query/?choice=1`)
                const { data } = await res_.json()
                setQuery1(data ?? [])
                setQuery2([])
                setQuery3([])
                setQuery4([])
                setQuery5([])
            }
            else if (this_query === "Query 2") {
                const res_ = await fetch(`/api/query/?choice=2`)
                const { data } = await res_.json()
                setQuery1([])
                setQuery2(data ?? [])
                setQuery3([])
                setQuery4([])
                setQuery5([])
            }
            else if (this_query === "Query 3") {
                const res_ = await fetch(`/api/query/?choice=3`)
                const { data } = await res_.json()
                setQuery1([])
                setQuery2([])
                setQuery3(data ?? [])
                setQuery4([])
                setQuery5([])
            }
            else if (this_query === "Query 4") {
                const res_ = await fetch(`/api/query/?choice=4`)
                const { data } = await res_.json()
                setQuery1([])
                setQuery2([])
                setQuery3([])
                setQuery4(data ?? [])
                setQuery5([])
            }
            else if (this_query === "Query 5") {
                const res_ = await fetch(`/api/query/?choice=5`)
                const { data } = await res_.json()
                setQuery1([])
                setQuery2([])
                setQuery3([])
                setQuery4([])
                setQuery5(data ?? [])
            }
            else {
                setQuery1([])
                setQuery2([])
                setQuery3([])
                setQuery4([])
                setQuery5([])
                return
            }
        } catch (error) {
            console.error(error)
            alert("Error while quering data !")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center pt-5">
            <div className="flex flex-col items-center justify-center gap-5 w-250">
                <div className="flex flex-col gap-2 w-full">
                    <Label>Query Type</Label>
                    <Select value={queryChoice} onValueChange={(v) => handle_query_changes(v as Queries)}>
                        <SelectTrigger className="w-40">
                            <SelectValue placeholder="Select a query" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="None">None</SelectItem>
                            <SelectItem value="Query 1">Query 1</SelectItem>
                            <SelectItem value="Query 2">Query 2</SelectItem>
                            <SelectItem value="Query 3">Query 3</SelectItem>
                            <SelectItem value="Query 4">Query 4</SelectItem>
                            <SelectItem value="Query 5">Query 5</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="w-full pb-4">
                    {queryChoice === "None" ? (
                        <div className="flex flex-col items-center justify-center text-xl">
                            <p>Select a query</p>
                        </div>
                    ) : queryChoice === "Query 1" ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Query 1: Display Government School Students in Math-Science</h1>

                            {query1.map((q1: any, i) => (
                                <Card key={i} className="p-4">
                                    <p><span className="font-bold">Name:</span> {q1.sName}</p>
                                    <p><span className="font-bold">GPAX:</span> {q1.sGPAX}</p>
                                    <p><span className="font-bold">Curriculum:</span> {q1.curriculum}</p>
                                    <p><span className="font-bold">Status:</span> {q1.sStatus}</p>
                                    <p><span className="font-bold">School Org:</span> {q1.schOrganization}</p>
                                </Card>
                            ))}
                        </div>
                    ) : queryChoice === "Query 2" ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Query 2: Display Teacher Count per School</h1>

                            {query2.map((q2: any, i) => (
                                <Card key={i} className="p-4">
                                    <p><span className="font-bold">School:</span> {q2.schName}</p>
                                    <p><span className="font-bold">Total Teachers:</span> {q2.Total_Teachers}</p>
                                </Card>
                            ))}
                        </div>
                    ) : queryChoice === "Query 3" ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Query 3: Display Subjects with 2+ Enrolled Students</h1>

                            {query3.map((q3: any, i) => (
                                <Card key={i} className="p-4">
                                    <p><span className="font-bold">Subject:</span> {q3.subjectName}</p>
                                    <p><span className="font-bold">Credits:</span> {q3.credits}</p>
                                    <p><span className="font-bold">Total Students Enrolled:</span> {q3.Total_Studnets_Enrolled}</p>
                                </Card>
                            ))}
                        </div>
                    ) : queryChoice === "Query 4" ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Query 4: Display Students Above Average GPAX</h1>

                            {query4.map((q4: any, i) => (
                                <Card key={i} className="p-4">
                                    <p><span className="font-bold">Name:</span> {q4.sName}</p>
                                    <p><span className="font-bold">GPAX:</span> {q4.sGPAX}</p>
                                    <p><span className="font-bold">Average GPAX:</span> {q4.AVG_GPAX}</p>
                                </Card>
                            ))}
                        </div>
                    ) : queryChoice === "Query 5" ? (
                        <div className="flex flex-col gap-3">
                            <h1 className="text-xl font-bold">Query 5: Display Average Grade and Enrollment per Subject</h1>

                            {query5.map((q5: any, i) => (
                                <Card key={i} className="p-4">
                                    <p><span className="font-bold">Subject:</span> {q5.subjectName}</p>
                                    <p><span className="font-bold">Average Grade:</span> {q5.AVG_GRADE}</p>
                                    <p><span className="font-bold">Total Students:</span> {q5.TOTAL_STUDENTS}</p>
                                </Card>
                            ))}
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    )
}