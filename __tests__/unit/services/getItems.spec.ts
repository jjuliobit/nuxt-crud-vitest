import { getItems } from '@/services/getItems';

describe('getItems function integration test', () => {
    it('should return an array of objects with the correct property names from the real API', async () => {
        const result = await getItems();
        // console.log(result);

        // Verifique se o resultado é um array
        expect(Array.isArray(result)).toBe(true);

        // Propriedades esperadas em cada objeto do array
        const expectedProperties = [
            "id",
            "filial",
            "hostname",
            "usuario",
            "equipamento",
            "marca",
            "numeroDeSerie"
        ];

        // Verifica se todas as propriedades esperadas estão presentes em cada objeto do array
        result.forEach(item => {
            expectedProperties.forEach(property => {
                expect(item).toHaveProperty(property);
            });
        });
    });

});
