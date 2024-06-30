import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@zohaib0706/medium-common'

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    },
    Variables: {
      userid: string;
    }
}>();

blogRouter.use("/*", async (c, next) => {
    //get the header
    //verify the header
    //pass it or give an error
    const header = c.req.header("authorization") || "";
    const token = header.split(" ")[1];
    const res = await verify(token, c.env.JWT_SECRET);
    if(res.id){
      // @ts-ignore
      c.set("userid", res.id);
      await next();
    }else{
      c.status(403);
      return c.json({ error: "unauthorized" });
    }
  })
  
blogRouter.post('/', async (c) => {
  const body = await c.req.json();
  // const { success } = createBlogInput.safeParse(body);
  // if(!success){
  //   c.status(411);
  //   return c.json({
  //     message: "Wrong inputs"
  //   });
  // }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const userid = c.get('userid');
  try{
    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: userid
      }
    })
    return c.json({ id: blog.id });
  }catch(e){
    c.status(403)
    return c.json({message: "Error while posting blog"});
  }
})
  
blogRouter.put('/', async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411)
    return c.json({
      message: "Wrong Inputs"
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const blog = await prisma.post.update({
      where: {
        id: body.id
      },
      data: {
        title: body.title,
        content: body.content,
      }
    })
    return c.json({ id: blog.id });
  }catch(e){
    c.status(403)
    return c.json({message: "Error while updating the blog"});
  }
})
  
//need pagination here
blogRouter.get('/bulk', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  try{
    const blogs = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            username: true
          }
        }
      }
    })
    return c.json({ blogs });
  }catch(e){
    c.status(403)
    return c.json({message: "Error while getting the blogs"});
  }
})


blogRouter.get('/:id',async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const postid = c.req.param("id");
  try{
    const blog = await prisma.post.findFirst({
      where: {
        id: postid
      },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            username: true
          }
        }
      }
    })
    if(!blog){
      c.status(411);
      return c.json({message: "blog not foung"});
    }
    return c.json({ blog });
  }catch(e){
    c.status(403)
    return c.json({message: "Error while getting the blog"});
  }
})
