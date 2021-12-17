import { createStore } from "vuex";
import { Invoice } from '../models/Invoice';

export default createStore({
  state: {
    isModalVisible: false,
    invoices: [],
  },
  mutations: {
    addInvoice(state: any, payload): void {
      state.invoices.push({
        id: state.invoices.length > 0 ? state.invoices.length + 1 : 1,
        title: payload.title,
        amount: payload.amount,
        done: payload.done,
        date: new Date().toLocaleString(),
      })
    },
    toggleModal(state: any): void {
      state.isModalVisible = !state.isModalVisible
    }
  },
  getters: {
    allInvoices: state => state.invoices,
    doneInvoices: state => state.invoices.filter((item: Invoice) => item.done === true),
    undoneInvoices: state => state.invoices.filter((item: Invoice) => item.done === false)
  },
  actions: {
  },
  modules: {},
});
