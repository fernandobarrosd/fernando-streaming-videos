import { database } from "./database";
import { setElementVisibility } from "./utils/visibility-utils";

const $videosList = document.querySelector("#videos-list");
const $loadingElement = document.querySelector(".loading");

export function createPreviewVideoItem(id: string, imageURL: string) {
    const $videoItem = document.createElement("li");
    $videoItem.setAttribute("class", "video-item");
    $videoItem.setAttribute("data-id", id);
    $videoItem.style.backgroundImage = `url(${imageURL})`;
    $videoItem.insertAdjacentHTML("afterbegin", `
        <i class="bi bi-play-fill"></i>
    `)

    return $videoItem;
}

async function renderVideos() {
    const videos = await database.findVideosImagesAndID();
    videos.forEach(({ id, imageURL }) => {
        const $videoItem = createPreviewVideoItem(id, imageURL);
        console.log(id, imageURL);
        $videosList?.appendChild($videoItem);
    });

}

window.addEventListener("load", async () => {
    setElementVisibility($loadingElement, true);
    try {
        await renderVideos();
    }
    catch(e) {

    }
    finally {
        setElementVisibility($loadingElement, false);
    }
});