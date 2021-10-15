<template>
  <b-row>
    <b-col cols="4">
      <b-button size="sm" variant="success" class="mb-2" to="add-room">
        Создать комнату
      </b-button>
      <!-- <b-table striped hover :items="rooms" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="join(row.item._id)">Join</b-btn>
        </template>
      </b-table> -->
      <b-list-group>
        <b-list-group-item
          v-for="room in rooms"
          :key="room._id"
          @click.stop="join(room._id)"
          class="lgi"
        >
        <div class="d-flex w-100 align-items-center justify-content-between">
          <strong class="mb-1">{{room.room_name}}</strong>
          <small>{{room.created_date}}</small>
        </div>
      </b-list-group-item>
      </b-list-group>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
    <chat-room />
  </b-row>
</template>

<script>
import axios from "axios";
import ChatRoom from "@/components/ChatRoom";

export default {
  name: "RoomList",
  components: { ChatRoom },
  data() {
    return {
      rooms: [],
      errors: []
    };
  },
  created() {
    axios
      .get(`http://localhost:3000/api/room`)
      .then(response => {
        this.rooms = response.data;
      })
      .catch(e => {
        this.errors.push(e);
      });
  },
  methods: {
    join(id) {
      console.log(id);
      this.$router.push({
        name: "JoinRoom",
        params: { id: id }
      });
    }
  }
};
</script>

<style scoped>
.lgi:hover {
  cursor: pointer;
}
</style>
