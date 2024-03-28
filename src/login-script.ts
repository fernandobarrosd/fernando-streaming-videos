import { FirebaseError } from "firebase/app";
import { database } from "./database";
import { ElementOrNull } from "./types/ElementOrNull";
import { getInputsFromForm } from "./utils/get-inputs-from-form";
import { setElementVisibility } from "./utils/visibility-utils";
import { setButtonDisabled } from "./utils/disable-button";
import { getMessageFromCode } from "./utils/get-message-from-code";

const $loginModalWrapper = document.querySelector(".login-modal-wrapper");

const $loginForm = 
$loginModalWrapper?.querySelector("#login-form") as ElementOrNull<HTMLFormElement>;

const $headerBtnLogin = 
document.querySelector("#header-btn-login-logout") as ElementOrNull<HTMLButtonElement>;

const $btnLogin = document.querySelector("#btn-login") as ElementOrNull<HTMLButtonElement>;

export function showLoginModal() {
    setElementVisibility($loginModalWrapper, true);
}

if ($headerBtnLogin) {
    $headerBtnLogin.onclick = showLoginModal;
}


$loginForm?.addEventListener("submit", async e => {
    e.preventDefault();
    setButtonDisabled($btnLogin, true);
    const target = e.target as HTMLFormElement;
    const [ email, password ] = getInputsFromForm(target);

    
    try {
        await database.authenticate(email.value, password.value);
        setElementVisibility($loginModalWrapper, false);
        
    } catch (e) {
        if (e instanceof FirebaseError) {
            const message = getMessageFromCode(e.code);
            console.log(message);
        }
    }
    finally {
        setButtonDisabled($btnLogin, false);
    }
});