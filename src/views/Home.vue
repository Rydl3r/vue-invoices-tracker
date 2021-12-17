<template>
  <div class="nav">
    <div class="nav_title_wrapper">
      <div class="nav_title">Your invoices</div>
      <div class="nav_subtitle">
        There are
        <b>{{ totalInvoices }}</b>
        total invoices
      </div>
    </div>
    <div class="select">
      <select v-model="filter">
        <option value="all">All</option>
        <option value="done">Processed</option>
        <option value="undone">In Progress</option>
      </select>
    </div>
    <div class="btn btn-info invoice_button" @click="toggleModal">
      Add Invoice
      <i class="fas fa-plus-circle"></i>
    </div>
  </div>
  <div class="invoices" v-if="invoices.length > 0">
    <div class="invoice" v-bind:key="invoice.id" v-for="invoice in invoices">
      <div class="invoice_id">{{ invoice.id }}</div>
      <div class="invoice_date">{{ invoice.date }}</div>
      <div class="invoice_title">{{ invoice.title }}</div>
      <div class="invoice_amount">{{ invoice.amount }} $</div>
      <div class="invoice_done" v-bind:class="{ processed: invoice.done }">
        {{ invoice.done ? "Processed" : "In Progress" }}
      </div>
    </div>
  </div>
  <div v-else>
    <h1 class="invoices_error_title">
      Sorry! No invoices found. Try adding something!
    </h1>
  </div>
  <Modal v-show="isModalVisible" @close="toggleModal" />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import Modal from "../components/Modal.vue";

@Options({
  components: {
    Modal,
  },
  data() {
    return {
      filter: "all",
    };
  },
  computed: {
    totalInvoices() {
      return this.$store.state.invoices.length;
    },
    isModalVisible() {
      return this.$store.state.isModalVisible;
    },
    invoices() {
      if (this.filter === "all") {
        return this.$store.getters.allInvoices;
      } else if (this.filter === "done") {
        return this.$store.getters.doneInvoices;
      } else if (this.filter === "undone") {
        return this.$store.getters.undoneInvoices;
      }
    },
  },
  methods: {
    toggleModal() {
      this.$store.commit("toggleModal");
    },
  },
})
export default class Home extends Vue {}
</script>

<style lang="scss">
$success: #2ecc71;
$info: #3498db;
$danger: #e74c3c;
$warning: #f1c40f;

.nav {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding-top: 40px;
}

.nav_title_wrapper {
  font-weight: 300;
  padding-right: 25px;
  text-align: left;
}

.nav_title {
  padding-bottom: 10px;
  font-size: 36px;
}

.invoices_error_title {
  font-weight: 300;
}

