<template>
    <div :class="classObject" @click="captureClick">
        {{ day.format('D') }}
        <ul class="event-list">
            <li v-for="(event,i) in events" :key="i">{{ event.description }}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: [ 'day' ],
        computed: {
            events() {
                return this.$store.state.events.filter(event => event.date.isSame(this.day, 'days'));
            },
            classObject() {
                let eventFormDate = this.$store.state.eventFormDate;
                let today = this.day.isSame(this.$moment(), 'day');
                let eventFormActive = this.$store.state.eventFormActive;
                return {
                    day: true,
                    today,
                    past: this.day.isSameOrBefore(this.$moment(), 'day') && !today,
                    active: eventFormDate.isSame(this.day, 'day') && eventFormActive
                };
            }
        },
        methods: {
            captureClick(event) {
                this.$store.commit('eventFromPos', {x: event.clientX, y: event.clientY } );
                this.$store.commit('eventFormActive', true);
                this.$store.commit('eventFormDate', this.day);
            }
        }
    }
</script>