import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// API request to db
const prisma = new PrismaClient();

export const getFeedbackLink = async (
    req: Request,
    res: Response
): Promise<void> => {
    // Get data relevant to the ownerId
    const {feedbackLink} = req.query;
    
    try {
        // Call PRISMA
        const business = await prisma.business.findMany({
            where: {
                feedbackLink: feedbackLink as string
            }
        });
        res.json(business);
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving businesses: ${error.message}`});
    }
}

export const createFeedback = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {businessId, rating, name, email, tags, message, date, placeId, read} = req.body;
    try {
        // Create new data in the business schema
        const newFeedback = await prisma.feedback.create({
            data: { 
                businessId, 
                rating, 
                name, 
                email,
                tags,
                message,
                date,
                placeId,
                read
            }
        });
        res.status(201).json(newFeedback);
    } catch (error: any) {
        res.status(500).json({message: `Error submitting feedback: ${error.message}`});
    }
}