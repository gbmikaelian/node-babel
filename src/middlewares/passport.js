import passport from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';

import User from 'src/models/User';

/**
 * token auth
 */
passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        ExtractJwt.fromUrlQueryParameter('auth_token')
    ]),
    secretOrKey: process.env.JWT_KEY
}, async (payload, done) => {
    const user = await User.findById(payload.id, { password: 0 });
    return done(null, user);
}));

export default passport;