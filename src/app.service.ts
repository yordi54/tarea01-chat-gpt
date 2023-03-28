import { BadRequestException, Injectable } from '@nestjs/common';
import {OpenAIApi, Configuration} from 'openai'
const _apikey: string = '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';
@Injectable()
export class AppService {
  openai: OpenAIApi;
  constructor(){
    const configuration = new Configuration({
      apiKey: _apikey,
    });
    this.openai = new OpenAIApi(configuration);
  }
  
  getHello(): string {
    return 'Hello World!';
  }

  async sendMessage(menssage:string): Promise<any> {
    
    try {
      const response = await this.openai.createCompletion({
        model: 'text-davinci-003',
        prompt: menssage,
        temperature: 0.7,
        max_tokens: 100,

      });
      console.log(response.data.choices)
      return response.data.choices[0].text.trim();
    } catch (error) {
      //generar error badrequest
      console.log(error);
      throw new BadRequestException('consola error'+ error);
    }
  }
}
