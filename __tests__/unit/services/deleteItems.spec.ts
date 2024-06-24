import axios from "axios";
import { deleteItem } from '@/services/deleteItems';

vi.mock('axios'); // Configuração do mock antes de importar deleteItem

describe('deleteItem function testing', () => {
    it('should delete item from API', async () => {
        const itemId = 1;

        // Mocka a chamada do axios.delete para sucesso
        const mockDeleteItem = vi.fn(async () => {
            // Simulando uma resposta vazia, já que DELETE não retorna dados
            return Promise.resolve({});
        });

        axios.delete.mockImplementationOnce(mockDeleteItem);

        await deleteItem(itemId);

        // Verifica se axios.delete foi chamado com a URL correta
        expect(axios.delete).toHaveBeenCalledWith(`http://localhost:4500/itens/${itemId}`);
    });

    it('should handle API request error', async () => {
        const itemId = 1;
        const errorMessage = 'Internal Server Error';

        // Mockando uma falha de requisição
        const mockErrorDeleteItem = vi.fn(async () => {
            return Promise.reject({ response: { status: 500, data: { message: errorMessage } } });
        });

        axios.delete.mockImplementationOnce(mockErrorDeleteItem);

        try {
            await deleteItem(itemId);
            // Se chegou aqui, significa que a função não lançou o erro esperado
            throw new Error('A função deleteItem deveria lançar um erro.');
        } catch (error) {
            // Verifica se o erro lançado é o esperado
            expect(error.message).toEqual('Erro ao excluir item na API');
        }
    });
});
