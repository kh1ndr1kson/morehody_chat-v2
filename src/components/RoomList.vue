<template>
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
        @click="join(room._id)"
        class="lgi"
        button
        :disabled="dis(room._id)"
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
</template>

<script>
import axios from "axios";

export default {
  name: "RoomList",
  data() {
    return {
      rooms: [],
      errors: []
    };
  },
  props: ["selectedRoom"],
  computed: {
    selected: {
      get() {
        return this.selectedRoom;
      },
      set() {
        return "";
      }
    }
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
      this.selected = id;
      this.$emit("sendRoomId", id);
    },
    dis(room_id) {
      if (this.selected || this.selectedRoom) {
        if (this.selected !== room_id) return true;
        else return false;
      } else false;
    }
  }
};
</script>

<style scoped>
.lgi:hover {
  cursor: pointer;
}

.lgi.disabled {
  cursor: not-allowed;
}
</style>
