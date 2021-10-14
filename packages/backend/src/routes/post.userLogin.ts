import { Express } from 'express';
import jwt from 'jsonwebtoken';
import { Routes } from '@ramp/utils/types/routes';
import { IUserLogin } from '@ramp/utils/types/userLogin';
import { testUser } from '@ramp/utils/mocks/users';

export const TOKEN_SECRET = 'secret';
const POST_userLogin = (app: Express) => {
  app.post(Routes.LOGIN, (req, res) => {
    const loginInfo: IUserLogin = req.body;
    if (loginInfo.username === testUser.username && loginInfo.password === testUser.password) {
      console.log('GENERATE JWT');
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: loginInfo,
        },
        TOKEN_SECRET,
        { algorithm: 'HS256' },
      );
      res.json(token);
    }
  });
};

export default POST_userLogin;
