import { onMounted, ref } from "vue";
import useAuth from "@/composables/UseAuth";
import axios from "axios";

const { user } = useAuth();
const myDay = ref([]);
const myDayWithFreeTime = ref([]);
const theDay = ref([]);
const theDayWithFreeTime = ref([]);

export default function useCalendar() {

    onMounted(async () => {
        await getMyDay();
    })

    /**
     * calendar page: get my events of a requested day
     * @param reqDay
     * @return {Promise<void>}
     */
    const getEventsOfDay = async (reqDay) => {
        if (user.value?.id) {
            try {
                console.log(`getting events of day: ${reqDay}`);
                const resp = await axios.get(
                    `${import.meta.env.VITE_APP_API_BASE_URL}/calendarEvents?from=${reqDay}`,
                    {
                        withCredentials: true
                    }
                );
                theDay.value = resp.data.data;
                addFreeTimeSegmentsToTheDay();
            } catch (e) {
                theDay.value = [];
            }
        }
    };

    /**
     * for homepage: get my events of today
     * @return {Promise<void>}
     */
    const getMyDay = async () => {
        if (user.value?.id) {
            try {
                console.log('getting events of today');
                const resp = await axios.get(`${import.meta.env.VITE_APP_API_BASE_URL}/myDay`,
                    {
                        withCredentials: true
                    }
                );
                myDay.value = resp.data.data;
                updateCalendarColors();
                addFreeTimeSegmentsToMyDay();
                // check every minute if the colors are still correct,
                // considering the passing of time
                setInterval(() => {
                    updateCalendarColors();
                    addFreeTimeSegmentsToMyDay();
                }, 60000);
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

    /**
     * Add free space between listed appointments
     * this function disregards appointments in the past.
     * Therefor, not to be used for the calendar-1-day display,
     * but only for the homepage display
     */
    const addFreeTimeSegmentsToMyDay = () => {
        myDayWithFreeTime.value = [];
        myDay.value.forEach((day, index) => {
            if (day.classname !== 'past') {
                // this one goes in the list to display
                day.type = 'work';
                myDayWithFreeTime.value.push(day);
                // now see if we need to add a 'free' segment
                if (
                    (myDay.value[index + 1] != null) &&
                    (day.toDT !== myDay.value[index + 1].fromDT)
                ) {
                    // calculate timespan between these events
                    const fromTime = new Date(day.toDT);
                    const toTime = new Date(myDay.value[index + 1].fromDT);
                    const diffMs = toTime - fromTime;
                    myDayWithFreeTime.value.push({
                        type: 'free',
                        classname: 'freetime',
                        mins: Math.floor(((diffMs % 86400000) % 3600000) / 60000) + " min"
                    });
                }
            }
        });
    };

    const addFreeTimeSegmentsToTheDay = () => {
        console.log("adding free time segments");
        theDayWithFreeTime.value = [];
        theDay.value.forEach((day, index) => {
            // this one goes in the list to display
            day.type = 'work';
            theDayWithFreeTime.value.push(day);
            // now see if we need to add a 'free' segment
            if (
                (theDay.value[index + 1] != null) &&
                (day.toDT !== theDay.value[index + 1].fromDT)
            ) {
                // calculate timespan between these events
                const fromTime = new Date(day.toDT);
                const toTime = new Date(theDay.value[index + 1].fromDT);
                const diffMs = toTime - fromTime;
                if (diffMs > 0) {
                    theDayWithFreeTime.value.push({
                        type: 'free',
                        classname: 'freetime',
                        mins: Math.floor(((diffMs % 86400000) % 3600000) / 60000) + " min"
                    });
                } else if (diffMs < 0) {
                    // seems the next appointment starts before the previous appointment has ended
                    theDayWithFreeTime.value.push({
                        type: 'overlap',
                        classname: 'overlap',
                        mins: Math.abs(Math.floor(((diffMs % 86400000) % 3600000) / 60000)) + " min"
                    });
                }
            }
        });
    };

    return {
        getEventsOfDay,
        myDay,
        myDayWithFreeTime,
        theDay,
        theDayWithFreeTime
    };
}