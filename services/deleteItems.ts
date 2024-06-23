// deleteItems.ts
import axios from 'axios';

const API_BASE = 'http://localhost:4500/itens'; // URL base da API

export const deleteItem = async (itemId: number): Promise<void> => {
    try {
        await axios.delete(`${API_BASE}/${itemId}`);
    } catch (error) {
        console.error('Erro ao excluir item:', error);
        throw new Error('Erro ao excluir item na API');
    }
};
