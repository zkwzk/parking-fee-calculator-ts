import axios from 'axios';
const baseUrl = 'http://localhost:3000';
describe('helloworld api test', () => {
    it('should return hello world', async () => {
        const response = await axios.get(baseUrl + '/hello');
        expect(response.status).toBe(200);
        expect(response.data).toBe('Hello, world!');
    })
})