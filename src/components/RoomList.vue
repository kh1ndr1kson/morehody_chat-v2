<template>
  <b-col cols="4">
    <modal-window @newRoom="pushNewRoom" />
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
        <strong class="mb-1">{{room.name}}</strong>
        <div class="actions">
          <b-dropdown id="dropdown-dropright" dropright size="sm" variant="outline" class="m-2">
            <b-dropdown-item-button>Изменить</b-dropdown-item-button>
            <b-dropdown-item-button @click="deleteRoom(room)" class="text-danger">Удалить</b-dropdown-item-button>
          </b-dropdown>
        </div>
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
import ModalWindow from "@/components/ModalWindow";

export default {
  name: "RoomList",
  components: {
    ModalWindow
  },
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
      .get(`http://5.101.112.226:3000/api/room`)
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
    },
    pushNewRoom(room) {
      this.rooms.push(room);
    },
    deleteRoom(item) {
      axios
        .delete(`http://5.101.112.226:3000/api/room/${item._id}`)
        .then(response => {
          //this.editedIndex = this.rooms.indexOf(item);
          this.rooms.splice(this.rooms.indexOf(item), 1);
          //this.rooms = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
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

.actions {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
}

.actions > div {
  margin: 0 !important;
  height: 100%;
}
</style>
