import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    req: NextRequest,
    {params}:{params : {courseId :string ; chapterId :string}}
){
try{
    const {userId} = await auth()
    const {isPublished,...values} = await req.json()
    if(!userId){
        return new NextResponse("Unauthorized", {status:401})
    }

    const courseOwner = await db.course.findUnique({
        where:{
            id:params.courseId,
            userId
        }
    })

    

    if(!courseOwner){
        return new NextResponse("Unauthorized", {status:401})
    }

    const chapter = await db.chapter.update({
        where:{
            id:params.chapterId,
            courseId:params.courseId
        },
        data:{
            ...values ,
        }
    });
    //TODO : Handle Video upload

    return NextResponse.json(chapter)



}catch(error){
    console.log("[CHAPTER_ID]",error)
    return new NextResponse("Internal Error",{status:500})
}

}