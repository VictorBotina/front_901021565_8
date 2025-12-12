'use server';

import { cookies } from 'next/headers';

/**
 * Server Action para establecer el consentimiento de cookies del usuario.
 * @param consent - Booleano que indica si el usuario dio su consentimiento.
 */
export async function setUserAnalyticsConsent(consent: boolean) {
  const cookieStore = await cookies();

  try {
    cookieStore.set('analytics_consent', String(consent), {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 año
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
    return { success: true };
  } catch (error) {
    console.error('Error al establecer la cookie de consentimiento:', error);
    return { success: false, error: 'No se pudo guardar la preferencia.' };
  }
}
