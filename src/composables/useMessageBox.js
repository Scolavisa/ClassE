import { computed, onMounted, ref } from "vue";
import useAuth from "@/composables/UseAuth";
import axios from "axios";

const { user } = useAuth();
const inbox = ref([]);

export default function useMessageBox() {
    onMounted(async () => {
        await getMyInbox();
    });

    const getMyInbox = async () => {
        if (user.value?.id) {
            try {
                console.log(`getting messages for inbox`);
                const resp = await axios.get(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/myinbox`,
                    {
                        withCredentials: true
                    }
                );
                inbox.value = resp.data.data;
            } catch (e) {
                inbox.value = [];
            }
        }
    }

    const unreadMessages = computed(() => {
        return inbox.value.filter(item => item.read_at == null);
    });

    const countUnreadMessages = computed(() => unreadMessages.value.length);

    return {
        countUnreadMessages,
        inbox,
        unreadMessages
    };
}