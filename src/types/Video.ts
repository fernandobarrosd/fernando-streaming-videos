import { Timestamp } from "firebase/firestore"

export type Video = {
    title: string
    description: string
    imageURL: string
    videoURL: string
    createdAt: Timestamp
}