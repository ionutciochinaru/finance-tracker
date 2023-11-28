<template>
  <div class="grid grid-cols-2 py-2">
    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <UIcon name="i-heroicons-arrow-up-right" class="text-green-400"/>
        <div>Salary</div>
      </div>
      <div>
        <UBadge>Category</UBadge>
      </div>
    </div>
    <div class="flex items-center justify-end space-x-2">
      <div>currency</div>
      <div>
        <UDropdown :items="items" :popper="{placement: 'bottom-start'}">
          <UButton variant="ghost" trailing-icon="i-heroicons-ellipsis-horizontal"/>
        </UDropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useCurrency} from "~/composables/useCurrency.js";

const {currency} = useCurrency(5000)
const items = [
  [
    {
      label: 'Edit',
      icon: 'i-heroicons-pencil-square-20-solid',
      click: () => console.log('Edit')
    },
    {
      label: 'Delete',
      icon: 'i-heroicons-trash-20-solid',
      click: () => console.log('Delete')
    }
  ]

]
</script>