import { toast } from 'vue3-toastify';

export async function showToast(message, code) {
    switch(code) {
        case 200:
            toast.success(message)
            break
        case 400:
            toast.warning(message)
            break
        default:
            toast.error(message)
            break
    }
}