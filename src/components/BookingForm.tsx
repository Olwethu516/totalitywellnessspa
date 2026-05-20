import { useState } from 'react';
import { CalendarDays, CheckCircle2, AlertCircle, CreditCard, Store, ArrowLeft, ArrowRight, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { allServices } from '../data/services';
import SectionHeading from './SectionHeading';

const timeSlots = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00',
];

const bookableServices = allServices.filter((s) => s.price > 0);

type Step = 'form' | 'confirm' | 'success';

interface FormState {
  full_name: string;
  email: string;
  phone: string;
  branch: string;
  service_id: string;
  preferred_date: string;
  preferred_time: string;
  notes: string;
  payment_method: string;
}

const defaultForm: FormState = {
  full_name: '',
  email: '',
  phone: '',
  branch: '',
  service_id: '',
  preferred_date: '',
  preferred_time: '',
  notes: '',
  payment_method: 'instore',
};

export default function BookingForm() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [step, setStep] = useState<Step>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [booking, setBooking] = useState<{ id: string } | null>(null);

  const selectedService = bookableServices.find((s) => s.id === form.service_id);
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validate = () => {
    if (!form.full_name.trim()) return 'Please enter your full name.';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return 'Please enter a valid email address.';
    if (!form.phone.trim()) return 'Please enter your phone number.';
    if (!form.branch) return 'Please select a branch.';
    if (!form.service_id) return 'Please select a service.';
    if (!form.preferred_date) return 'Please select a date.';
    if (!form.preferred_time) return 'Please select a time.';
    return '';
  };

  const handleReview = () => {
    const err = validate();
    if (err) { setError(err); return; }
    setError('');
    setStep('confirm');
  };

  const handleSubmit = async () => {
    if (!selectedService) return;
    setLoading(true);
    setError('');

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: form.phone,
      branch: form.branch,
      service_type: selectedService.category,
      service_name: selectedService.name,
      service_price: selectedService.price,
      preferred_date: form.preferred_date,
      preferred_time: form.preferred_time,
      notes: form.notes,
      payment_method: form.payment_method,
      status: 'pending',
    };

    const { data, error: dbError } = await supabase
      .from('bookings')
      .insert(payload)
      .select('id')
      .single();

    if (dbError || !data) {
      setError('Failed to save your booking. Please try again.');
      setLoading(false);
      return;
    }

    try {
      await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-booking-notification`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ ...payload, id: data.id }),
        }
      );
    } catch {
      // notifications are best-effort
    }

    setBooking({ id: data.id });
    setStep('success');
    setLoading(false);
  };

  // ─── SUCCESS ───────────────────────────────────────────
  if (step === 'success' && booking) {
    const branchLabel = form.branch === 'durban' ? 'Durban' : 'Johannesburg';
    const paymentLabel = form.payment_method === 'online' ? 'Online Payment' : 'Pay In-Store';

    return (
      <section id="booking" className="py-24 bg-spa-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 left-0 right-0 section-divider" />

        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="w-20 h-20 rounded-full bg-gold-500/10 border-2 border-gold-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={36} className="text-gold-400" />
          </div>

          <h2 className="font-display text-3xl sm:text-4xl font-light text-white mb-3">
            Booking Received!
          </h2>
          <p className="font-body text-white/50 mb-1">
            Thank you, <strong className="text-white font-medium">{form.full_name}</strong>.
          </p>
          <p className="font-body text-white/40 text-sm mb-8">
            A confirmation has been sent to <strong className="text-gold-400">{form.email}</strong>. We will confirm your appointment shortly.
          </p>

          {/* Booking Summary Card */}
          <div className="text-left glass-card rounded-2xl p-7 mb-6">
            <h3 className="font-body text-gold-500 text-[11px] tracking-[0.3em] uppercase font-medium mb-6">
              Your Booking Summary
            </h3>
            <div className="space-y-4">
              {[
                ['Booking Ref', `#${booking.id.slice(0, 8).toUpperCase()}`],
                ['Branch', branchLabel],
                ['Service', selectedService?.name ?? ''],
                ['Price', `R${selectedService?.price}`],
                ['Date', form.preferred_date],
                ['Time', form.preferred_time],
                ['Payment', paymentLabel],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <span className="font-body text-white/40 text-sm">{label}</span>
                  <span className="font-body text-white font-medium text-sm">{value}</span>
                </div>
              ))}
              {form.notes && (
                <div className="pt-3 border-t border-white/5">
                  <p className="font-body text-white/40 text-xs mb-1">Notes</p>
                  <p className="font-body text-white/70 text-sm">{form.notes}</p>
                </div>
              )}
            </div>
          </div>

          {form.payment_method === 'online' && (
            <div className="bg-gold-500/10 border border-gold-500/20 rounded-xl p-5 mb-6 text-left">
              <p className="font-body text-gold-400 font-medium text-sm mb-1">Online Payment</p>
              <p className="font-body text-white/50 text-sm">
                Our team will send you a secure payment link via email within 30 minutes to complete your booking payment.
              </p>
            </div>
          )}

          {/* WhatsApp follow-up */}
          <a
            href={`https://wa.me/27722332665?text=${encodeURIComponent(
              `Hi, I just booked ${selectedService?.name} at ${branchLabel} (Ref #${booking.id.slice(0, 8).toUpperCase()}). I'd like to confirm my appointment.`
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-spa-green text-white font-body text-sm font-medium px-7 py-3.5 rounded-full hover:bg-spa-green-dark transition-all duration-300 hover:shadow-lg hover:shadow-spa-green/20 mb-8"
          >
            <MessageCircle size={16} />
            Confirm on WhatsApp
          </a>

          <div>
            <button
              onClick={() => { setForm(defaultForm); setStep('form'); setBooking(null); }}
              className="font-body text-gold-400 text-sm tracking-wider uppercase hover:text-gold-300 transition-colors"
            >
              Make Another Booking
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ─── CONFIRM ────────────────────────────────────────────
  if (step === 'confirm') {
    const branchLabel = form.branch === 'durban' ? 'Durban' : 'Johannesburg';
    const paymentLabel = form.payment_method === 'online' ? 'Online Payment' : 'Pay In-Store';

    return (
      <section id="booking" className="py-24 bg-spa-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }} />
        <div className="absolute top-0 left-0 right-0 section-divider" />

        <div className="relative max-w-2xl mx-auto px-6">
          <SectionHeading eyebrow="Review" title="Confirm Your Booking" light />

          <div className="glass-card rounded-2xl p-7 mb-6">
            <h3 className="font-body text-gold-500 text-[11px] tracking-[0.3em] uppercase font-medium mb-6">
              Booking Details
            </h3>
            <div className="space-y-4">
              {[
                ['Name', form.full_name],
                ['Email', form.email],
                ['Phone', form.phone],
                ['Branch', branchLabel],
                ['Service', selectedService?.name ?? ''],
                ['Price', `R${selectedService?.price}`],
                ['Date', form.preferred_date],
                ['Time', form.preferred_time],
                ['Payment', paymentLabel],
              ].map(([label, value]) => (
                <div key={label} className="flex justify-between items-center pb-3 border-b border-white/5 last:border-0 last:pb-0">
                  <span className="font-body text-white/40 text-sm">{label}</span>
                  <span className="font-body text-white font-medium text-sm">{value}</span>
                </div>
              ))}
              {form.notes && (
                <div className="pt-3 border-t border-white/5">
                  <p className="font-body text-white/40 text-xs mb-1">Notes</p>
                  <p className="font-body text-white/70 text-sm">{form.notes}</p>
                </div>
              )}
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 font-body text-sm mb-5 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          <div className="flex gap-4">
            <button
              onClick={() => setStep('form')}
              className="flex-1 flex items-center justify-center gap-2 border border-white/15 text-white/60 font-body text-sm font-medium py-4 rounded-full hover:border-white/30 hover:text-white/80 transition-all"
            >
              <ArrowLeft size={14} /> Edit Details
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 gold-gradient text-spa-dark font-body font-semibold text-sm tracking-wider uppercase py-4 rounded-full hover:shadow-lg hover:shadow-gold-500/20 transition-all duration-300 disabled:opacity-50"
            >
              {loading ? 'Submitting...' : <>Confirm <ArrowRight size={14} /></>}
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ─── FORM ───────────────────────────────────────────────
  return (
    <section id="booking" className="py-24 bg-spa-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle, #C9A84C 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }} />
      <div className="absolute top-0 left-0 right-0 section-divider" />

      <div className="relative max-w-3xl mx-auto px-6">
        <SectionHeading
          eyebrow="Reservations"
          title="Book Your Experience"
          subtitle="Reserve your treatment online and we'll confirm your appointment. Bookings are available at both our Durban and Johannesburg branches."
          light
        />

        <div className="glass-card rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Full Name */}
            <div className="md:col-span-2">
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="full_name"
                value={form.full_name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-white/[0.03] border border-white/10 text-white placeholder-white/20 font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full bg-white/[0.03] border border-white/10 text-white placeholder-white/20 font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+27 72 123 4567"
                className="w-full bg-white/[0.03] border border-white/10 text-white placeholder-white/20 font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-white/[0.05] transition-all duration-300"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Branch *
              </label>
              <select
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 text-white font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-spa-dark">Select a branch</option>
                <option value="durban" className="bg-spa-dark">Durban</option>
                <option value="johannesburg" className="bg-spa-dark">Johannesburg</option>
              </select>
            </div>

            {/* Service */}
            <div>
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Service *
              </label>
              <select
                name="service_id"
                value={form.service_id}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 text-white font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-spa-dark">Select a service</option>
                <optgroup label="Wellness Treatments" className="bg-spa-dark">
                  {bookableServices.filter((s) => s.category === 'treatment').map((s) => (
                    <option key={s.id} value={s.id} className="bg-spa-dark">{s.name} — R{s.price}</option>
                  ))}
                </optgroup>
                <optgroup label="Vitamin D Drops" className="bg-spa-dark">
                  {bookableServices.filter((s) => s.category === 'vitamin_d').map((s) => (
                    <option key={s.id} value={s.id} className="bg-spa-dark">{s.name} — R{s.price}</option>
                  ))}
                </optgroup>
                <optgroup label="Products" className="bg-spa-dark">
                  {bookableServices.filter((s) => s.category === 'product').map((s) => (
                    <option key={s.id} value={s.id} className="bg-spa-dark">{s.name} — R{s.price}</option>
                  ))}
                </optgroup>
              </select>
            </div>

            {/* Date */}
            <div>
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Preferred Date *
              </label>
              <input
                type="date"
                name="preferred_date"
                value={form.preferred_date}
                min={today}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 text-white font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 transition-all duration-300"
              />
            </div>

            {/* Time */}
            <div>
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Preferred Time *
              </label>
              <select
                name="preferred_time"
                value={form.preferred_time}
                onChange={handleChange}
                className="w-full bg-white/[0.03] border border-white/10 text-white font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 transition-all duration-300 appearance-none"
              >
                <option value="" className="bg-spa-dark">Select a time</option>
                {timeSlots.map((t) => (
                  <option key={t} value={t} className="bg-spa-dark">{t}</option>
                ))}
              </select>
            </div>

            {/* Payment Method */}
            <div className="md:col-span-2">
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-3">
                Payment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, payment_method: 'instore' }))}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    form.payment_method === 'instore'
                      ? 'border-gold-500/60 bg-gold-500/10'
                      : 'border-white/8 hover:border-white/15 bg-white/[0.02]'
                  }`}
                >
                  <Store size={18} className={form.payment_method === 'instore' ? 'text-gold-400' : 'text-white/30'} />
                  <div>
                    <p className={`font-body text-sm font-medium ${form.payment_method === 'instore' ? 'text-gold-300' : 'text-white/70'}`}>
                      Pay In-Store
                    </p>
                    <p className="font-body text-white/30 text-xs mt-0.5">Pay on the day of your visit</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, payment_method: 'online' }))}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    form.payment_method === 'online'
                      ? 'border-gold-500/60 bg-gold-500/10'
                      : 'border-white/8 hover:border-white/15 bg-white/[0.02]'
                  }`}
                >
                  <CreditCard size={18} className={form.payment_method === 'online' ? 'text-gold-400' : 'text-white/30'} />
                  <div>
                    <p className={`font-body text-sm font-medium ${form.payment_method === 'online' ? 'text-gold-300' : 'text-white/70'}`}>
                      Pay Online
                    </p>
                    <p className="font-body text-white/30 text-xs mt-0.5">Receive a secure payment link</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Notes */}
            <div className="md:col-span-2">
              <label className="block font-body text-white/50 text-[11px] tracking-[0.2em] uppercase mb-2">
                Additional Notes
              </label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Any special requests, health conditions, or questions..."
                rows={3}
                className="w-full bg-white/[0.03] border border-white/10 text-white placeholder-white/20 font-body rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-gold-500/50 focus:bg-white/[0.05] transition-all duration-300 resize-none"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 font-body text-sm mt-5 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">
              <AlertCircle size={15} /> {error}
            </div>
          )}

          {selectedService && (
            <div className="mt-5 p-4 bg-gold-500/[0.07] border border-gold-500/20 rounded-xl flex items-center justify-between">
              <div>
                <p className="font-body text-white/40 text-[11px] tracking-wider uppercase">Selected Service</p>
                <p className="font-body text-white text-sm font-medium mt-0.5">{selectedService.name}</p>
              </div>
              <span className="font-display text-gold-400 text-2xl font-light">R{selectedService.price}</span>
            </div>
          )}

          <button
            onClick={handleReview}
            className="mt-7 w-full flex items-center justify-center gap-2 gold-gradient text-spa-dark font-body font-semibold text-sm tracking-wider uppercase py-4 rounded-full hover:shadow-xl hover:shadow-gold-500/20 transition-all duration-300 hover:scale-[1.02]"
          >
            <CalendarDays size={16} />
            Review Booking
          </button>
        </div>
      </div>
    </section>
  );
}
