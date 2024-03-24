export function getInputsFromForm(form: HTMLFormElement) {
    return Array
        .from(form.elements)
        .filter(element => {
            return element instanceof HTMLInputElement}) as HTMLInputElement[];
}

export function getTextAreasFromForm(form: HTMLFormElement) {
    return Array
    .from(form.elements)
    .filter(element => {
        return element instanceof HTMLTextAreaElement}) as HTMLTextAreaElement[];
}