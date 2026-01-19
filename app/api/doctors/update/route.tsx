// api/doctors/update/route.ts
import { NextRequest, NextResponse } from "next/server";
import getServerUser from "@/lib/auth-server";
import { db } from "@/configs/db";
import { doctorsTable } from "@/configs/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest) {
    try {
        const user = await getServerUser();
        if (!user) {
            return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
        }

        const { id, data } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "DOCTOR_ID_MISSING" }, { status: 400 });
        }

        await db
            .update(doctorsTable)
            .set({
                name: data.name,
                email: data.email,
                phone: data.phone,
                speciality: data.speciality,
                gender: data.gender,
                isActive: data.isActive,
                imageUrl: data.imageUrl ?? null,
                bio: data.bio,

            })
            .where(eq(doctorsTable.id, id));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "UPDATE_DOCTOR_FAILED" },
            { status: 500 }
        );
    }
}
