import { FirebaseError } from "firebase/app";
import { database } from "./database";
import { ElementOrNull } from "./types/ElementOrNull";
import { getInputsFromForm } from "./utils/get-inputs-from-form";
import { setElementVisibility } from "./utils/visibility-utils";

const $loginModalWrapper = document.querySelector(".login-modal-wrapper");

const $loginForm = 
$loginModalWrapper?.querySelector("#login-form") as ElementOrNull<HTMLFormElement>;

const $btnLogin = 
document.querySelector("#header-btn-login-logout") as ElementOrNull<HTMLButtonElement>;

export function showLoginModal() {
    setElementVisibility($loginModalWrapper, true);
}

if ($btnLogin) {
    $btnLogin.onclick = showLoginModal;
}


function getMessageFromCode(code: string) {
    const errors = {
        "auth/network-request-failed": "Internet error",
        "auth/invalid-credential": "Invalid email or password",
        "auth/missing-password": "Password is invalid",
        "auth/invalid-email": "E-mail is invalid"
    };
    type Message = keyof typeof errors;

    const message = errors[code as Message] || "Error";
    return message;
}

$loginForm?.addEventListener("submit", async e => {
    e.preventDefault();
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
});