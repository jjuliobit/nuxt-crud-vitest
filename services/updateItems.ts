// updateItems.ts
import axios from 'axios';
import type { Item } from '@/types/Item';

const API_BASE = 'http://localhost:4500/itens'; // URL base da API

export const updateItem = async (item: Item): Promise<void> => {
    try {
        await axios.put(`${API_BASE}/${item.id}`, item);
    } catch (error) {
        console.error('Erro ao atualizar item:', error);
        throw new Error('Erro ao atualizar item na API');
    }
};
