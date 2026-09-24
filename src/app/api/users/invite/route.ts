import { NextResponse } from 'next/server';
import { query, getOne } from '@/lib/db';
import { Resend } from 'resend';
import crypto from 'crypto';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, role, tenant_id } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const roleName = role || 'client';
    const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    // Check if user already exists in Better Auth "user" table
    const existingUser = await getOne<{ id: string; email: string }>(
      `SELECT id, email FROM "user" WHERE LOWER(email) = LOWER($1)`,
      [email]
    );

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
      // Update existing user role and tenant
      await query(
        `UPDATE "user" SET name = $1, role = $2, "tenantId" = $3, "updatedAt" = $4 WHERE id = $5`,
        [full_name || email, roleName, tenant_id || null, new Date().toISOString(), userId]
      );
    } else {
      userId = crypto.randomUUID();
      // Insert new user into Better Auth table
      await query(
        `INSERT INTO "user" (id, name, email, "emailVerified", role, "tenantId", "createdAt", "updatedAt")
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          userId,
          full_name || email,
          email.toLowerCase(),
          false,
          roleName,
          tenant_id || null,
          new Date().toISOString(),
          new Date().toISOString(),
        ]
      );
    }

    // Upsert into public.profiles for backward compatibility
    const profileSql = `
      INSERT INTO public.profiles (id, full_name, role, tenant_id, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        role = EXCLUDED.role,
        tenant_id = EXCLUDED.tenant_id,
        updated_at = EXCLUDED.updated_at
      RETURNING *
    `;

    const profile = await getOne(profileSql, [
      userId,
      full_name || email,
      roleName,
      tenant_id || null,
      new Date().toISOString(),
      new Date().toISOString(),
    ]);

    // Send invitation email if Resend is configured
    if (resend) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'Nisol AI <grants@nisolai.com>',
          to: [email],
          subject: 'You have been invited to the Nisol 360 Assessment Portal',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #0A1E3C; color: #fff; border-radius: 12px;">
              <h2 style="color: #fff;">Welcome to Nisol 360™</h2>
              <p style="color: #cbd5e1;">You have been invited to access the enterprise intelligence and maturity audit workspace as a <strong>${roleName}</strong>.</p>
              <div style="margin: 24px 0;">
                <a href="${siteUrl}/login" style="background: #EBB44B; color: #0A1E3C; font-weight: bold; padding: 12px 24px; border-radius: 8px; text-decoration: none; display: inline-block;">
                  Sign In to Workspace →
                </a>
              </div>
              <p style="color: #64748b; font-size: 12px;">Nisol AI Architecture Practice</p>
            </div>
          `,
        });
      } catch (emailErr) {
        console.warn('Failed to send invitation email via Resend:', emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: `User profile and account configured for ${email}`,
      user: profile || { id: userId, email, role: roleName },
    });
  } catch (err: any) {
    console.error('Error inviting user:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process user invitation' },
      { status: 500 }
    );
  }
}
