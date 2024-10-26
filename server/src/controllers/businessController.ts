import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

// API request to db
const prisma = new PrismaClient();

export const getBusiness = async (
    req: Request,
    res: Response
): Promise<void> => {
    // Get data relevant to the ownerId
    const {ownerId} = req.query;
    
    try {
        // Call PRISMA
        const business = await prisma.business.findMany({
            where: {
                ownerId: Number(ownerId)
            },
            include: {
                User: true
            }
        });
        res.json(business);
    } catch (error: any) {
        res.status(500).json({message: `Error retrieving businesses: ${error.message}`});
    }
}

export const createBusiness = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {ownerId, name, street, postcode, city, placeId, feedbackLink} = req.body;
    try {
        // Create new data in the business schema
        const newBusiness = await prisma.business.create({
            data: {
                ownerId, 
                name, 
                street, 
                postcode, 
                city, 
                placeId,
                feedbackLink,
            }
        });
        res.status(201).json(newBusiness);
    } catch (error: any) {
        res.status(500).json({message: `Error creating a business: ${error.message}`});
    }
}