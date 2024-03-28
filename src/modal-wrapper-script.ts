import { setElementVisibility } from "./utils/visibility-utils";

const $modalWrappers = document.querySelectorAll(".modal-wrapper");


$modalWrappers.forEach($modalWrapper => {
    $modalWrapper.addEventListener("click", e => {
        const target = e.target as HTMLDivElement;

        if (target.classList.contains("modal-wrapper")) {
            setElementVisibility($modalWrapper, false);
        }
    });
});