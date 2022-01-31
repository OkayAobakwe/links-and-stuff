import { Context } from "./context";

export const resolvers = {
  Query: {
    links: ( _parent: any, _args: any, ctx: Context) => {
      return ctx.prisma.link.findMany()
    }
  }
}