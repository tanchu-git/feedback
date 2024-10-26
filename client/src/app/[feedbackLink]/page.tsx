"use client";

import { useGetFeedbackLinkQuery } from "@/state/api";
import { FeedbackView } from "../framerVariant";

export default function Page({ params }: { params: { feedbackLink: string } }) {    
    return (
        <div className="">
            <FeedbackView feedbackLink={params.feedbackLink} />  
        </div>
    )
}