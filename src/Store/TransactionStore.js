"use client";

import { create } from "zustand";
import { getCryptos, getGiftcards, getDepositBank } from "@/app/actions/catalog";
import {
  uploadProofs,
  createTransaction as createTx,
  buyWithBalance as buyWithBalanceAction,
  requestWithdrawal as requestWithdrawalAction,
  getMyTransactions,
  getMyWithdrawals,
} from "@/app/actions/trade";
import {
  adminGetTransactions,
  adminGetWithdrawals,
  reviewTransaction as reviewTxAction,
  reviewWithdrawal as reviewWdAction,
  saveCrypto as saveCryptoAction,
  deleteCrypto as deleteCryptoAction,
  saveGiftcard as saveGiftcardAction,
  deleteGiftcard as deleteGiftcardAction,
  saveDepositBank as saveDepositBankAction,
} from "@/app/actions/admin";

const TransactionStore = create((set, get) => ({
  cryptos: [],
  giftcards: [],
  transactions: [],
  withdrawals: [],
  depositBank: null,

  // ---------- Storage ----------
  uploadImages: async (files) => {
    const fd = new FormData();
    files.forEach((f) => fd.append("files", f));
    return uploadProofs(fd);
  },

  // ---------- Catalogue ----------
  fetchCryptos: async () => {
    const data = await getCryptos();
    set({ cryptos: data });
    return data;
  },
  fetchGiftcards: async () => {
    const data = await getGiftcards();
    set({ giftcards: data });
    return data;
  },
  fetchDepositBank: async () => {
    const v = await getDepositBank();
    set({ depositBank: v });
    return v;
  },

  // ---------- User transactions ----------
  createTransaction: (payload) => createTx(payload),
  buyWithBalance: (payload) => buyWithBalanceAction(payload),
  getMyTransactions: async () => {
    const data = await getMyTransactions();
    set({ transactions: data });
    return data;
  },

  // ---------- Withdrawals ----------
  requestWithdrawal: (payload) => requestWithdrawalAction(payload),
  getMyWithdrawals: async () => {
    const data = await getMyWithdrawals();
    set({ withdrawals: data });
    return data;
  },

  // ---------- Admin ----------
  getAllTransactions: async () => {
    const data = await adminGetTransactions();
    set({ transactions: data });
    return data;
  },
  getAllWithdrawals: async () => {
    const data = await adminGetWithdrawals();
    set({ withdrawals: data });
    return data;
  },
  reviewTransaction: (tx, status) => reviewTxAction(tx, status),
  reviewWithdrawal: (wd, status) => reviewWdAction(wd, status),

  saveCrypto: async (payload) => { await saveCryptoAction(payload); await get().fetchCryptos(); },
  deleteCrypto: async (id) => { await deleteCryptoAction(id); await get().fetchCryptos(); },
  saveGiftcard: async (payload) => { await saveGiftcardAction(payload); await get().fetchGiftcards(); },
  deleteGiftcard: async (id) => { await deleteGiftcardAction(id); await get().fetchGiftcards(); },
  saveDepositBank: async (value) => { await saveDepositBankAction(value); set({ depositBank: value }); },
}));

export default TransactionStore;
