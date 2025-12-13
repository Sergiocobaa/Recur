import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
    const dynamic = 'force-dynamic';

    const today = new Date();
    today.setDate(today.getDate() + 3);
    const targetDate = today.toISOString().split('T')[0];

    try {
        const { data: subscriptions, error } = await supabaseAdmin
            .from('subscriptions')
            .select('*, profiles(email, full_name)')
            .eq('next_payment_date', targetDate);

        if (error) {
            console.error("Error Supabase:", error);
            throw error;
        }

        if (!subscriptions || subscriptions.length === 0) {
            return NextResponse.json({ message: 'Nadie renueva en 3 días (Admin check)' });
        }

        for (const sub of subscriptions) {
            const email = sub.profiles?.email;
            const name = sub.profiles?.full_name || "Usuario";

            const dateFormatted = new Date(targetDate).toLocaleDateString('es-ES', {
                day: 'numeric', month: 'long', year: 'numeric'
            });

            if (email) {
                const emailHtml = getHtmlTemplate(name, sub.name, sub.price, dateFormatted);

                await resend.emails.send({
                    from: 'Recur <onboarding@resend.dev>',
                    to: email,
                    subject: `🔔 ${sub.name} se renueva pronto`,
                    html: emailHtml
                });
            }
        }

        return NextResponse.json({ success: true, count: subscriptions.length });
    } catch (error) {
        return NextResponse.json({ error: 'Error en cron' }, { status: 500 });
    }
}

function getHtmlTemplate(userName: string, serviceName: string, price: number, date: string) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
    </head>
    <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #334155; background-color: #f8fafc; margin: 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
            
            <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background-color: #0f172a; color: white; padding: 8px 12px; border-radius: 8px; font-weight: bold; font-size: 20px;">R.</div>
                <span style="font-weight: bold; font-size: 20px; vertical-align: middle; margin-left: 8px; color: #0f172a;">Recur</span>
            </div>

            <div style="background-color: white; border-radius: 16px; padding: 40px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
                
                <h1 style="margin-top: 0; font-size: 24px; color: #0f172a;">Hola, ${userName} 👋</h1>
                <p style="font-size: 16px; color: #64748b;">
                    Esto es un recordatorio amistoso de que una de tus suscripciones está a punto de renovarse.
                </p>

                <div style="background-color: #f1f5f9; border-radius: 12px; padding: 20px; margin: 25px 0; border: 1px solid #e2e8f0;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                            <td style="padding-bottom: 8px; color: #64748b; font-size: 14px;">Servicio</td>
                            <td style="padding-bottom: 8px; color: #0f172a; font-weight: bold; text-align: right; font-size: 16px;">${serviceName}</td>
                        </tr>
                        <tr>
                            <td style="padding-bottom: 8px; color: #64748b; font-size: 14px;">Fecha de cobro</td>
                            <td style="padding-bottom: 8px; color: #0f172a; font-weight: bold; text-align: right; font-size: 16px;">${date}</td>
                        </tr>
                        <tr>
                            <td style="border-top: 1px solid #cbd5e1; padding-top: 8px; color: #64748b; font-size: 14px;">Importe</td>
                            <td style="border-top: 1px solid #cbd5e1; padding-top: 8px; color: #0f172a; font-weight: bold; text-align: right; font-size: 18px;">${price.toFixed(2)}€</td>
                        </tr>
                    </table>
                </div>

                <p style="font-size: 16px; color: #64748b;">
                    Si quieres cancelar este servicio, asegúrate de hacerlo antes de la fecha indicada para evitar el cargo.
                </p>

                <div style="text-align: center; margin-top: 30px;">
                    <a href="https://recurappsc.vercel.app/dashboard" style="display: inline-block; background-color: #0f172a; color: white; text-decoration: none; padding: 12px 30px; border-radius: 50px; font-weight: bold; font-size: 16px; box-shadow: 0 4px 6px rgba(15, 23, 42, 0.2);">
                        Ir a mi Dashboard
                    </a>
                </div>
            </div>

            <div style="text-align: center; margin-top: 30px; color: #94a3b8; font-size: 12px;">
                <p>© 2025 Recur Inc. Gestiona tus gastos inteligentemente.</p>
                <p>No respondas a este correo, es automático.</p>
            </div>
        </div>
    </body>
    </html>
    `;
}