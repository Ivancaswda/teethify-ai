// api/doctors/getAll
import {NextRequest, NextResponse} from "next/server";
import getServerUser from "@/lib/auth-server";
import {db} from "@/configs/db";
import {appointmentsTable, doctorsTable} from "@/configs/schema";
import {and, desc, eq} from "drizzle-orm";

export async function GET(req:NextRequest) {
    try {

        const user = await getServerUser()

        if (!user) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 400})
        }
        console.log('user===')
        console.log(user)

        const appointments = await db
            .select({
                id: appointmentsTable.id,
                date: appointmentsTable.date,
                time: appointmentsTable.time,
                reason: appointmentsTable.reason,
                status: appointmentsTable.status,
                duration: appointmentsTable.duration,
                notes: appointmentsTable.notes,
                userEmail: appointmentsTable.userEmail,
                doctorId: doctorsTable.id,
                doctorName: doctorsTable.name,
                doctorImageUrl: doctorsTable.imageUrl,
            })
            .from(appointmentsTable)
            .innerJoin(
                doctorsTable,
                eq(appointmentsTable.doctorId, doctorsTable.id)
            )
            .where(eq(appointmentsTable.userEmail, user.email))
            .orderBy(desc(appointmentsTable.createdAt));




        return NextResponse.json({appointments:appointments})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error}, {status: 500})

    }
}