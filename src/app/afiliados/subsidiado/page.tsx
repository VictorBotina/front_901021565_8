// src/app/afiliados/subsidiado/page.tsx
import { redirect } from 'next/navigation';

export default function SubsidiadoPage() {
  // Redirect to the main information page of the section
  redirect('/afiliados/subsidiado/informacion');
}
