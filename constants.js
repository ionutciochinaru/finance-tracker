import {ETransactionType} from "~/types/category.js";

export const transactionViewOptions = ['Yearly', 'Monthly', 'Daily']
export const categoriesOptions = ['Food', 'Entertainment', 'Shopping', 'Travel', 'Other']

export const transactionTypeOptions = Object.values(ETransactionType).map(value => value);