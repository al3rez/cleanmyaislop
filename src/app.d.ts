// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces

import type { SessionUser } from '$lib/server/auth';

declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user?: SessionUser;
      session?: {
        id: string;
        expiresAt: Date;
      };
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
