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
