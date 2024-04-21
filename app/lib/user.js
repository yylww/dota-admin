'use server'

import { signIn } from '@/auth'
import prisma from "@/app/lib/db"

export async function authenticate(prevState, params) {
  try {
    await signIn('credentials', params);  
  } catch (error) {
    if (error.type === 'CredentialsSignin') {
      return 'CredentialSignin';
    }
    throw error;
  }
}

export async function getUser(email) {
  try {
    const user = await prisma.user.findUnique({
      where: { email }
    })
    return user;
  } catch (error) {
    console.error('Failed to fetch user: ', error);
    throw new Error('Failed to fetch user.');
  }
}