import { redirect } from 'next/navigation';

// This page only renders when app is build statically

export default function RootPage() {
  redirect('/en');
}
