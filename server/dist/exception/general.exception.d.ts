/// <reference types="node" />
import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { FastifyReply } from 'fastify';
export declare class GeneralException implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): FastifyReply<import("fastify").RawServerDefault, import("http").IncomingMessage, import("http").ServerResponse<import("http").IncomingMessage>, import("fastify").RouteGenericInterface, unknown, import("fastify").FastifySchema, import("fastify").FastifyTypeProviderDefault, unknown>;
}
