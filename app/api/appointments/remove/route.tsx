import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import {appointmentsTable, doctorsTable,} from "@/configs/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
    try {
        const id = await req.nextUrl.searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: "APPOINTMENT_ID_MISSING" },
                { status: 400 }
            );
        }


        await db
            .delete(appointmentsTable)
            .where(eq(appointmentsTable.id, id));





        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "DELETE_APPOINTMENT_FAILED" },
            { status: 500 }
        );
    }
}