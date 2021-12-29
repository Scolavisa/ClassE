import { ref } from "vue";
import axios from "axios";

const user = ref(null);
const authenticated = ref(false);

export default function useAuth() {

    const signIn = async (email, password) => {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        await axios.post(
            'http://localhost:8000/login',
            {email, password},
            {
                withCredentials: true
            }
        );
        await setUser();
    };

    const signOut = async () => {
        await axios.post(
            'http://localhost:8000/logout',
            {},
            {
                withCredentials: true
            }
        );
        await setUser();
    };

    const setUser = async () => {
        try {
            const resp = await axios.get('http://localhost:8000/api/user', {
                withCredentials: true
            });
            authenticated.value = true;
            user.value = resp.data;
        } catch (e) {
            authenticated.value = false;
            user.value = null;
        }
    };

    return {
        authenticated,
        setUser,
        signIn,
        signOut,
        user
    }
}