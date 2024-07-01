import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signupInput, SignupInput, signinInput } from "@zohaib0706/medium-common"

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>();

userRouter.get('/data', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  try{
      const header = c.req.header("authorization") || "";
      const token = header.split(" ")[1];
      const res = await verify(token, c.env.JWT_SECRET);
      if(res.id){
        console.log(res.id);
        //@ts-ignore
        const  id : string  = res.id 
        const username = await prisma.user.findUnique({
          where: {
            id
          },
          select: {
            username: true
          }
        })
        return c.json({username});
      }
    }catch(e){
      c.status(403);
      return c.json({message: "Error while finding the user data"});
    }
    
  })
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message: "Wrong Inputs"
    });
  }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    try{
      const userData: SignupInput = {
        email: body.email,
        password: body.password,
      }
      if(body.username){
        userData.username = body.username
      }
      const user = await prisma.user.create({
        data: userData
      });
      const token = await sign({id: user.id}, c.env.JWT_SECRET);
      return c.json({token});
    }catch(e){
      c.status(403);
      return c.json({error: "error while signup"});
    }
    
  })
  
  userRouter.post('/signin', async (c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success){
      c.status(411);
      return c.json({
        message: "Wrong Inputs"
      });
    }

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password
      }
    });
  
    if(!user){
      c.status(403);
      return c.json({error: "User not found"});
    }
    const jwt = await sign({id: user.id},c.env.JWT_SECRET);
    return c.json({ jwt });
  })