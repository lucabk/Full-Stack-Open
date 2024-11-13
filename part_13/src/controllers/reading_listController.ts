import { newReadingListEntry } from "../utils/type";
import { NextFunction, Request, Response } from 'express';
import { Membership, ReadingList } from "../models";
import { StatusCodes } from "http-status-codes";


//add a blog to reading list
export const addToReadingList = async (req:Request<unknown, unknown, newReadingListEntry>, res:Response, _next:NextFunction) => {
    
    //create new reading list entry 
    const readingList = await ReadingList.create({ userId: req.body.userId })
    console.log('readingList created with id:', readingList.id)
    
    //create new membership
    const newMembership = await Membership.create(
        { 
            readingListId : readingList.id, 
            blogId : req.body.blogId 
        }
    )
    console.log('Membership created with id:', newMembership.id)

    //response
    res.status(StatusCodes.CREATED).json(
        {
            message : 'blog added to reading list',
            membershipId : newMembership.id
        }
    )
}
