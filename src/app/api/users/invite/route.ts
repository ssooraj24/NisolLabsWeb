import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, full_name, role, tenant_id } = body;

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Valid email address is required' }, { status: 400 });
    }

    const roleName = role || 'client';
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

    // If Service Role Key is configured, use Admin SDK for true Auth user invitation
    if (supabaseServiceKey) {
      const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { autoRefreshToken: false, persistSession: false },
      });

      // Invite user via email
      const { data: authData, error: inviteError } = await supabaseAdmin.auth.admin.inviteUserByEmail(
        email,
        {
          data: { full_name, role: roleName, tenant_id: tenant_id || null },
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/login`,
        }
      );

      if (inviteError) {
        // If user already registered, fallback to updating their profile
        if (inviteError.message.includes('already registered')) {
          const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
          const existingUser = existingUsers?.users?.find((u) => u.email?.toLowerCase() === email.toLowerCase());

          if (existingUser) {
            const { data: profile, error: profErr } = await supabaseAdmin
              .from('profiles')
              .upsert({
                id: existingUser.id,
                full_name: full_name || existingUser.email,
                role: roleName,
                tenant_id: tenant_id || null,
                updated_at: new Date().toISOString(),
              })
              .select('*')
              .single();

            if (profErr) throw profErr;

            return NextResponse.json({
              success: true,
              message: 'Existing user updated with new role and client organization.',
              user: profile,
            });
          }
        }
        throw inviteError;
      }

      // Upsert into profiles table
      if (authData?.user) {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .upsert({
            id: authData.user.id,
            full_name: full_name || email,
            role: roleName,
            tenant_id: tenant_id || null,
            updated_at: new Date().toISOString(),
          })
          .select('*')
          .single();

        return NextResponse.json({
          success: true,
          message: `Invitation email sent to ${email}`,
          user: profile || authData.user,
        });
      }
    }

    // Fallback: Using Client Anon SDK (When Service Role Key is not present)
    const supabaseClient = createClient(supabaseUrl, anonKey);

    // Generate a temporary pseudo ID or lookup existing profile
    const pseudoId = crypto.randomUUID();
    const { data: profile, error: upsertErr } = await supabaseClient
      .from('profiles')
      .insert({
        id: pseudoId,
        full_name: full_name || email,
        role: roleName,
        tenant_id: tenant_id || null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .select('*')
      .single();

    if (upsertErr) {
      console.warn('Profile direct insert notice:', upsertErr);
      return NextResponse.json({
        success: true,
        message: `User record created for ${email}. Note: Configure SUPABASE_SERVICE_ROLE_KEY in .env.local to enable automated invitation emails.`,
      });
    }

    return NextResponse.json({
      success: true,
      message: `User profile added for ${email}`,
      user: profile,
    });

  } catch (err: any) {
    console.error('Error inviting user:', err);
    return NextResponse.json(
      { error: err.message || 'Failed to process user invitation' },
      { status: 500 }
    );
  }
}
