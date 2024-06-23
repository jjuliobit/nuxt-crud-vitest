// createItems.ts
import axios from 'axios';
import type { Item } from '@/types/Item';

const API_BASE = 'http://localhost:4500/itens'; // URL base da API

export const createItem = async (item: Omit<Item, 'id'>): Promise<Item> => {
    try {
        const response = await axios.post<Item>(API_BASE, item);
        return response.data;
    } catch (error) {
        console.error('Erro ao criar item:', error);
        throw new Error('Erro ao criar item na API');
    }
};
