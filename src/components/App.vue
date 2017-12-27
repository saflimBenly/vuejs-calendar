<template>
<div>
    <div id="header">
        <div>
            <img src="../assets/logo.png" alt="Logo">
            <h1>Vue.js Calendar</h1>
        </div>
        <div>
            <current-month></current-month>
        </div>
    </div>
    <div id="day-bar">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
    </div>
  <div id="calendar">
      <div v-for="(week,i) in weeks" :key="i" class="calendar-week">
        <calendar-day v-for="(day,i) in week" :key="i" :day="day"></calendar-day>
      </div>
  </div>
  <event-form></event-form>
</div>
</template>
<script>
    import CalendarDay from './CalendarDay.vue';
    import CurrentMonth from './CurrentMonth.vue';
    import EventForm from './EventForm.vue';

    export default {
        computed: {
            days() {
                const SUNDAY = 0;
                const MONDAY = 1;

                let days = [];
                let month = this.$store.state.currentMonth;
                let year = this.$store.state.currentYear;
                let currentDay = this.$moment(`${year}-${month}-1`,'YYYY-M-D');
                // generate for this month
                do {
                    days.push(currentDay);
                    currentDay = this.$moment(currentDay).add(1, 'days');
                } while ((currentDay.month() + 1) === month);

                // generate prev month
                currentDay = this.$moment(days[0]);
                if(currentDay.day() !== MONDAY) {
                    do {
                        currentDay = this.$moment(currentDay).subtract(1, 'days');
                        days.unshift(currentDay);
                    } while (currentDay.day() !== MONDAY);
                }

                // generate next month
                currentDay = this.$moment(days[days.length - 1]);
                if(currentDay.day() !== SUNDAY) {
                    do {
                        currentDay = this.$moment(currentDay).add(1, 'days');
                        days.push(currentDay);
                    } while (currentDay.day() !== SUNDAY);
                }
                return days;
            },
            weeks() {
                let weeks = [];
                let week = [];
                for (let day of this.days) {
                    week.push(day);
                    if (week.length === 7) {
                        weeks.push(week);
                        week = [];
                    }
                }
                return weeks;
            }
        },
        components : {
            CalendarDay, CurrentMonth, EventForm
        }
    }
</script>