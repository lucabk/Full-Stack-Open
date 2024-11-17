import { blogStatus, newReadingListEntry } from "../utils/type";
import { NextFunction, Request, Response } from 'express';
import { Membership, ReadingList } from "../models";
import { StatusCodes } from "http-status-codes";
import { newListStatusEntry } from "../utils/type";

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
            membership_id : newMembership.id
        }
    )
}


//set reading list to read
export const updateReadingList = async (req:Request<unknown, unknown,newListStatusEntry>, res:Response, _next:NextFunction) => {
    // update the reading list
    if(req.body.read){
        await ReadingList.update(
            { status: blogStatus.READ },
            {
                where: {
                    id: req.readingList.id
                }
            }
        )

        //send back the new db entry
        const readingListUpdated = await ReadingList.findByPk(
            req.readingList.id, 
            { attributes: { exclude: ['userId', 'createdAt', 'updatedAt'] }}
        )
        res.status(StatusCodes.CREATED).json({
            message : 'reading list updated!',
            readingListUpdated
        })
    }
    //exit
    else
        res.json({message:'reading list not updated!'})
}