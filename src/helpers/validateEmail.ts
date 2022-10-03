import { ref } from 'vue';
import type { Ref } from 'vue';

export let equalsToEmail: Ref<boolean> = ref(true);

export function verifyEmail(email: string, emailConfirmation: string) {
    if (email == emailConfirmation) {
        equalsToEmail.value = true;
    }
    else {
        equalsToEmail.value = false;
    }
}