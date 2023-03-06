import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import {FastifyRequest , FastifyReply } from 'fastify'


type badRequestType = string | {
    message: string | string[]
    error: string,
    statusCode: number
}

@Catch()
export class GeneralException  implements ExceptionFilter{
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<FastifyReply>();
        const request = ctx.getRequest<FastifyRequest>();
        const status = exception.getStatus();
    
        let resErr = exception.getResponse() as badRequestType;

        switch(status){
            case 400 :
                return response
                .status(200)
                .send({
                    err: 'Tutti o alcuni dati inviati, non sono del formato richiesto',
                    statusCode: status,
                    msg: typeof resErr === 'object' ? resErr.message : resErr,
                    path: request.url,
                })
            case 401 : 
                return response
                .status(200)
                .send({
                    err: 'non autenticato',
                    statusCode: status,
                    msg: 'non sei autenticato per questa richiesta',
                    path: request.url,
                })

            default:
                return response
                .status(200)
                .send({
                    err:'imprevisto',
                    statusCode: status,
                    path: request.url,
                    msg: typeof resErr === 'object' ? resErr.message : resErr,
                })
        }
                
      }
}