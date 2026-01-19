import { NextResponse } from "next/server";
import { db } from "@/configs/db";
import { doctorsTable, appointmentsTable } from "@/configs/schema";
import { eq, sql } from "drizzle-orm";
import getServerUser from "@/lib/auth-server";

export async function GET() {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const doctors = await db
            .select({
                id: doctorsTable.id,
                name: doctorsTable.name,
                imageUrl: doctorsTable.imageUrl,
                speciality: doctorsTable.speciality,
                phone: doctorsTable.phone,
                email: doctorsTable.email,
                gender: doctorsTable.gender,
                bio: doctorsTable.bio,
                isActive: doctorsTable.isActive,
                rating: doctorsTable.rating,

                appointmentCount: sql<number>`
          count(${appointmentsTable.id})
        `,
            })
            .from(doctorsTable)
            .leftJoin(
                appointmentsTable,
                eq(appointmentsTable.doctorId, doctorsTable.id)
            )
            .groupBy(doctorsTable.id)
            .orderBy(doctorsTable.name);

        return NextResponse.json({ doctors });
    } catch (error) {
        console.error("Get doctors error:", error);
        return NextResponse.json(
            { error: "Failed to fetch doctors" },
            { status: 500 }
        );
    }
}
