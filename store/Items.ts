// store/items.ts
import { reactive } from 'vue';
import axios from 'axios';
import type { Item } from '@/types/Item';

interface ItemsStore {
    items: Item[];
    setItems: (items: Item[]) => void;
    addItem: (item: Item) => void;
    updateItem: (item: Item) => void;
    deleteItem: (id: number) => void;
}

export const useItemsStore = (): ItemsStore => {
    const state = reactive({
        items: [] as Item[],
    });

    const setItems = (items: Item[]) => {
        state.items = items;
    };

    const addItem = (item: Item) => {
        state.items.push(item);
    };

    const updateItem = (updatedItem: Item) => {
        const index = state.items.findIndex(item => item.id === updatedItem.id);
        if (index !== -1) {
            state.items[index] = updatedItem;
        }
    };

    const deleteItem = (id: number) => {
        state.items = state.items.filter(item => item.id !== id);
    };

    return {
        items: state.items,
        setItems,
        addItem,
        updateItem,
        deleteItem,
    };
};
