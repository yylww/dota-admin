
export const authConfig = {
  providers: [],
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl} }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      const callbackUrl = decodeURIComponent(nextUrl.search.split('callbackUrl=')[1])
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      if (isOnLogin && isLoggedIn) {
        return Response.redirect(callbackUrl);
      }
      // else if (isLoggedIn) {
      //   return Response.redirect(new URL('/dashboard', nextUrl));
      // }
      return true;
    },
  },
}