import { helloService } from '../services/helloService';
import { Request, Response } from 'express';

export class HelloWorldController {
  public getHelloWorld(req: Request, res: Response): void {
    console.log('getHelloWorld called')
    res.send(helloService.sayHello());
  }
}