import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: NextRequest){
    const {threadId, runId} = await req.json();

    if(!threadId || !runId){
        return NextResponse.json({error: "ID is required", success: false}, {status: 400})
    }
  
    try {
        
        const openai = new OpenAI()

        const run = openai.beta.threads.retrieve(threadId, runId);
        console.log("from opeinai run", run);

        return NextResponse.json({run, success: true}, {status:200})

    } catch (error) {

        console.log(error)
        return NextResponse.json({error: "Something went wrong", success: false}, {status: 500})
        
    }
}