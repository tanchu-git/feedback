"use client";

import { FeedbackView } from "../feedbackView";

export default function Page({ params }: { params: { feedbackLink: string } }) {    
    return (
        <div className="">
            <FeedbackView feedbackLink={params.feedbackLink} />  
        </div>
    )
}