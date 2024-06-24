import type { Item } from '@/types/Item';
import axios from "axios";
import { createItem } from '@/services/createItems';

vi.mock('axios');

describe('function testing', () => {
    it('should return an item with the correct properties', async () => {
        const mockItem: Item = {
            id: 1,
            filial: 'filial',
            hostname: 'hostname',
            usuario: 'usuario',
            equipamento: 'equipamento',
            marca: 'marca',
            numeroDeSerie: 'numeroDeSerie'
        };

        const mockCreateItem = vi.fn(async () => ({
            data: mockItem
        }));

        axios.post.mockImplementation(mockCreateItem);

        const data = await createItem(mockItem);

        // Verificar as propriedades usando 'if'
        if (data) {
            expect(data.id).toEqual(expect.any(Number));
            expect(data.filial).toEqual(expect.any(String));
            expect(data.hostname).toEqual(expect.any(String));
            expect(data.usuario).toEqual(expect.any(String));
            expect(data.equipamento).toEqual(expect.any(String));
            expect(data.marca).toEqual(expect.any(String));
            expect(data.numeroDeSerie).toEqual(expect.any(String));
        } else {
            throw new Error('Expected data to be defined');
        }

        expect(mockCreateItem).toHaveBeenCalledWith('http://localhost:4500/itens', mockItem);
    });
});
