<template>
  <UModal v-model="isOpen">
    <UCard>
      <template #header>
        Add Transaction
      </template>
      <div>
        <UForm :state="state" :schema="schema" ref="form" @submit.prevent="save">
          <UFormGroup label="Amount" :required="true" name="amount" class="mb-4">
            <UInput type="number" placeholder="Amount" v-model.number="state.amount"/>
          </UFormGroup>
          <UFormGroup label="Transaction Type" :required="true" name="type" class="mb-4">
            <USelect :options="transactionTypeOptions" v-model="state.type"/>
          </UFormGroup>
          <UFormGroup label="Transaction date" :required="true" name="created_at" class="mb-4">
            <UInput type="date" v-model="state.created_at" icon="i-heroicons-calendar-days-20-solid"/>
          </UFormGroup>
          <UFormGroup label="Description" hint="Optional" name="description" class="mb-4">
            <UTextarea placeholder="Description" v-model="state.description"/>
          </UFormGroup>
          <UFormGroup :required="true" label="Category" name="category" class="mb-4" v-if="state.type === ETransactionType.Expense">
            <USelect :options="categoriesOptions" v-model="state.category"/>
          </UFormGroup>

          <UButton type="submit" color="black" variant="solid" label="save"/>
        </UForm>
      </div>
    </UCard>
  </UModal>
</template>

<script setup>

import z from "zod";

import {categoriesOptions, transactionTypeOptions} from "~/constants.js";
import {ETransactionType} from "~/types/category.js";

const props = defineProps({
  modelValue: Boolean
})

const defaultSchema = z.object({
  created_at: z.string(),
  description: z.string().optional(),
  amount: z.number().positive('Amount needs to be more than 0')
})
const incomeSchema = z.object({
  type: z.literal('Income')
})
const expenseSchema = z.object({
  type: z.literal('Expense'),
  category: z.enum(categoriesOptions)
})
const investmentSchema = z.object({
  type: z.literal('Investment')
})
const savingSchema = z.object({
  type: z.literal('Saving')
})
const schema = z.intersection(
    z.discriminatedUnion('type', [incomeSchema, expenseSchema, investmentSchema, savingSchema]),
    defaultSchema
)
const form = ref()
const save = async () => {
  if (form.value.errors.length) {}
  // Store into the supabase
}

const emit = defineEmits(['update:modelValue'])

const initialState = ref({
  type: undefined,
  amount: 0,
  created_at: undefined,
  description: undefined,
  category: undefined
})

const state = ref({
  ...initialState
})

const resetForm =() => {
  Object.assign(state.value, initialState)
  form.value.clear()
}

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => {
    if (!value) resetForm()
    emit('update:modelValue', value)
  }
})
</script>