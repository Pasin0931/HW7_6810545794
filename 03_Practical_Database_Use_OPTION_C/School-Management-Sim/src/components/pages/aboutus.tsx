import { Card } from "@/components/ui/card"

export default function AboutUsPage() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 text-center">
            <Card className="px-10 flex flex-col gap-4">
                <h1 className="text-2xl font-bold">User Guide</h1>

                <div className="flex flex-col items-center justify-center gap-2">
                    <ol className="list-decimal list-inside text-gray-600 flex flex-col gap-1 self-start">
                        <li>Create a <span className="font-bold text-red-500">School</span> first, every Student and Teacher must belong to one.</li>
                        <li>Add <span className="font-bold text-red-500">Students</span> and <span className="font-bold text-red-500">Teachers</span>, using an existing School ID.</li>
                        <li>Create <span className="font-bold text-red-500">Subjects</span> that students can enroll in.</li>
                        <li>Add <span className="font-bold text-red-500">Enrollments</span> by linking an existing Student ID with an existing Subject ID.</li>
                        <li>View, edit, or delete any record from the <span className="font-bold text-red-500">Dashboard</span> page.</li>
                    </ol>
                </div>
            </Card>

            <Card className="px-14">
                <h1 className="text-2xl font-bold">About This Project</h1>
                <p className="max-w-md text-gray-600">
                    School Management Simulation is a Database assignment (HW7) demonstrating
                    the full database development process from business rules and UML design
                    to a normalized MySQL schema and a working Next.js application.
                </p>
                <p className="text-sm text-gray-500">Developed by</p>
                <h2 className="text-lg font-bold text-gray-500">Pasin Makcharoen 6810545794</h2>
            </Card>
        </div>
    )
}