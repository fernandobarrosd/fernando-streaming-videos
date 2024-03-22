import { FirebaseError } from "firebase/app";
import { database } from "./database";
import { ElementOrNull } from "./types/ElementOrNull";

export function showLoginModal() {
    $loginModalWrapper?.setAttribute("id", "visible");
}


const $loginModalWrapper = 
document.querySelector(".login-modal-wrapper") as ElementOrNull<HTMLDivElement>;

const $loginForm = 
$loginModalWrapper?.querySelector("#login-form") as ElementOrNull<HTMLFormElement>

const $btnLogin = 
document.querySelector("#header-btn-login-logout") as ElementOrNull<HTMLButtonElement>

if ($btnLogin) {
    $btnLogin.onclick = showLoginModal
}

$loginForm?.addEventListener("submit", async e => {
    e.preventDefault();
    if (e.target instanceof HTMLFormElement) {
        const [ email, password ] = Array.from(e.target.elements)
        .filter(element => element instanceof HTMLInputElement) as HTMLInputElement[];

        try {
            const credentials = await database.authenticate(email.value, password.value);

            $loginModalWrapper?.setAttribute("id", "");
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.code === "auth/network-request-failed") {
                    console.error("Internet error");
                }
                console.error("Error");
            }
        }
        
    }
   
});