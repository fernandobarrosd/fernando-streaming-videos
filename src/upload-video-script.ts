import { onAuthStateChanged } from "firebase/auth";
import { firebase } from "./lib/firebase";
import { getInputsFromForm, getTextAreasFromForm } from "./utils/get-inputs-from-form";
import { database } from "./database";
import { Timestamp } from "firebase/firestore";
import { ElementOrNull } from "./types/ElementOrNull";
import { setElementVisibility } from "./utils/visibility-utils";
import { createPreviewVideoItem } from "./crete-video-item";
import { getMessageFromCode } from "./utils/get-message-from-code";
import { FirebaseError } from "firebase/app";
import { setButtonDisabled } from "./utils/disable-button";

onAuthStateChanged(firebase.auth, user => {
    if (!user) {
        document.querySelector("#create-video")?.remove();
        return;
    }
    
    if (user) {
        const $videosList = document.querySelector("#videos-list");
        const $viewVideoPreviewModalWrapper = document.querySelector(".view-video-preview-modal-wrapper")
        const $viewVideoPreviewForm = document.querySelector("#view-preview-video-form");
        const $uploadVideoContainer = document.querySelector("#upload-video-container");
        const $createVideoElement = createVideoElement();
        
        const $videoPreviewTitle = 
        document.querySelector("#video-title-preview") as ElementOrNull<HTMLTextAreaElement>;
        const $videoPreview = 
        document.querySelector("#video-preview") as ElementOrNull<HTMLImageElement>;

        const $previewVideoModalWrapper = document.querySelector(".video-preview-modal-wrapper");

        const $btnPostVideo = 
        document.querySelector("#btn-post-video") as ElementOrNull<HTMLButtonElement>;



        function showVideoPreview(videoTitle: string, videoImageSrc: string,
            handlePost: () => void) {
                setElementVisibility($previewVideoModalWrapper, true);
                setElementVisibility($viewVideoPreviewModalWrapper, false);
                $videoPreviewTitle!.value = videoTitle;
                $videoPreview!.src = videoImageSrc;

                $uploadVideoContainer?.addEventListener("click", handlePost);
            
        }

        function createVideoElement() {
            const $createVideoElement = document.createElement("li");
            $createVideoElement.setAttribute("id", "create-video");
            $createVideoElement.setAttribute("class", "video-item");
            $createVideoElement.insertAdjacentHTML("beforeend", `
                <i class="bi bi-plus"></i>
            `)
        
            return $createVideoElement;
        }

        function handleSubmitVideoPreviewForm(e: Event) {
            e.preventDefault();
            const target = e.target as HTMLFormElement;
            const [ videoImage, video ] = getInputsFromForm(target);
            const [ videoTitle ] = getTextAreasFromForm(target);

            const videoImageFileReader = new FileReader();

            videoImageFileReader.readAsDataURL(videoImage.files![0]);

            videoImageFileReader.onload = ({ target }) => {
                if (target?.result) {
                    const result = target.result;
                    showVideoPreview(
                        videoTitle.value, 
                        result.toString(), 
                        async () => {
                            try {
                                const videoCreated = await database.createVideo({
                                    title: videoTitle.value,
                                    imageFile: videoImage.files![0],
                                    videoFile: video.files![0],
                                    createdAt: Timestamp.fromDate(new Date())
                                });
                                setButtonDisabled($btnPostVideo, true);
                                alert("Video postado");
                                const { id } = videoCreated;
                                const $videoItem = createPreviewVideoItem(id, result.toString());
                                $videosList?.appendChild($videoItem);
                                setElementVisibility($previewVideoModalWrapper, false);
                            }
                            catch (e) {
                                if (e instanceof FirebaseError) {
                                    const message = getMessageFromCode(e.code);
                                    console.log(message);
                                }
                            }
                            finally {
                                setButtonDisabled($btnPostVideo, false);
                            }
                            
                        }
                        
                    )
                };
            }
        }



        $createVideoElement.addEventListener("click", () => {
            setElementVisibility($viewVideoPreviewModalWrapper, true);
        });
            
        $viewVideoPreviewForm?.addEventListener("submit", handleSubmitVideoPreviewForm);
        $videosList?.appendChild($createVideoElement);        
    }
});