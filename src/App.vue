<template>
  <div id="app" class="container">
    <b-row>
      <room-list @sendRoomId="getRoom" :selectedRoom="selectedRoom" />
      <chat-room @unsetSelectedRoom="unsetRoom" v-if="selectedRoom" :selectedRoom="selectedRoom" />
    </b-row>
  </div>
</template>

<script>
import RoomList from "@/components/RoomList";
import ChatRoom from "@/components/ChatRoom";

export default {
  name: "App",
  components: { RoomList, ChatRoom },
  data() {
    return {
      selectedRoom: ""
    };
  },
  methods: {
    getRoom(id) {
      this.selectedRoom = id;
    },
    unsetRoom(id) {
      this.selectedRoom = "";
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
