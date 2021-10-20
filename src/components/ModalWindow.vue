<template>
  <div>
    <b-button v-b-modal.modal-tall size="sm" variant="success" class="mb-2">
      Создать комнату
    </b-button>

    <b-modal
      id="modal-tall"
      ref="modal"
      title="Создать комнату"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-alert :show="alertShow" variant="success" dismissible>
          Комната успешно создана
        </b-alert>
        <b-form-group
          label="Название"
          label-for="name-input"
          invalid-feedback="Обязательное поле"
        >
          <b-form-input
            id="name-input"
            v-model="room.name"
            required
          ></b-form-input>
        </b-form-group>
      </form>
      <div slot="modal-cancel"> Назад </div>
      <div slot="modal-ok"> Создать </div>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      alertShow: false,
      room: {}
    };
  },
  methods: {
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      axios
        .post(`http://5.101.112.226:3000/api/room`, this.room)
        .then(response => {
          this.alertShow = true;
          this.$emit("newRoom", response.data);

          this.room = {};
        })
        .catch(e => {
          console.log(e);
        });

      // Hide the modal manually
      // this.$nextTick(() => {
      //   this.$bvModal.hide("modal-tall");
      // });
    }
  }
};
</script>
