import { supabase } from './supabase';
import type { Profile, Pricing, Booking, BlockedSlot } from '@/types';

export const api = {
  // Profiles
  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    return { data: data as Profile | null, error };
  },

  // Pricing
  async getPricing() {
    const { data, error } = await supabase
      .from('pricing')
      .select('*')
      .order('game_type');
    return { data: (data || []) as Pricing[], error };
  },

  async updatePricing(pricingId: string, updates: Partial<Pricing>) {
    const { data, error } = await supabase
      .from('pricing')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', pricingId);
    return { data, error };
  },

  // Bookings
  async getBookings(date?: string) {
    let query = supabase.from('bookings').select('*').order('created_at', { ascending: false });
    if (date) query = query.eq('date', date);
    const { data, error } = await supabase.from('bookings').select('*').order('created_at', { ascending: false });
    return { data: (data || []) as Booking[], error };
  },

  async createBooking(booking: Omit<Booking, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking]);
    return { data, error };
  },

  // Blocked Slots
  async getBlockedSlots(date?: string) {
    let query = supabase.from('blocked_slots').select('*');
    if (date) query = query.eq('date', date);
    const { data, error } = await query;
    return { data: (data || []) as BlockedSlot[], error };
  },

  async blockSlot(slot: Omit<BlockedSlot, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('blocked_slots')
      .insert([slot]);
    return { data, error };
  },

  async unblockSlot(id: string) {
    const { error } = await supabase
      .from('blocked_slots')
      .delete()
      .eq('id', id);
    return { error };
  },

  // Availability Check
  async getUnavailableSlots(date: string, consoleType: string) {
    const [bookingsRes, blockedRes] = await Promise.all([
      supabase.from('bookings').select('time_slot').eq('date', date).eq('console_type', consoleType),
      supabase.from('blocked_slots').select('time_slot').eq('date', date).eq('console_type', consoleType)
    ]);

    const unavailable = new Set<string>();
    bookingsRes.data?.forEach(b => unavailable.add(b.time_slot));
    blockedRes.data?.forEach(b => unavailable.add(b.time_slot));

    return Array.from(unavailable);
  }
};
