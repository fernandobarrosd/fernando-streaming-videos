import { database } from "./database";
import { ElementOrNull } from "./types/ElementOrNull";
import { setElementVisibility } from "./utils/visibility-utils";

export function createPreviewVideoItem(id: string, imageURL: string) {
    const $videoItem = document.createElement("li");
    const $videoModalWrapper = document.querySelector(".video-modal-wrapper");
    const $videoTitle = document.querySelector(".video-title");
    const $videoPlayer = 
    document.querySelector(".video-player") as ElementOrNull<HTMLVideoElement>;

    const $videoDate = document.querySelector(".video-date")

    
    $videoItem.setAttribute("class", "video-item");
    $videoItem.setAttribute("data-id", id);
    $videoItem.style.backgroundImage = `url(${imageURL})`;
    $videoItem.insertAdjacentHTML("afterbegin", `
        <i class="bi bi-play-fill"></i>
    `)

    $videoItem.addEventListener("click", async () => {
        const videoID = $videoItem.dataset.id;
        if (videoID && $videoTitle && $videoPlayer && $videoDate) {
            const { title, imageURL, videoURL, createdAt }= 
            await database.findVideoByID(videoID);

            const dateFormatted = createdAt.toDate().toLocaleDateString("pt-br");
            
            $videoTitle.textContent = title;
            $videoPlayer.poster = imageURL;
            $videoPlayer.src = videoURL;
            $videoDate.textContent = `Published date: ${dateFormatted}`;
            setElementVisibility($videoModalWrapper, true);
        }
        
    })

    return $videoItem;
}