import { onMounted, ref } from "vue";
import useAuth from "@/composables/UseAuth";
import axios from "axios";

const { user } = useAuth();
const myDay = ref([]);
const theDay = ref([]);

export default function useCalendar() {

    onMounted(async () => {
        await getMyDay();
    })

    const getEventsOfDay = async (reqDay) => {
        if (user.value?.id) {
            try {
                const resp = await axios.get(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/calendarEvents?from=${reqDay}`,{
                    withCredentials: true
                });
                theDay.value = resp.data.data;
            } catch (e) {
                theDay.value = [];
            }
        }
    };

    const getMyDay = async () => {
        if (user.value?.id) {
            try {
                const resp = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/myDay`,{
                    withCredentials: true
                });
                myDay.value = resp.data.data;
                updateCalendarColors();
                // check every minute if the colors are still correct, consider passing of time
                setInterval(updateCalendarColors, 60000);
            } catch (e) {
                myDay.value = [];
            }
        }
    };

    /**
     * check which events are already in the past (time is earlier then 'now')
     * this will be re-evaluated every minute
     * Ignore DST - don't use JS date object
     * uses classes: '.future', '.current' and '.past' - those should be defined
     * in the client that uses the data
     */
    const updateCalendarColors = () => {
        const now = new Date().toLocaleString("nl",  { hour12: false });
        // get the time section of the 'now' string and turn it into an integer for comparison
        const currentTime = parseInt(
            now.split(" ")[1]
                .substr(0,5)
                .replace(":", "")
        );
        for (let segment of myDay.value) {
            const fromTime = parseInt(segment.from.replace(":", ""));
            const toTime = parseInt(segment.to.replace(":", ""));
            if (currentTime < fromTime) {
                segment.classname = "future";
            } else if (currentTime > fromTime && currentTime < toTime) {
                segment.classname = "current";
            } else {
                segment.classname = "past";
            }
        }
    };

    return {
        getEventsOfDay,
        myDay,
        theDay
    }
}