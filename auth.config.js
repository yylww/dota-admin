export const authConfig = {
  providers: [],
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl} }) {
      const isLoggedIn = !!auth?.user
      return isLoggedIn;
    },
  },
}