import { Inject, Service } from 'ts-express-decorators';
import { UserRepositoryToken } from '../../dal/token-constants';
import { UserRepository, UserInstance, User } from '../../dal/User';
import { IAuthProviderProfileDto } from '../auth/auth.dto';
import { ApiError } from '../../utils/error';
import { UnexpectedError } from '../../utils/error/UnexpectedError';
import { MongoErrorCode } from '../../types/mongo';
import { API_ERRORS } from '../../types/app.errors';
import { validateEmail } from '../../utils/helper.service';
import { Model } from 'mongoose';
import { ModelType } from 'typegoose';
import { ObjectId } from 'bson';

@Service()
export class UserService {
    constructor(
        @Inject(UserRepositoryToken) private userRepository: UserRepository
    ) {

    }

    async getUserById(userId: string) {
        console.log(`Going to get user: ${userId} ...`);
        return await this.userRepository.findById(userId, 'firstName lastName email fullName picture');
    }

    async getAllUsers() {
        console.log('Going to get all users ...');
        return await this.userRepository.find({});
    }

    async updateUser(userId: ObjectId, profile: IAuthProviderProfileDto): Promise<UserInstance> {
        this.validateProfile(profile);
        console.log(`Going to update user: ${userId} with params ${JSON.stringify(profile)} ...`);
        try {
            return new Promise<UserInstance>((resolve, reject) => {
                const updatedUser = this.userRepository.findOne(userId, {returnOriginal: false}, (err, user) => {
                    Object.assign(user, profile);
                    user.save((err) => {
                        if (err) {
                            reject(err);
                            console.error(`Error updating user: ${userId} error: ${err}`);
                        }
                    });
                    resolve(user);
                });
            });
        } catch (e) {
            throw new UnexpectedError();
        }
    }

    async deleteUser(userId: ObjectId): Promise<boolean> {
        console.log(`Going to delete user: ${userId} ...`);
        try {
            return new Promise<boolean>((resolve, reject) => {
                const deleteUser = this.userRepository.findOne(userId, (err, user) => {
                    user.remove((err) => {
                        if (err) {
                            reject(false);
                            console.error(`Error deleting user: ${userId} error: ${err}`);
                        }
                    });
                    resolve(true);
                });
            });
        } catch (e) {
            throw new UnexpectedError();
        }
    }

    private validateProfile(profile: IAuthProviderProfileDto) {
        if (!profile.email) throw new ApiError('Missing email field', 400);
        if (!validateEmail(profile.email)) throw new ApiError('Invalid email address', 400);
        if (!profile.firstName) throw new ApiError('Missing firstName field', 400);
        if (profile.password && profile.password.length < 6) throw new ApiError('Password must be 6 char long', 400);
    }

}