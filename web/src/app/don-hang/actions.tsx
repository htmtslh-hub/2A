'use client';
import { signOut } from 'next-auth/react';

export function SignOutButton({ label }: { label: string }) {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: '/' })}
      style={{
        padding: '10px 18px',
        borderRadius: 100,
        cursor: 'pointer',
        fontFamily: 'inherit',
        fontSize: 13,
        fontWeight: 600,
        color: '#c8ced6',
        background: 'rgba(255,255,255,.06)',
        border: '1px solid rgba(255,255,255,.18)',
      }}
    >
      {label}
    </button>
  );
}
