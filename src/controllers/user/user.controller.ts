import { BodyParams, Controller, Get, Post, Status, PathParams, Authenticated, Required, Req, HttpServer, Delete, Put } from 'ts-express-decorators';
import { Validate, Validator } from 'typescript-param-validator';
import { Returns } from 'ts-express-decorators/lib/swagger';
import { User } from '../../dal/User';
import { UserService } from '../../services/user/user.service';
import { IAppRequest } from '../../types/app.types';
import { HTTPStatusCodes } from '../../types/http';
import { AuthDto } from '../../services/auth/auth.dto';
import { UserUpdateDto } from './user.dto';
import { debug } from 'util';
import { ApiError } from '../../utils/error';
import { API_ERRORS } from '../../types/app.errors';

@Controller('/users')
@Authenticated()
export class UserController {
    constructor(
        private userService: UserService
    ) {

    }

    @Get('/')
    @Returns(Array)
    async getUsers(): Promise<User[]> {
        return await this.userService.getAllUsers();
    }

    @Get('/:id([0-9a-f]{24})')
    @Returns(User)
    async getUser(@Required() @PathParams('id') id: string): Promise<User> {
        return await this.userService.getUserById(id);
    }

    @Get('/auth-test')
    async authTest(@Req() req: IAppRequest): Promise<string> {
        return `hello ${req.user._id}`;
    }

    @Put('/update')
    @Returns(UserUpdateDto)
    @Status(HTTPStatusCodes.OK)
    @Validate()
    async update(
        @Req() req: IAppRequest,
        @Validator() @BodyParams() data: UserUpdateDto
    ) {
        if (!req.user) { throw new ApiError(API_ERRORS.USER_NOT_FOUND); }
        const userId = req.user._id;
        const user = await this.userService.updateUser(userId, data);
        return user;
    }

    @Delete('/delete')
    @Returns(Boolean)
    @Status(HTTPStatusCodes.OK)
    async delete(
        @Req() req: IAppRequest
    ) {
        if (!req.user) { throw new ApiError(API_ERRORS.USER_NOT_FOUND); }
        const userId = req.user._id;
        const response = await this.userService.deleteUser(userId);
        return response;
    }

}