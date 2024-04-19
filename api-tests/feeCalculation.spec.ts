import axios from 'axios';
const baseUrl = 'http://localhost:3000';
describe('fee calculation api test', () => {
    it('should return calculated fee list', async () => {
        const response = await axios.get(baseUrl + '/calculateFee');
        expect(response.status).toBe(200);
        expect(response.data).toStrictEqual({"Plaza Singapura":42.6,"Orchard Central":53.06,"Takashimaya Shopping Centre":58.46});
    })
})