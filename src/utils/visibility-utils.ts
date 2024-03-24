export function setElementVisibility(modal: Element | null, visibility: boolean) {
    if (visibility) {
        modal?.setAttribute("id", "visible");
    }
    else {
        modal?.setAttribute("id", "");
    }
    return;
}