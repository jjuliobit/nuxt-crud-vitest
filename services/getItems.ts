// getItems.ts
import axios from 'axios';
import type { Item } from '@/types/Item';

const API_BASE = 'http://localhost:4500/itens'; // URL base da API

export const getItems = async (): Promise<Item[]> => {
    try {
        const response = await axios.get<Item[]>(API_BASE);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar itens:', error);
        throw new Error('Erro ao buscar itens da API');
    }
};