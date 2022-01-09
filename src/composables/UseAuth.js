import { computed, ref } from "vue";
import axios from "axios";

const user = ref(null);
const authenticated = ref(false);

export default function useAuth() {

    const signIn = async (email, password) => {
        console.log("Getting cookie with axios");
        await axios.get(import.meta.env.VITE_APP_CSRF_URL, {
            withCredentials: true
        });

        console.log("Got response. Signing in with axios");
        await axios.post(
            import.meta.env.VITE_APP_LOGIN_URL,
            { email, password },
            {
                withCredentials: true
            }
        );
        console.log("testing if user is authenticated");
        await setUser();
    };

    const signOut = async () => {
        await axios.post(
            import.meta.env.VITE_APP_LOGOUT_URL,
            {},
            {
                withCredentials: true,
            }
        );
        await setUser();
    };

    /**
     * tries during a session if we have a valid user (user is logged in)
     * if not: set authenticated to false
     * the login page will show up in that case.
     * @returns {Promise<void>}
     */
    const setUser = async () => {
        try {
            const resp = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/user`, {
                withCredentials: true
            });
            authenticated.value = true;
            user.value = resp.data.data;
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