import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import {
    doctorsTable,
    appointmentsTable,
    doctorRatingsTable,
} from "@/configs/schema";
import { eq, and } from "drizzle-orm";
import getServerUser from "@/lib/auth-server";

export async function POST(req: NextRequest) {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { doctorId, rating } = await req.json();

        if (!doctorId || rating < 1 || rating > 5) {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        // ✔ был ли приём
        const visit = await db
            .select()
            .from(appointmentsTable)
            .where(
                and(
                    eq(appointmentsTable.doctorId, doctorId),
                    eq(appointmentsTable.userEmail, user.email)
                )
            );

        if (visit.length === 0) {
            return NextResponse.json(
                { error: "No appointment with this doctor" },
                { status: 403 }
            );
        }
        const alreadyRated = await db
            .select()
            .from(doctorRatingsTable)
            .where(
                and(
                    eq(doctorRatingsTable.doctorId, doctorId),
                    eq(doctorRatingsTable.userEmail, user.email)
                )
            );

        if (alreadyRated.length > 0) {
            console.log('already rated!')
            return NextResponse.json(
                { error: "Вы уже оценили этого врача" },
                { status: 400 }
            );
        }

        await db.insert(doctorRatingsTable).values({
            doctorId,
            userEmail: user.email,
            rating,
        });



        const ratings = await db
            .select({ rating: doctorRatingsTable.rating })
            .from(doctorRatingsTable)
            .where(eq(doctorRatingsTable.doctorId, doctorId));

        const avg =
            ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length;

        await db
            .update(doctorsTable)
            .set({ rating: Math.round(avg) })
            .where(eq(doctorsTable.id, doctorId));

        return NextResponse.json({ success: true });
    } catch (e: any) {


        return NextResponse.json(
            { error: "Failed to rate doctor" },
            { status: 500 }
        );
    }
}
