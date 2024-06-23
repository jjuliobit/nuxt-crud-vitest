<template>
  <div class="space-y-4">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <!-- Cabeçalho da tabela -->
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hostname</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuário / Equipamento (Marca)</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Filial</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Número de Série</th>
          <th scope="col" class="relative px-6 py-3"><span class="sr-only">Editar / Excluir</span></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <!-- Loop pelos itens -->
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.hostname }}</td>
          <td>{{ item.usuario }} - {{ item.equipamento }} ({{ item.marca }})</td>
          <td>{{ item.filial }}</td>
          <td>{{ item.numeroDeSerie }}</td>
          <td>
            <button @click="openEditModal(item)" class="px-4 py-2 bg-yellow-500 text-white rounded-md">Editar</button>
            <button @click="openDeleteModal(item.id)" class="px-4 py-2 bg-red-600 text-white rounded-md">Excluir</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal de Edição -->
    <div v-if="editModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-md w-96">
        <h3 class="text-lg font-semibold mb-4">Editar Item</h3>
        <ItemForm :item="selectedItemForEdit" @submit="handleEditSubmit" />
        <div class="flex justify-end mt-4">
          <button @click="closeEditModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">Fechar</button>
        </div>
      </div>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="deleteModalOpen" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-4 rounded-md w-96">
        <h3 class="text-lg font-semibold mb-4">Confirmar Exclusão</h3>
        <p>Deseja realmente excluir este item?</p>
        <div class="mt-4 flex justify-end">
          <button @click="handleDelete" class="px-4 py-2 bg-red-600 text-white rounded-md">Excluir</button>
          <button @click="closeDeleteModal" class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md ml-4">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { Item } from '@/types/Item';
import ItemForm from '~/components/ItemForm.vue';
import { deleteItem } from '~/services/deleteItems'; // Importar função para excluir item

export default defineComponent({
  name: 'ItemList',
  props: {
    items: {
      type: Array as () => Item[],
      required: true
    }
  },
  setup(props, { emit }) {
    const editModalOpen = ref(false);
    const deleteModalOpen = ref(false);
    const selectedItemForEdit = ref<Item | null>(null);
    let selectedItemForDelete: number | null = null;

    const openEditModal = (item: Item) => {
      selectedItemForEdit.value = { ...item };
      editModalOpen.value = true;
    };

    const openDeleteModal = (itemId: number) => {
      selectedItemForDelete = itemId;
      deleteModalOpen.value = true;
    };

    const closeEditModal = () => {
      editModalOpen.value = false;
      selectedItemForEdit.value = null;
    };

    const closeDeleteModal = () => {
      deleteModalOpen.value = false;
      selectedItemForDelete = null;
    };

    const handleEditSubmit = (updatedItem: Item) => {
      emit('edit', updatedItem);
      closeEditModal();
    };

    const handleDelete = async () => {
      if (selectedItemForDelete !== null) {
        try {
          await deleteItem(selectedItemForDelete);
          emit('delete', selectedItemForDelete);
          closeDeleteModal();
        } catch (error) {
          console.error('Erro ao excluir item:', error);
        }
      }
    };

    return {
      openEditModal,
      openDeleteModal,
      editModalOpen,
      deleteModalOpen,
      closeEditModal,
      closeDeleteModal,
      handleEditSubmit,
      handleDelete
    };
  }
});
</script>

<style>
/* Estilos opcionais para a tabela */
</style>
