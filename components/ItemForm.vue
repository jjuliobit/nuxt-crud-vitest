<template>
  <h1 class="text-center mb-3 mt-3">Form</h1>
  <form @submit.prevent="handleSubmit" class="max-w-md mx-auto p-4 border rounded-lg">
    <input v-model="form.filial" placeholder="Filial" class="input-field" />
    <input v-model="form.hostname" placeholder="Hostname" class="input-field" />
    <input v-model="form.usuario" placeholder="Usuário" class="input-field" />
    <input v-model="form.equipamento" placeholder="Equipamento" class="input-field" />
    <input v-model="form.marca" placeholder="Marca" class="input-field" />
    <input v-model="form.numeroDeSerie" placeholder="Número de Série" class="input-field" />
    <button type="submit" class="btn-submit">{{ isEdit ? 'Update' : 'Add' }} Item</button>
    <button v-if="isEdit" @click="cancelEdit" type="button" class="btn-cancel">Cancel</button>
  </form>
</template>

<script lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue';
import type { Item } from '~/types/Item';

interface FormState {
  filial: string;
  hostname: string;
  usuario: string;
  equipamento: string;
  marca: string;
  numeroDeSerie: string;
}

export default {
  props: defineProps<{ item: Item | null }>(),
  emits: defineEmits(['submit', 'cancel']),
  setup(props, { emit }) {
    const form = ref<FormState>({
      filial: '',
      hostname: '',
      usuario: '',
      equipamento: '',
      marca: '',
      numeroDeSerie: ''
    });
    const isEdit = ref(false);

    const resetForm = () => {
      form.value = {
        filial: '',
        hostname: '',
        usuario: '',
        equipamento: '',
        marca: '',
        numeroDeSerie: ''
      };
      isEdit.value = false;
    };

    watch(
      () => props.item,
      (newVal) => {
        if (newVal) {
          form.value = { ...newVal };
          isEdit.value = true;
        } else {
          resetForm();
        }
      },
      { immediate: true }
    );

    const handleSubmit = () => {
      emit('submit', form.value);
      resetForm();
    };

    const cancelEdit = () => {
      emit('cancel');
      resetForm();
    };

    return {
      form,
      isEdit,
      handleSubmit,
      cancelEdit
    };
  }
};
</script>

<style scoped>
/* Estilos Tailwind CSS */
.input-field {
  @apply block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
}

.btn-submit {
  @apply mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}

.btn-cancel {
  @apply mt-2 inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500;
}
</style>
