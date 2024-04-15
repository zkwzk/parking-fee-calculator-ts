class HelloService {
    sayHello() {
        console.log('sayHello called')
        return 'Hello, world!';
    }
}

export const helloService = new HelloService();