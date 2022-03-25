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
    });

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
        // get the time section of the 'now' string
        // and turn it into an integer for comparison
        const currentTime = parseInt(
            now.split(" ")[1]
                .substring(0, 5)
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
     * but only for the homepage display (see addFreeTimeSegmentsToTheDay)
     */
    const addFreeTimeSegmentsToMyDay = () => {
        myDayWithFreeTime.value = [];
        myDay.value.forEach((day, index) => {
            if (day.classname !== 'past') {
                // this one goes in the list to display
                day.type = 'work';
                myDayWithFreeTime.value.push(day);
                // now see if we need to add a 'free' segment
                // only if theDay is not a whole day event
                if (
                    (!day.isWholeDay) &&
                    (myDay.value[index + 1] != null) &&
                    (day.toDT !== myDay.value[index + 1].fromDT)
                ) {
                    // calculate timespan between these events
                    const { diffString, type, classname }
                            = getTimeDiffAsString(
                                new Date(dtString(day.toDT)),
                                new Date(dtString(myDay.value[index + 1].fromDT))
                            );
                    myDayWithFreeTime.value.push({
                        type,
                        classname,
                        mins: diffString
                    });
                }
            }
        });
    };

    /**
     * Add free space between listed appointments
     * this function includes appointments in the past.
     * Therefor, this should be used for the calendar-1-day display,
     * but not for the homepage display (see addFreeTimeSegmentsToMyDay)
     */
    const addFreeTimeSegmentsToTheDay = () => {
        theDayWithFreeTime.value = [];
        theDay.value.forEach((day, index) => {
            // this one goes in the list to display
            day.type = 'work';
            theDayWithFreeTime.value.push(day);
            // now see if we need to add a 'free' segment
            // only if theDay is not a whole day event
            if (
                (!day.isWholeDay) &&
                (theDay.value[index + 1] != null) &&
                (day.toDT !== theDay.value[index + 1].fromDT)
            ) {
                // calculate timespan between these events
                const { diffString, type, classname }
                    = getTimeDiffAsString(
                        new Date(dtString(day.toDT)),
                        new Date(dtString(theDay.value[index + 1].fromDT))
                    );
                theDayWithFreeTime.value.push({
                    type,
                    classname,
                    mins: diffString
                });

            }
        });
    };


    /**
     * Get the difference between two DateTime values.
     * If to > from, it will be considered an overlap
     * @param from DateTime
     * @param to DateTime
     * @return {{classname: string, diffString: string, type: string}}
     */
    const getTimeDiffAsString = (from, to) => {
        let fromTime = from;
        let toTime = to;
        let type = "free";
        let classname = "freetime";
        if (from > to) {
            fromTime = to;
            toTime = from;
            type = "overlap";
            classname = "overlap";
        }
        const diffMs = toTime - fromTime;
        const diffHrs = ("00" + Math.abs(Math.floor((diffMs % 86400000) / 3600000))).slice (-2); // hours
        const diffMins = ("00" + Math.abs(Math.floor(((diffMs % 86400000) % 3600000) / 60000))).slice (-2);
        const diffString = diffHrs !== '00'
            ? `${diffHrs}:${diffMins}`
            : `${diffMins} min`;

        return { diffString, type, classname };
    }

    /**
     * insert a 'T' before the timesegment
     * iphone browsers will not except it as a date-time otherwise
     * resulting in NaN when doing calculations
     *
     * @param dateTimeString
     * @return {string}
     */
    const dtString = (dateTimeString) => {
        let newString = dateTimeString;
        // only if position 11 is a space like
        // 2022-02-12 10:15
        if(dateTimeString.substr(10,1) === " ") {
            newString = dateTimeString.substr(0, 10) + "T" +dateTimeString.substr(11);
        }
        return newString;
    }

    return {
        getEventsOfDay,
        myDay,
        myDayWithFreeTime,
        theDay,
        theDayWithFreeTime
    };
}