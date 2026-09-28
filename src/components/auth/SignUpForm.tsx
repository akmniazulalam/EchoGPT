"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ArrowRight, Sparkles } from "lucide-react";
import { saveDemoUser } from "@/lib/authStorage";

interface FieldError {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<FieldError>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function clearError(field: keyof FieldError) {
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate(): FieldError {
    const e: FieldError = {};
    if (!name.trim()) {
      e.name = "Full name is required.";
    }
    if (!email.trim()) {
      e.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      e.email = "Enter a valid email address.";
    }
    if (!password) {
      e.password = "Password is required.";
    } else if (password.length < 8) {
      e.password = "Password must be at least 8 characters.";
    }
    if (!confirmPassword) {
      e.confirmPassword = "Please confirm your password.";
    } else if (confirmPassword !== password) {
      e.confirmPassword = "Passwords do not match.";
    }
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setIsSubmitting(true);

    // Simulate brief network delay for realistic UX
    await new Promise((resolve) => setTimeout(resolve, 700));

    saveDemoUser({ name, email });
    router.push("/chat");
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-3.5">
      {/* Full Name */}
      <div className="space-y-1.5">
        <label
          htmlFor="signup-name"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Full name
        </label>
        <input
          id="signup-name"
          type="text"
          autoComplete="name"
          placeholder="Jane Smith"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) clearError("name");
          }}
          className={`w-full h-10 px-3.5 rounded-xl border text-sm font-medium bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all focus:ring-2 focus:ring-[#713CF4]/50 focus:border-[#713CF4] ${
            errors.name
              ? "border-rose-400 dark:border-rose-500"
              : "border-zinc-200 dark:border-white/[0.1] hover:border-zinc-300 dark:hover:border-white/[0.18]"
          }`}
        />
        {errors.name && (
          <p className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">
            {errors.name}
          </p>
        )}
      </div>

      {/* Email */}
      <div className="space-y-1.5">
        <label
          htmlFor="signup-email"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Email address
        </label>
        <input
          id="signup-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) clearError("email");
          }}
          className={`w-full h-10 px-3.5 rounded-xl border text-sm font-medium bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all focus:ring-2 focus:ring-[#713CF4]/50 focus:border-[#713CF4] ${
            errors.email
              ? "border-rose-400 dark:border-rose-500"
              : "border-zinc-200 dark:border-white/[0.1] hover:border-zinc-300 dark:hover:border-white/[0.18]"
          }`}
        />
        {errors.email && (
          <p className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="signup-password"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) clearError("password");
              if (errors.confirmPassword && e.target.value === confirmPassword)
                clearError("confirmPassword");
            }}
            className={`w-full h-10 pl-3.5 pr-10 rounded-xl border text-sm font-medium bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all focus:ring-2 focus:ring-[#713CF4]/50 focus:border-[#713CF4] ${
              errors.password
                ? "border-rose-400 dark:border-rose-500"
                : "border-zinc-200 dark:border-white/[0.1] hover:border-zinc-300 dark:hover:border-white/[0.18]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">
            {errors.password}
          </p>
        )}
      </div>

      {/* Confirm Password */}
      <div className="space-y-1.5">
        <label
          htmlFor="signup-confirm"
          className="block text-xs font-semibold text-zinc-700 dark:text-zinc-300"
        >
          Confirm password
        </label>
        <div className="relative">
          <input
            id="signup-confirm"
            type={showConfirm ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (errors.confirmPassword) clearError("confirmPassword");
            }}
            className={`w-full h-10 pl-3.5 pr-10 rounded-xl border text-sm font-medium bg-white dark:bg-white/[0.04] text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none transition-all focus:ring-2 focus:ring-[#713CF4]/50 focus:border-[#713CF4] ${
              errors.confirmPassword
                ? "border-rose-400 dark:border-rose-500"
                : "border-zinc-200 dark:border-white/[0.1] hover:border-zinc-300 dark:hover:border-white/[0.18]"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowConfirm((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors cursor-pointer"
            aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
          >
            {showConfirm ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-[11px] text-rose-500 dark:text-rose-400 font-medium">
            {errors.confirmPassword}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-xl bg-[#713CF4] hover:bg-[#602ee0] active:bg-[#5223c7] text-white font-semibold text-sm transition-all shadow-md shadow-[#713CF4]/25 hover:shadow-lg hover:shadow-[#713CF4]/35 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer mt-1"
      >
        {isSubmitting ? (
          <span className="size-4 border-2 border-white/60 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            <Sparkles className="size-4" />
            <span>Create Free Account</span>
            <ArrowRight className="size-4 ml-0.5" />
          </>
        )}
      </button>

      {/* Demo notice */}
      <p className="text-center text-[11px] text-zinc-400 dark:text-zinc-500 leading-snug pt-0.5">
        Demo mode — authentication is represented in the frontend.
        <br />
        No real account is created or stored.
      </p>

      {/* Sign-in redirect */}
      <p className="text-center text-xs text-zinc-500 dark:text-zinc-400 pt-1">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-[#713CF4] dark:text-[#a78bfa] hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
