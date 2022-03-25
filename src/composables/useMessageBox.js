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
        return inbox.value.filter(item => item.read_at == null || item.read_at === '');
    });

    const readMessages = computed(() => {
        return inbox.value.filter(item => item.read_at != null);
    });

    const countUnreadMessages = computed(() => unreadMessages.value.length);

    /**
     * Send update to backend: "message has been openend"
     * This should be a silent operation, no success or fail popup
     * @param messageId
     * @return {Promise<void>}
     */
    const messageOpened = async (messageId) => {
        if (user.value?.id && messageId != null) {
            // check if the message was already opened before, saves a request
            const theMessage = inbox.value.find(m => m.id === messageId);
            if (theMessage?.read_at == null || theMessage?.read_at === '') {
                try {
                    console.log(`update message ${messageId} in backend`);
                    const resp = await axios.put(
                        `${import.meta.env.VITE_APP_API_BASE_URL}/messageopened`,
                        {
                            messageId
                        },
                        {
                            withCredentials: true
                        }
                    );
                    console.log(resp.data?.message); // no output for this function
                } catch (e) {
                    console.log(`message ${messageId} could not be updated, ${e}`);
                }
            }
        }
    };

    return {
        countUnreadMessages,
        inbox,
        messageOpened,
        readMessages,
        unreadMessages
    };
}