<template>
  <div :class="{ 'content-container': true, 'active-card': event.inPlay, 'expired-card': event.expired}">
    <h4>{{ event.displayName }}</h4>
    <p>
      <small
        ><i>{{ event.flavorText }}</i></small
      >
    </p>
    <!-- <b-badge variant="danger" v-if="event.expired">expired</b-badge> -->
    <p class="mb-0">{{ event.effectText }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { EventCardData } from "@port-of-mars/shared/sologame";

@Component({})
export default class EventCard extends Vue {
  @Prop() event!: EventCardData;
}
</script>

<style lang="scss">
.content-container {
  padding: 5px;
}
.active-card {
  border-color: green; 
  border-width: 5px;
  border-style: solid;
}
.expired-card {
  border-color: rgba(128, 128, 128, 0);
  background-color:  rgba(128, 128, 128, 0.4);
  color:  rgba(128, 128, 128, 0.7);
}
</style>
