import { addDoc, collection, doc, getDoc, getDocs, orderBy, query, serverTimestamp,
 } from "firebase/firestore";
import { firebase } from "./lib/firebase";
import { FirestoreVideo, VideoInput } from "./types/Video";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { firebaseConverter } from "./utils/firestore-converter";
import { VideoWithID } from "./types/VideoWithID";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function getExtFromFileName(fileName: string) {
    return fileName.substring(fileName.indexOf("."));
}

export const database = {
    collections: {
        videosCollection: collection(firebase.firestore, "videos")
        .withConverter(firebaseConverter<FirestoreVideo>())
    },

    async createVideo(videoInput: VideoInput) {
        const videosCollection = this.collections.videosCollection;

        const videoImageFile = videoInput.imageFile;
        const videoFile = videoInput.videoFile;
        
        const imageExt = getExtFromFileName(videoImageFile.name);
        const videoExt = getExtFromFileName(videoFile.name);


        const videoID = crypto.randomUUID();
        const imageRef = ref(firebase.storage, `videos/video-${videoID}/image.${imageExt}`);
        const videoRef = ref(firebase.storage, `videos/video-${videoID}/video.${videoExt}`);

        const result = await uploadBytes(imageRef, videoImageFile);
        const result2 = await uploadBytes(videoRef, videoFile);

        const videoImageFileURL = await getDownloadURL(result.ref);
        const videoFileURL = await getDownloadURL(result2.ref);

        const videoDoc = await addDoc(videosCollection, {
            title: videoInput.title,
            createdAt: videoInput.createdAt,
            imageURL: videoImageFileURL,
            videoURL: videoFileURL
        });
        return videoDoc;
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

    async findVideosImagesAndID() {
        const videos = await this.findAllVideos();
        return videos.map(({ id, imageURL }) => ({
            id,
            imageURL
        }));
    },

    /* async findVideoByID(id: string) : Promise<VideoWithID> {
        const videoDoc = doc(firebase.firestore, `videos/${id}`);
        const videoSnapshot = await getDoc(videoDoc);
        const videoData = videoSnapshot.data() as VideoOutput;
        return {
            id: videoSnapshot.id,
            ...videoData
        }
    }, */

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