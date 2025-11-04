import { supabase } from "@/app/_lib/supabase";

function getSupabaseErrorMessage(error) {
  if (!error) return 'An unknown error occurred';
  
  if (error.message) {
    if (error.message.includes('Password should be at least')) {
      return 'Password should be at least 6 characters long';
    }
    if (error.message.includes('Password is too weak')) {
      return 'Password is too weak. Please choose a stronger password';
    }   
    if (error.message.includes('User already registered')) {
      return 'An account with this email already exists';
    }
    if (error.message.includes('Signup is disabled')) {
      return 'New account registration is currently disabled';
    }
    if (error.message.includes('Invalid email')) {
      return 'Please enter a valid email address';
    }
    if (error.message.includes('Email not confirmed')) {
      return 'Please verify your email before logging in';
    }
    if (error.message.includes('Invalid login credentials')) {
      return 'Invalid email or password';
    }
    if (error.message.includes('Too many requests')) {
      return 'Too many attempts. Please try again later';
    }
    if (error.message.includes('Account not found')) {
      return 'No account found with this email address';
    }
    if (error.message.includes('Failed to fetch')) {
      return 'Network error. Please check your connection and try again';
    }
    return error.message;
  }
  return error.toString();
}

export async function getMember(email) {
  const { data, error } = await supabase
    .from("members")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    console.error(error);
    throw new Error('Member could not be loaded');
  }

  return data;
}

export async function createMember(newMember) {
  const { data, error } = await supabase
    .from('members')
    .insert([newMember])
    .select()

  if (error) {
    console.error(error);
    throw new Error('Member could not be created');
  }

  return data;
}

export async function updateMember(oldEmail, updatedMember) {
  const { data, error } = await supabase
    .from('members')
    .update(updatedMember)
    .eq('email', oldEmail)
    .select()

  if (error) {
    console.error(error);
    throw new Error('Member could not be updated');
  }

  return data;
}

export async function resendEmailVerification() {
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: (await supabase.auth.getUser()).data.user?.email
  })

  if (error) {
    console.error(error);
    throw new Error('Failed to resend verification email');
  }

  return true;
}

export async function getAllBookings() {
  const { data: bookings, error } = await supabase.from('bookings').select('*');

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return bookings;
}

export async function getMemberBookings(memberId) {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select('*')
    .eq('memberId', memberId)
    .gte('startDate', new Date().toISOString())
    .order('startDate', { ascending: true });

  if (error) {
    console.error(error);
    throw new Error('Bookings could not be loaded');
  }

  return bookings;
}


export async function createBooking(newBooking) {
  const { data, error } = await supabase
    .from('bookings')
    .insert([newBooking])
    .select()

  if (error) {
    console.error(error);
    throw new Error('Booking could not be created');
  }

  return data;
}

export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    console.error(error);
    throw new Error(getSupabaseErrorMessage(error));
  }

  return data;
}

export async function signup({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  })

  if (error) {
    console.error(error);
    throw new Error(getSupabaseErrorMessage(error));
  }

  return data;
}

export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error(error);
    throw new Error('Failed to get current session');
  }

  return session;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error(error);
    throw new Error('Sign out failed');
  }

  return true;
}

export function onAuthStateChange(callback) {
  return supabase.auth.onAuthStateChange(callback);
}

export async function resetPassword(email) {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/update-password`,
  })

  if (error) {
    console.error(error);
    throw new Error(getSupabaseErrorMessage(error));
  }

  return data;
}

export async function updatePassword(newPassword) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword
  })

  if (error) {
    console.error(error);
    throw new Error(getSupabaseErrorMessage(error));
  }

  return data;
}
