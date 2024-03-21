import { addDoc, collection, doc, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { firebase } from "./lib/firebase";
import { Video } from "./types/Video";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConverter } from "./utils/firestore-converter";
import { VideoWithID } from "./types/VideoWithID";

export const database = {
    collections: {
        videosCollection: collection(firebase.firestore, "videos").
        withConverter(firebaseConverter<Video>())
    },

    async createVideo(video: Video) {
        const videosCollection = this.collections.videosCollection;
        await addDoc(videosCollection, video);
    },

    async findAllVideos() : Promise<VideoWithID[]> {
        const videosCollection = this.collections.videosCollection;
        const videosQuery = query(videosCollection, orderBy("createdAt", "asc"));
        const videos = await getDocs(videosQuery);
        return videos.docs.map(videoDoc => {
            return {
                ...videoDoc.data(),
                id: videoDoc.id,
            }
        });
    },

    async findVideoByID(id: string) : Promise<VideoWithID> {
        const videoDoc = doc(firebase.firestore, `videos/${id}`);
        const videoSnapshot = await getDoc(videoDoc);
        const videoData = videoSnapshot.data() as Video;
        return {
            id: videoSnapshot.id,
            ...videoData
        }
    },

    async authenticate(email: string, password: string) {
        const auth = firebase.auth;
        try {
            const credentials = await signInWithEmailAndPassword(auth, email, password);
            return credentials;
        }
        catch(e) {
            throw e;
        }
    },

    async logout() {
        const auth = firebase.auth;
        await signOut(auth);
    }
};