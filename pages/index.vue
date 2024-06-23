<template>
  <div class="space-y-8">
    <h1 class="text-3xl font-bold">Items</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <ItemList :items="items" @edit="startEdit" @delete="handleDelete" />
      </div>
      <div>
        <ItemForm :item="editingItem" @submit="handleSubmit" @cancel="cancelEdit" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ItemList from '~/components/ItemList.vue';
import ItemForm from '~/components/ItemForm.vue';
import { getItems } from '~/services/getItems'; // Importar função para buscar itens
import { createItem } from '~/services/createItems'; // Importar função para criar item
import { updateItem } from '~/services/updateItems'; // Importar função para atualizar item
import { deleteItem } from '~/services/deleteItems'; // Importar função para excluir item
import type { Item } from '~/types/Item';

export default {
  components: {
    ItemList,
    ItemForm
  },
  setup() {
    const items = ref<Item[]>([]);
    const editingItem = ref<Item | null>(null);

    const fetchItems = async () => {
      try {
        const itemsData = await getItems();
        items.value = itemsData; // Atualiza a lista de itens com os dados da API
      } catch (error) {
        console.error('Erro ao buscar itens:', error);
      }
    };

    const addItem = async (item: Omit<Item, 'id'>) => {
      try {
        const newItem = await createItem(item);
        items.value.push(newItem); // Adiciona o novo item na lista local
      } catch (error) {
        console.error('Erro ao adicionar item:', error);
      }
    };

    const updateItemLocally = (item: Item) => {
      const index = items.value.findIndex(i => i.id === item.id);
      if (index !== -1) {
        items.value[index] = item; // Atualiza o item na lista local
      }
    };

    const updateItemOnServer = async (item: Item) => {
      try {
        await updateItem(item);
        updateItemLocally(item); // Atualiza o item na lista local após a atualização no servidor
      } catch (error) {
        console.error('Erro ao atualizar item:', error);
      }
    };

    const deleteItemLocally = (id: number) => {
      items.value = items.value.filter(item => item.id !== id); // Remove o item da lista local
    };

    const deleteItemOnServer = async (id: number) => {
      try {
        await deleteItem(id);
        deleteItemLocally(id); // Remove o item da lista local após a exclusão no servidor
      } catch (error) {
        console.error('Erro ao excluir item:', error);
      }
    };

    const handleSubmit = async (item: Omit<Item, 'id'>) => {
      if (editingItem.value) {
        await updateItemOnServer({ ...editingItem.value, ...item });
        editingItem.value = null;
      } else {
        await addItem(item);
      }
    };

    const startEdit = (item: Item) => {
      editingItem.value = item;
    };

    const cancelEdit = () => {
      editingItem.value = null;
    };

    const handleDelete = async (itemId: number) => {
      if (confirm('Tem certeza que deseja excluir este item?')) {
        await deleteItemOnServer(itemId);
      }
    };

    onMounted(() => {
      fetchItems(); // Busca os itens ao montar o componente
    });

    return {
      items,
      editingItem,
      handleSubmit,
      startEdit,
      cancelEdit,
      handleDelete
    };
  }
};
</script>

<style>
/* Estilos específicos para a página */
</style>
