// api/doctors/remove
import {NextRequest, NextResponse} from "next/server";
import getServerUser from "@/lib/auth-server";
import {db} from "@/configs/db";
import {doctorsTable} from "@/configs/schema";
import {and, eq} from "drizzle-orm";

export async function GET(req:NextRequest) {
    try {
        const id = await req.nextUrl.searchParams.get('id')
        const user = await getServerUser()

        if (!user) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 400})
        }

        const result = await db.select().from(doctorsTable)
            .where(eq(doctorsTable.id, id))




        return NextResponse.json({doctor:result[0]})

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error}, {status: 500})

    }
}