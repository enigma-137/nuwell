import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request){

    const {threadId} = await req.json();

    if(!threadId){
        return NextResponse.json({error: "ThreadID required", success: false}, {status: 400});

    }
    const openai = new OpenAI()

    try {
        
        const response = await openai.beta.threads.messages.list(threadId);

        console.log("from openai messages", response.data)

        return NextResponse.json({messages: response.data, success: true}, {status: 201})
    } catch (error) {

        console.log(error)
        return NextResponse.json({error: "Error occured", success: false}, {status: 500})
        
    }

}