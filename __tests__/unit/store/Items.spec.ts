import { useItemsStore } from "~/store/Items";
describe('Testando na PINIA', () => {
    it('should add, update, and delete items correctly', async () => {
        const store = useItemsStore();

        // Adicionando itens
        store.addItem(
            {
                "id": "1",
                "filial": "Filial01",
                "hostname": "Host01",
                "usuario": "Usuario01",
                "equipamento": "Equipamento01",
                "marca": "Marca01",
                "numeroDeSerie": "NS01"
            }

        );

        store.addItem(
            {
                "id": "2",
                "filial": "Filial02",
                "hostname": "Host02",
                "usuario": "Usuario02",
                "equipamento": "Equipamento02",
                "marca": "Marca02",
                "numeroDeSerie": "NS02"
            }

        );

        // Verificando se os itens foram adicionados corretamente
        expect(store.items).toHaveLength(2);
        expect(store.items[0].filial).toBe('Filial01');
        expect(store.items[1].filial).toBe('Filial02');

        // Atualizando um item
        store.updateItem({ ...store.items[0], filial: 'Updated Item 1' });
        expect(store.items[0].filial).toBe('Updated Item 1');

        // Deletando um item
        store.deleteItem('2')
        expect(store.items).toHaveLength(1);

        // Verificando se o item foi deletado corretamente
        expect(store.items[0].filial).not.toBe('Item 2');
    });
});