import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { ExpressApplication, Inject, Service } from 'ts-express-decorators';
import { IAppRequest } from '../../../types/app.types';
import { IAuthProviderProfileDto } from '../auth.dto';
import { AuthService } from '../auth.service';

export enum AUTH_STRATEGY {
    LOCAL_STRATEGY = 'local'
}

@Service()
export class PassportService {
    constructor(
        private authService: AuthService,
        @Inject(ExpressApplication) private expressApplication: ExpressApplication
    ) {
    }

    $beforeRoutesInit() {
        this.expressApplication.use(passport.initialize());
        passport.use(AUTH_STRATEGY.LOCAL_STRATEGY, this.passportLocalStrategy);
    }

    private passportLocalStrategy = new LocalStrategy({
        usernameField: 'email',
        passReqToCallback: true
    }, async (req: IAppRequest, email, password, done) => {
        try {
            const auth = await this.authService.authenticateLocal(email, password);

            done(null, auth);
        } catch (e) {
            done(e);
        }
    });

}
