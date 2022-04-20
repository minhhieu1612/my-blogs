import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { sessionOptions } from "../../libs/session";
import bcrypt from "bcrypt";

export default withIronSessionApiRoute(loginRoute, sessionOptions);

const saltRounds = 12;
async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { username, password } = await req.body;

  try {
    const hash = await bcrypt.hash(
      process.env.SYSADMIN_PASSWORD as string,
      saltRounds
    );
    const match = await bcrypt.compare(password, hash);

    if (username === process.env.SYSADMIN_USERNAME && match) {
      const user = {
        isLoggedIn: true,
        login: new Date().getTime().toString(),
      };

      req.session.user = user;
      await req.session.save();
      res.status(200).json(user);
    } else {
      res.status(401).json({});
    }
  } catch (error) {
    res.status(500).json({});
  }
}
