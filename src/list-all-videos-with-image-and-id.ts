import { createPreviewVideoItem } from "./crete-video-item";
import { database } from "./database";
import { setElementVisibility } from "./utils/visibility-utils";

const $videosList = document.querySelector("#videos-list");
const $loadingElement = document.querySelector(".loading");

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