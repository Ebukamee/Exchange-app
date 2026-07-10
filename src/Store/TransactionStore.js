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
  getSignedProofUrls,
} from "@/app/actions/trade";
import {
  adminGetTransactions,
  adminGetWithdrawals,
  adminGetSignedProofUrls,
  reviewTransaction as reviewTxAction,
  reviewWithdrawal as reviewWdAction,
  saveCrypto as saveCryptoAction,
  deleteCrypto as deleteCryptoAction,
  saveGiftcard as saveGiftcardAction,
  deleteGiftcard as deleteGiftcardAction,
  saveDepositBank as saveDepositBankAction,
} from "@/app/actions/admin";

const PAGE_LIMIT = 50;

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

  // ---------- Signed URLs ----------
  getProofUrls: (paths) => getSignedProofUrls(paths),
  getAdminProofUrls: (paths) => adminGetSignedProofUrls(paths),

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

  // ---------- Admin (paginated) ----------
  getAllTransactions: async (offset = 0) => {
    const data = await adminGetTransactions(offset);
    const hasMore = data.length > PAGE_LIMIT;
    const items = hasMore ? data.slice(0, PAGE_LIMIT) : data;
    if (offset === 0) {
      set({ transactions: items });
    } else {
      set((s) => ({ transactions: [...s.transactions, ...items] }));
    }
    return { items, hasMore };
  },
  getAllWithdrawals: async (offset = 0) => {
    const data = await adminGetWithdrawals(offset);
    const hasMore = data.length > PAGE_LIMIT;
    const items = hasMore ? data.slice(0, PAGE_LIMIT) : data;
    if (offset === 0) {
      set({ withdrawals: items });
    } else {
      set((s) => ({ withdrawals: [...s.withdrawals, ...items] }));
    }
    return { items, hasMore };
  },
  getAllUsers: null, // handled directly in Users.jsx via the action
  reviewTransaction: (txId, status) => reviewTxAction(txId, status),
  reviewWithdrawal: (wdId, status) => reviewWdAction(wdId, status),

  saveCrypto: async (payload) => { await saveCryptoAction(payload); await get().fetchCryptos(); },
  deleteCrypto: async (id) => { await deleteCryptoAction(id); await get().fetchCryptos(); },
  saveGiftcard: async (payload) => { await saveGiftcardAction(payload); await get().fetchGiftcards(); },
  deleteGiftcard: async (id) => { await deleteGiftcardAction(id); await get().fetchGiftcards(); },
  saveDepositBank: async (value) => { await saveDepositBankAction(value); set({ depositBank: value }); },
}));

export default TransactionStore;