:root {
  --background-gradient: linear-gradient(30deg, #f39c12 30%, #f1c40f);
  --gray: #34495e;
  --darkgray: #2c3e50;
}

select {
  /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: #fff;
  background-color: var(--darkgray);
  background-image: none;
  cursor: pointer;
  font-size: 16px;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 10em;
  height: 3em;
  border-radius: 0.25em;
  overflow: hidden;
  margin: 20px;
}
/* Arrow */
.select::after {
  content: "\25BC";
  position: absolute;
  top: 0;
  right: 0;
  padding: 1em;
  background-color: #34495e;
  transition: 0.25s all ease;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: #f39c12;
}

.btn {
  color: white;
  text-transform: uppercase;
  border-right: none;
  border-bottom: none;
  -webkit-box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  -webkit-transition: all 0.2s;
  -o-transition: all 0.2s;
  transition: all 0.2s;
  display: inline-block;
  margin-bottom: 0;
  font-weight: normal;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  border: none;
  white-space: nowrap;
  padding: 6px 16px;
  font-size: 13px;
  line-height: 1.846;
  border-radius: 3px;
  margin: 5px;
  color: #333;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Default Button Background */
  background-image: -webkit-radial-gradient(circle, #fff 80%, #eee 81%);
  background-image: -o-radial-gradient(circle, #fff 80%, #eee 81%);
  background-image: radial-gradient(circle, #fff 80%, #eee 81%);
  background-repeat: no-repeat;
  border-color: #eee;
  -webkit-background-size: 200% 200%;
  background-size: 200%;
  background-position: 50%;
  -webkit-transition: background-size 0.25s;
  -o-transition: background-size 0.25s;
  transition: background-size 0.25s;
}

.btn:hover {
  -webkit-background-size: 100% 100%;
  background-size: 100%;
}
.btn:active {
  background-color: #eee;
  background-image: -webkit-radial-gradient(circle, #eee 10%, #fff 11%);
  background-image: -o-radial-gradient(circle, #eee 10%, #fff 11%);
  background-image: radial-gradient(circle, #eee 10%, #fff 11%);
  background-repeat: no-repeat;
  -webkit-background-size: 1000% 1000%;
  background-size: 1000%;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.btn-sm {
  padding: 5px 10px;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 3px;
}

.btn-lg {
  padding: 10px 16px;
  font-size: 17px;
  line-height: 1.33;
  border-radius: 3px;
}

.btn-success {
  color: #fff;
  background-image: -webkit-radial-gradient(
    circle,
    $success 80%,
    darken($success, 10) 81%
  );
  background-image: -o-radial-gradient(
    circle,
    $success 80%,
    darken($success, 10) 81%
  );
  background-image: radial-gradient(
    circle,
    $success 80%,
    darken($success, 10) 81%
  );
  background-repeat: no-repeat;
  border-color: #439a46;
  -webkit-background-size: 200% 200%;
  background-size: 200%;
  background-position: 50%;
  -webkit-transition: background-size 0.25s;
  -o-transition: background-size 0.25s;
  transition: background-size 0.25s;
}
.btn-success:active {
  background-color: #439a46;
  background-image: -webkit-radial-gradient(
    circle,
    darken($success, 10) 10%,
    $success 11%
  );
  background-image: -o-radial-gradient(
    circle,
    darken($success, 10) 10%,
    $success 11%
  );
  background-image: radial-gradient(
    circle,
    darken($success, 10) 10%,
    $success 11%
  );
  background-repeat: no-repeat;
  -webkit-background-size: 1000% 1000%;
  background-size: 1000%;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.btn-info {
  color: #fff;
  background-image: -webkit-radial-gradient(
    circle,
    $info 80%,
    darken($info, 10) 81%
  );
  background-image: -o-radial-gradient(
    circle,
    $info 80%,
    darken($info, 10) 81%
  );
  background-image: radial-gradient(circle, $info 80%, darken($info, 10) 81%);
  background-repeat: no-repeat;
  border-color: #2980b9;
  -webkit-background-size: 200% 200%;
  background-size: 200%;
  background-position: 50%;
  -webkit-transition: background-size 0.25s;
  -o-transition: background-size 0.25s;
  transition: background-size 0.25s;
}
.btn-info:active {
  background-color: #2980b9;
  background-image: -webkit-radial-gradient(
    circle,
    darken($info, 10) 10%,
    $info 11%
  );
  background-image: -o-radial-gradient(
    circle,
    darken($info, 10) 10%,
    $info 11%
  );
  background-image: radial-gradient(circle, darken($info, 10) 10%, $info 11%);
  background-repeat: no-repeat;
  -webkit-background-size: 1000% 1000%;
  background-size: 1000%;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
.btn-danger {
  color: #fff;
  background-image: -webkit-radial-gradient(
    circle,
    $danger 80%,
    darken($danger, 10) 81%
  );
  background-image: -o-radial-gradient(
    circle,
    $danger 80%,
    darken($danger, 10) 81%
  );
  background-image: radial-gradient(
    circle,
    $danger 80%,
    darken($danger, 10) 81%
  );
  background-repeat: no-repeat;
  border-color: #cb171e;
  -webkit-background-size: 200% 200%;
  background-size: 200%;
  background-position: 50%;
  -webkit-transition: background-size 0.25s;
  -o-transition: background-size 0.25s;
  transition: background-size 0.25s;
}
.btn-danger:active {
  background-color: #cb171e;
  background-image: -webkit-radial-gradient(
    circle,
    darken($danger, 10) 10%,
    $danger 11%
  );
  background-image: -o-radial-gradient(
    circle,
    darken($danger, 10) 10%,
    $danger 11%
  );
  background-image: radial-gradient(
    circle,
    darken($danger, 10) 10%,
    $danger 11%
  );
  background-repeat: no-repeat;
  -webkit-background-size: 1000% 1000%;
  background-size: 1000%;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}
.btn-warning {
  color: #fff;
  background-image: -webkit-radial-gradient(
    circle,
    $warning 80%,
    darken($warning, 10) 81%
  );
  background-image: -o-radial-gradient(
    circle,
    $warning 80%,
    darken($warning, 10) 81%
  );
  background-image: radial-gradient(
    circle,
    $warning 80%,
    darken($warning, 10) 81%
  );
  background-repeat: no-repeat;
  border-color: #e08600;
  -webkit-background-size: 200% 200%;
  background-size: 200%;
  background-position: 50%;
  -webkit-transition: background-size 0.25s;
  -o-transition: background-size 0.25s;
  transition: background-size 0.25s;
}
.btn-warning:active {
  background-color: #e08600;
  background-image: -webkit-radial-gradient(
    circle,
    darken($warning, 10) 10%,
    $warning 11%
  );
  background-image: -o-radial-gradient(
    circle,
    darken($warning, 10) 10%,
    $warning 11%
  );
  background-image: radial-gradient(
    circle,
    darken($warning, 10) 10%,
    $warning 11%
  );
  background-repeat: no-repeat;
  -webkit-background-size: 1000% 1000%;
  background-size: 1000%;
  -webkit-box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.3);
}

.invoice {
  display: flex;
  justify-content: center;
  background-color: #32475f;
  padding: 20px;
  border-radius: 10px;
  width: 60%;
  margin: 20px auto 20px auto;
}

.invoice_id {
  width: 5%;
  padding-top: 5px;
  font-weight: 700;
}

.invoice_date {
  width: 25%;
  padding-top: 5px;
  font-weight: 300;
}

.invoice_title {
  width: 40%;
  padding-top: 5px;
  font-weight: 300;
}

.invoice_amount {
  width: 15%;
  padding-top: 5px;
  font-weight: 700;
}

.invoice_done {
  width: 15%;
  padding: 5px;
  border-radius: 5px;
  background: #ef2f2f;
  font-weight: 300;
}

.processed {
  background: #4caf50;
}

.invoice_button {
  height: 24px;
  margin-top: 25px;
}
</style>
