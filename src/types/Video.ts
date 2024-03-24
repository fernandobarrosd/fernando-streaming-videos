import { Timestamp } from "firebase/firestore";


export type FirestoreVideo = {
    title: string
    imageURL: string
    videoURL: string
    createdAt: Timestamp
}

export type VideoInput = {
    title: string
    imageFile: File
    videoFile: File
    createdAt: Timestamp
}