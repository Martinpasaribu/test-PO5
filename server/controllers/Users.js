import {PrismaClient} from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const prisma = new PrismaClient();

export const getUsers = async (req, res) =>{
    try {
        const response = await prisma.users.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                password: false 
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}


export const Register = async (req, res) => {
    const {name, email, password, confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({msg: 'Kesalahan Password dan konfirmasi Password'});

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
            const users = await prisma.users.create({
            data: {
                name: name,
                email: email,
                password: hashPassword
            }
        });
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
    
}

    export const Login = async (req, res) => {
        try {
      
            const user = await prisma.users.findMany({
                where : {
                    email: req.body.email,
                }
                
            });

            
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "wrong password"});
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;

      
        const accessToken = jwt.sign({userId, name, email}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });

        const refreshToken = jwt.sign({userId, name, email}, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        // console.log(refreshToken);

        await prisma.users.update({
            where:{
                id: userId
            },
            data: {
              refresh_token: refreshToken
            }
        });


        res.cookie('refreshToken', refreshToken, {
            // sameSite:None,
            // httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        
        });
        res.json({ accessToken});

    } catch (error) {
        res.status(404).json({ msg: " Email atau Username tidak ditemukan"});
    }
}

export const Logout = async(req, res) => { 

    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await prisma.users.findMany( {
        where : {
            refresh_token: refreshToken
        }
    });

    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id ;

    await prisma.users.update ( {
        where: {
            id: userId
        },
        data: {
            refresh_token: null
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
    



}