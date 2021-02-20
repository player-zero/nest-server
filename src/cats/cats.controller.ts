import { Body, Controller, Get, Header, HttpCode, HttpStatus, Param, Post, Query, Redirect, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express'
import { CreateCatDto } from './create-cat.dto';

@Controller('cats') // общий узел запросов
export class CatsController {
    @Get() // декоратор для перенаправления GET запросов
    findAll(): string {
        return 'This action returns all cats'
    }

    @Get('profile') // перенаправление на /cats/profile
    view(): string {
        return 'This action returns cat\'s profile'
    }

    @Get('client-request')
    getClientRequest(@Req() request: Request): string {
        console.log(request)
        // как правило всё тело запроса не требуется, можно получать часть
        // @Body, @Query и так далее https://docs.nestjs.com/controllers
        return 'This action returns client request'
    }

    @Post() // существуют декораторы для всех типов запросов и декоратор @Any()
    @HttpCode(201) // по умолчанию коды 200(у Post 201)
    @Header('Cache-Control', 'none') // заголовки
    create(): string {
        return 'This action create a new cat'
    }

    @Get('ab*cd') // регулярки
    findRegex(): string {
        return 'This route uses a wildcard (regexp)'
    }

    @Get('docs')
    @Redirect('https://docs.nestjs.com', 302) // редирект
    getDocs(@Query('version') version) {
        if(version && version === 5) {
            // переопределение редиректа
            return { url: 'https://docs.nestjs.com/v5/'} 
        }
    }

    @Get('params/:id') // параметры запросов
    findOne(@Param() params): string {
        return `This action returns a ${params.id} cat`
    }

    @Get('async')
    async findAsyncAll(): Promise<any[]> { 
        // асинхронные методы должны возвращать промисы
        return []
    }

    @Post('async-create')
    async createAsync(@Body() createCatDto: CreateCatDto) {
        // dto объект определяет, как данные будут отправляться по сети
        return 'This action adds a new async cat'
    }

    // интеграция express
    @Get('express')
    findAllExpress(@Res({passthrough: true}) res: Response) {
        // passthrough: true - поддержка обратной совместимости с nest
        res.status(HttpStatus.OK).json([{hello: "world"}])
    }
}
