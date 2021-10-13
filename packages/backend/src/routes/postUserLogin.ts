import { Express } from 'express';
import { Routes } from '@ramp/utils/types/routes';
import { IUserLogin } from '@ramp/utils/types/userLogin';
import { testUser } from '@ramp/utils/mocks/users';
import jwt from 'jsonwebtoken';

const postUserLogin = (app: Express) => {
  app.post(Routes.LOGIN, (req, res) => {
    const loginInfo: IUserLogin = req.body;
    if (loginInfo.username === testUser.username && loginInfo.password === testUser.password) {
      console.log('GENERATE JWT');
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60,
          data: loginInfo,
        },
        'secret',
      );
      res.json(token);
    }
  });
};

export default postUserLogin;
