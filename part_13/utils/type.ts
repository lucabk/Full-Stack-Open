export enum StatusCode {
    Ok = 200,
    Created=201,
    NoContent=204,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError=500
}

export interface blogs {
    id: number,
    author: string,
    url: string,
    title: string,
    likes: number
}
