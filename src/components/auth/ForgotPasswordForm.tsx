"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Send, CheckCircle } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate(): boolean {
    if (!email.trim()) {
      setEmailError("Email is required.");
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="text-center space-y-4 py-4">
        <div className="inline-flex items-center justify-center size-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mx-auto">
          <CheckCircle className="size-7 text-emerald-500" />
        </div>
        <div className="space-y-1.5">
          <h3 className="text-base font-bold text-zinc-900 dark:text-zinc-100">
            Check your inbox
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xs mx-auto">
            If <span className="font-medium text-zinc-700 dark:text-zinc-300">{email}</span> is
            registered, you&apos;ll receive a password reset link shortly.
          </p>
        </div>
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
          Demo mode — no email is actually sent.
        </p>
        <Link
          href="/signin"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Enter the email address associated with your account and we&apos;ll send
        you a link to reset your password.
      </p>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="forgot-email"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Email address
        </label>
        <input
          id="forgot-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (emailError) setEmailError("");
          }}
          className={`w-full h-10 px-3.5 rounded-xl border text-sm font-medium bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all focus:ring-2 focus:ring-[#713CF4]/50 focus:border-[#713CF4] ${
            emailError
              ? "border-rose-400 dark:border-rose-500"
              : "border-zinc-200 dark:border-white/[0.1] hover:border-zinc-300 dark:hover:border-white/[0.18]"
          }`}
        />
        {emailError && (
          <p className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">
            {emailError}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-semibold text-sm transition-all shadow-md shadow-[#713CF4]/25 hover:shadow-lg hover:shadow-[#713CF4]/35 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      >
        {isSubmitting ? (
          <span className="size-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Send className="size-4" />
            <span>Send Reset Link</span>
          </>
        )}
      </button>

      {/* Demo notice */}
      <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500">
        Demo mode — no email is actually sent.
      </p>

      <Link
        href="/signin"
        className="flex items-center justify-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-[#713CF4] dark:hover:text-[#a78bfa] transition-colors"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>
    </form>
  );
}
