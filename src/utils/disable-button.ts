import { ElementOrNull } from "../types/ElementOrNull";

export function setButtonDisabled(element: ElementOrNull<HTMLButtonElement>, isDisabled: boolean) {
    if (element) {
        if (isDisabled) {
            element.disabled = true;
            element.id = "disabled";
        }
        else {
            element.disabled = false;
            element.id = "";
        }
    }
    
}