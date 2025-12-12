import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
// Necesitarás instalar resend: npm install resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET() {
    // 1. Calculamos la fecha de "dentro de 3 días"
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const targetDate = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

    try {
        // 2. Buscamos en Supabase quién renueva ese día
        // (Asegúrate de que en Supabase la columna 'start_date' o 'next_payment' sea correcta)
        const { data: subscriptions, error } = await supabase
            .from('subscriptions')
            .select('*, profiles(email, full_name)') // Hacemos un JOIN para sacar el email del usuario
            .eq('next_payment_date', targetDate); // Asumiendo que creaste esta columna o calculas en base a start_date

        if (error) throw error;

        if (!subscriptions || subscriptions.length === 0) {
            return NextResponse.json({ message: 'Nadie renueva en 3 días' });
        }

        // 3. Enviamos los emails
        for (const sub of subscriptions) {
            // @ts-ignore
            const email = sub.profiles?.email;
            // @ts-ignore
            const name = sub.profiles?.full_name || "Usuario";

            if (email) {
                await resend.emails.send({
                    from: 'Recur <alertas@tu-dominio.com>', // O el de prueba de Resend
                    to: email,
                    subject: `⚠️ ${sub.name} se renueva pronto`,
                    html: `<p>Hola ${name}, tu suscripción a <strong>${sub.name}</strong> por <strong>${sub.price}€</strong> se cobrará el ${targetDate}.</p>`
                });
            }
        }

        return NextResponse.json({ success: true, count: subscriptions.length });
    } catch (error) {
        return NextResponse.json({ error: 'Error en cron' }, { status: 500 });
    }
}