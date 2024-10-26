import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create endpoints for the backend
export interface User {
    userId?: number;
    cognitoId?: number;
    username?: string;
}

export interface Business {
    id: number;
    ownerId: number;
    name: string;
    street: string;
    postcode: number;
    city: string;
    placeId?: string;
    feedbackLink?: string;
    ratingLimit?: number;

    user?: User
}

// Create API to call the backend front the frontend
export const api = createApi({
    // Grab the URL in .env 
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL}),
    reducerPath: "api",
    tagTypes: ["Business"],
    // Redux query
    endpoints: (build) => ({        
        getFeedbackLink: build.query<Business[], {feedbackLink: string}>({
            // append to URL
            query: ({feedbackLink}) => `feedback?feedbackLink=${feedbackLink}`,
            providesTags: (result) => 
                result 
                    ? result.map(({id}) => ({type: "Business" as const, id})) 
                    : [{type: "Business" as const}]
        }),
    })
})

export const {
    useGetFeedbackLinkQuery
} = api;