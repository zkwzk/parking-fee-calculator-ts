import { helloService } from "../helloService"

describe('helloService', () => {
    it('should return hello world', () => {
        expect(helloService.sayHello()).toBe('Hello, world!');
    });
});