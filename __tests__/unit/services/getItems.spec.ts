import { describe, it, expect, vi } from "vitest";
import axios from "axios";
import { getItems } from '../../../services/getItems';

vi.mock('axios'); // Configuração do mock antes de importar getItems

describe('getItems function testing', () => {
    it('should fetch items from API', async () => {
        const realItems = [{ id: 1, name: 'Item 1' }, { id: 2, name: 'Item 2' }];

        // Mocka a chamada do axios.get com os dados capturados da API real
        const mockGetItems = vi.fn(async () => ({
            data: realItems
        }));

        axios.get.mockImplementationOnce(mockGetItems);

        const items = await getItems();

        expect(items).toEqual(realItems);
        expect(axios.get).toHaveBeenCalledWith('http://localhost:4500/itens');
    });

    it('should handle API request error', async () => {
        const errorMessage = 'Internal Server Error';

        const mockErrorGetItems = vi.fn(async () => {
            return Promise.reject({ response: { status: 500, data: { message: errorMessage } } });
        });

        axios.get.mockImplementationOnce(mockErrorGetItems);

        try {
            await getItems();
            throw new Error('A função getItems deveria lançar um erro.');
        } catch (error) {
            expect(error.message).toEqual('Erro ao buscar itens da API');
        }
    });

});
