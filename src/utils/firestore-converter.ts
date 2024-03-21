import { QueryDocumentSnapshot } from "firebase/firestore";
import { Video } from "../types/Video";

export function firebaseConverter<T>() {
    return {
        toFirestore: (data: T) => data,
        fromFirestore: (snap: QueryDocumentSnapshot) => snap.data() as Video
    }
}