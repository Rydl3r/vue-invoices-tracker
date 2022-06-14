<script>
export default {
  name: "Modal",
  data() {
    return {
      title: "",
      amount: Number,
      done: false,
    };
  },
  methods: {

    addInvoice() {
      if (
        this.title.length > 0 &&
        this.amount &&
        this.amount > 0 &&
        typeof this.amount === "number"
      ) {
        this.$store.commit("addInvoice", {
          title: this.title,
          amount: this.amount,
          done: this.done,
        });
        this.$emit("close");
        this.title = "";
        this.amount = Number;
        this.done = false;
      } else {
        alert("Please, input the right data");
      }
    },
  },
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <input
          required
          type="number"
          v-model="amount"
          placeholder="Amount..."
        />
        <input required type="text" v-model="title" placeholder="Title..." />
        <div class="done">
          <div class="done_title">Processed?</div>
          <label class="--switch">
            <input type="checkbox" class="done" v-model="done" />
            <span class="--slider">
              <i class="fas fa-check"></i>
              <i class="fas fa-times"></i>
            </span>
          </label>
        </div>
        <div class="btn btn-danger" @click="this.$emit('close')">Close</div>
        <div class="btn btn-info" @click="addInvoice">Add Invoice</div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  padding: 20px;
  border-radius: 15px;
  border: 1px solid black;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.btn-green {
  color: white;
  background: #4aae9b;
  border: 1px solid #4aae9b;
  border-radius: 2px;
}

.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}

input {
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  font-size: 18px;
}

.done {
  display: flex;
  justify-content: center;
  color: black;
  margin-bottom: 5px;
}

.done_title {
  padding-right: 20px;
  font-size: 18px;
  padding-top: 5px;
}

button {
  margin: 5px auto 5px auto;
}

.--switch {
  position: relative;
  display: inline-block;
  width: 70px;
  height: 35px;
}

.--switch input {
  display: none;
}

.--slider .fa-check {
  color: #ffffff;
  position: absolute;
  left: 15px;
  font-size: 16px;
  display: none;
}
.--slider .fa-times {
  color: #ffffff;
  position: absolute;
  font-size: 16px;
  right: 15px;
}

.--slider {
  position: absolute;
  cursor: pointer;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #db3a34;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  border-radius: 50px;
}

.--slider:before {
  position: absolute;
  content: "";
  height: 27px;
  width: 27px;
  left: 4px;
  bottom: 4px;
  border-radius: 50%;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.--switch input:checked + .--slider .fa-check {
  display: block;
}

.--switch input:checked + .--slider .fa-times {
  display: none;
}

.--switch input:checked + .--slider {
  background-color: #52b69a;
}

.--switch input:focus + .--slider {
  box-shadow: 0 0 1px #52b69a;
}

.--switch input:checked + .--slider:before {
  -webkit-transform: translateX(35px);
  -ms-transform: translateX(35px);
  transform: translateX(35px);
}
</style>