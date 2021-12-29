import { computed, ref } from "vue";
import axios from "axios";

const user = ref(null);
const authenticated = ref(false);

export default function useAuth() {

    const signIn = async (email, password) => {
        await axios.get(import.meta.env.VITE_APP_CSRF_URL);
        await axios.post(
            import.meta.env.VITE_APP_LOGIN_URL,
            {email, password}
        );
        await setUser();
    };

    const signOut = async () => {
        await axios.post(
            import.meta.env.VITE_APP_LOGOUT_URL,
            {},
            {
                withCredentials: true
            }
        );
        await setUser();
    };

    const setUser = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/user`);
            authenticated.value = true;
            user.value = resp.data;
        } catch (e) {
            authenticated.value = false;
            user.value = null;
        }
    };

    const userName = computed(() => {
        const name =  user.value?.name;

        return name
            ? name[0].toUpperCase() + name.substring(1)
            : '';
    });

    const domainName = computed(() => {
        const name =  user.value?.domain?.name;
        return name ?? '';
    });

    return {
        authenticated,
        domainName,
        setUser,
        signIn,
        signOut,
        user,
        userName
    }
}