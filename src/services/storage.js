import { defaultTransactions, defaultUser } from '../data/mock';
const TX_KEY = 'sf_transactions_v2';
const USER_KEY = 'sf_user_v2';

export const formatIDR = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value || 0);
export const getUser = () => JSON.parse(localStorage.getItem(USER_KEY)) || defaultUser;
export const saveUser = (user) => localStorage.setItem(USER_KEY, JSON.stringify(user));
export const getTransactions = () => JSON.parse(localStorage.getItem(TX_KEY)) || defaultTransactions;
export const saveTransactions = (items) => localStorage.setItem(TX_KEY, JSON.stringify(items));
export const addTransaction = (tx) => { const items = getTransactions(); const next = [{ ...tx, id: Date.now() }, ...items]; saveTransactions(next); return next; };
export const deleteTransaction = (id) => { const next = getTransactions().filter(item => item.id !== Number(id)); saveTransactions(next); return next; };
