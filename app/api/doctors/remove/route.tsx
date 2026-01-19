import { NextRequest, NextResponse } from "next/server";
import { db } from "@/configs/db";
import {doctorsTable,} from "@/configs/schema";
import { and, eq } from "drizzle-orm";

export async function DELETE(req: NextRequest) {
    try {
        const id = await req.nextUrl.searchParams.get('id')

        if (!id) {
            return NextResponse.json(
                { error: "DOCTOR_ID_MISSING" },
                { status: 400 }
            );
        }


        await db
            .delete(doctorsTable)
            .where(eq(doctorsTable.id, id));





        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "DELETE_PROJECT_FAILED" },
            { status: 500 }
        );
    }
}