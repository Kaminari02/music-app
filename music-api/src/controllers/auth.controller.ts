import { Router, Request, Response } from "express";
import User from "@src/models/User";
import { AuthCredentialsDto } from "@src/dto/AuthCredentials.dto";

const controller = Router();

controller.post('/signup', async (req: Request, res: Response) => {
    const user = new User(req.body as AuthCredentialsDto);
    user.generateToken();
    try {
        await user.save();
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
});

controller.post('/signin', async (req: Request, res: Response) => {
    const {password, username} = req.body as AuthCredentialsDto
    const user = await User.findOne({username: username})
    if(!user) {
        return res.status(400).send({error: 'user not found'});
    }
    if (password) {
        const isMatch = user.checkPassword(password);
        if(!isMatch) {
            return res.status(400).send({error: 'password is wrong'});
        }
        user.generateToken();
        user.save()
        res.send(user)
    } else {
        return res.status(400).send({error: 'password is required'});
    }
});

controller.delete('/logout', async (req: Request, res: Response) => {
    const token = req.get('Authorization');
  
    if(!token) {
      return res.status(401).send({error: 'No token presented'});
    }
  
    const user = await User.findOne({token});
  
    if(!user) {
      return res.send({ message: `Logout success`});
    } 
    user.generateToken();
    await  user.save({validateBeforeSave: false})
    return res.send({message: 'Logout success'})
  
});

export default controller;