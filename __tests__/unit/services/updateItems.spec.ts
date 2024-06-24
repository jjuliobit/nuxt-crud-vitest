import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { updateItem } from '@/services/updateItems';

vi.mock('axios'); // Configuração do mock antes de importar updateItem

describe('updateItem function testing', () => {
    it('should update item in API', async () => {
        const itemToUpdate = { id: 1, name: 'Updated Item' };

        // Mocka a chamada do axios.put para sucesso
        const mockUpdateItem = vi.fn(async () => {
            // Simulando uma resposta vazia, já que PUT não retorna dados
            return Promise.resolve({});
        });

        axios.put.mockImplementationOnce(mockUpdateItem);

        await updateItem(itemToUpdate);

        // Verifica se axios.put foi chamado com a URL correta e o item correto
        expect(axios.put).toHaveBeenCalledWith(`http://localhost:4500/itens/${itemToUpdate.id}`, itemToUpdate);
    });

    it('should handle API request error', async () => {
        const itemToUpdate = { id: 1, name: 'Updated Item' };
        const errorMessage = 'Internal Server Error';

        // Mockando uma falha de requisição com status HTTP 500
        const mockErrorUpdateItem = vi.fn(async () => {
            return Promise.reject({ response: { status: 500, data: { message: errorMessage } } });
        });

        axios.put.mockImplementationOnce(mockErrorUpdateItem);

        try {
            await updateItem(itemToUpdate);
            throw new Error('A função updateItem deveria lançar um erro.');
        } catch (error) {
            expect(error.message).toEqual('Erro ao atualizar item na API');
        }
    });

});
