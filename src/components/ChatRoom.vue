<template>
  <b-col cols="8">
    <b-btn size="sm" variant="light" disabled>{{room.name}}</b-btn><b-button size="sm" variant="outline-danger" @click.stop="logout()">Выйти</b-button>
    <b-list-group v-chat-scroll class="mt-2">
      <b-list-group-item v-for="(item, index) in chats">
        <div v-if="item.nickname === nickname">
          <!-- <b-avatar src="https://placekitten.com/300/300"></b-avatar> -->
          <div class="d-flex justify-content-between">
            <b>{{ item.nickname }}</b> <small class="text-muted">{{ item.created_date }}</small>
          </div>
          <span>{{ item.message }}</span>
        </div>
        <div v-else>
          <!-- <b-avatar src="https://placekitten.com/300/300"></b-avatar> -->
          <div class="d-flex justify-content-between">
            <b>{{ item.nickname }}</b> <small class="text-muted">{{ item.created_date }}</small>
          </div>
          <span>{{ item.message }}</span>
        </div>
      </b-list-group-item>
    </b-list-group>
    <b-form id="form" @submit="onSubmit">
      <b-form-textarea
        id="message"
        size="sm"
        rows="4"
        class="mt-2"
        placeholder="Введите сообщение..."
        v-model.trim="chat.message"
      ></b-form-textarea><b-btn type="submit" variant="info">Send</b-btn>
    </b-form>
  </b-col>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import * as io from "socket.io-client";
import VueChatScroll from "vue-chat-scroll";

Vue.use(VueChatScroll);

export default {
  name: "ChatRoom",
  data() {
    return {
      chats: [],
      errors: [],
      nickname: "tempNickname",
      chat: {},
      room: {},
      socket: io("http://localhost:4000")
    };
  },
  props: ["selectedRoom"],
  created() {
    this.getChats();

    axios
      .get(`http://localhost:3000/api/room/${this.selectedRoom}`)
      .then(response => {
        this.room = response.data;
      })
      .catch(e => console.log(e));

    this.socket.on(
      "new-message",
      function(data) {
        console.log(data);
        if (data.message.room === this.selectedRoom) {
          this.chats.push(data.message);
        }
      }.bind(this)
    );
  },
  methods: {
    getChats() {
      axios
        .get(`http://localhost:3000/api/chat/` + this.selectedRoom)
        .then(response => {
          this.chats = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    logout() {
      // this.socket.emit("save-message", {
      //   room: this.chat.room,
      //   nickname: this.chat.nickname,
      //   message: this.chat.nickname + " left this room",
      //   created_date: new Date()
      // });
      this.$emit("unsetSelectedRoom", "");
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.chat.room = this.selectedRoom;
      this.chat.nickname = "tempNickname";
      axios
        .post(`http://localhost:3000/api/chat`, this.chat)
        .then(response => {
          this.socket.emit("save-message", response.data);
          this.chat.message = "";
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>
#form {
  position: sticky;
  bottom: 0;
}
</style>
