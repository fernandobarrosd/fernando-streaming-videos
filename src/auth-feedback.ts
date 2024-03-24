import { onAuthStateChanged } from "firebase/auth";
import { ElementOrNull } from "./types/ElementOrNull";
import { firebase } from "./lib/firebase";
import { database } from "./database";
import { showLoginModal } from "./login-script";
import { setElementVisibility } from "./utils/visibility-utils";

const $btnLoginLogout = 
document.querySelector("#header-btn-login-logout") as ElementOrNull<HTMLButtonElement>;
const $confirmationModalWrapper = document.querySelector(".logout-confirmation-modal-wrapper");


function handleLogout() {
    setElementVisibility($confirmationModalWrapper, true);

    $confirmationModalWrapper?.addEventListener("click", ({ target }) => {
        if (target instanceof HTMLButtonElement) {
            if (target.id === "btn-yes") {
                database.logout();
            }
            setElementVisibility($confirmationModalWrapper, false);
        }

    });
}


onAuthStateChanged(firebase.auth, user => {
    if ($btnLoginLogout) {
        if (user) {
            $btnLoginLogout.textContent = "Logout";
            $btnLoginLogout.onclick = handleLogout
        }
        else {
            $btnLoginLogout.textContent = "Sign In";
            $btnLoginLogout.onclick = showLoginModal
        }

    }
    
});