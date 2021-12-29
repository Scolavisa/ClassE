import { onMounted, ref } from "vue";
import useAuth from "@/composables/UseAuth";
import axios from "axios";

const { user } = useAuth();
const myDay = ref([]);
export default function useCalendar() {

    onMounted(async () => {
        await getMyDay();
    })

    const getMyDay = async () => {
        if (user.value?.id) {
            try {
                const resp = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/myDay`);
                myDay.value = resp.data;
            } catch (e) {
                myDay.value = [];
            }
        }
    };

    return {
        myDay
    }
}