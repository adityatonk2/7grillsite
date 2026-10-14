"use client";

import { useState, useRef } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Send,
  AlertCircle,
  Edit3,
  Loader2,
  Sparkles,
} from "lucide-react";
import { GOOGLE_REVIEW, WHATSAPP } from "@/lib/config";

// =========================================================================
// GOOGLE REVIEW CONFIGURATION
// =========================================================================
// Kept in a single configuration constant as specified.
// Standard verified Google Review link for 7 GRILL (ChIJN3j1BgApCTkRQqO70fVqT90)
const GOOGLE_REVIEW_URL =
  GOOGLE_REVIEW ||
  "https://search.google.com/local/writereview?placeid=ChIJN3j1BgApCTkRQqO70fVqT90";

interface ReviewTemplate {
  id: string;
  title: string;
  category: string;
  text: string;
}

const REVIEW_TEMPLATES: ReviewTemplate[] = [
  {
    id: "burger-fries",
    title: "Burgers & Fries",
    category: "Quick Bites",
    text: "Tried the veggie burger and peri-peri fries at 7 GRILL. Everything was served hot, crispy, and flavorful. Courteous staff and quick service on Kanwali Road.",
  },
  {
    id: "sandwich-coffee",
    title: "Sandwich & Cold Coffee",
    category: "Cafe Favorites",
    text: "Great spot for pure vegetarian snacks. The grilled cheese corn sandwich was well-seasoned and the cold coffee was rich and refreshing. Clean setup and reasonable prices.",
  },
  {
    id: "combos-value",
    title: "Combos & Snacks",
    category: "Value for Money",
    text: "Had a combo meal with burger, fries, and a drink. Generous portions and very pocket-friendly for pure-veg food in Dehradun. Fresh ingredients and good taste.",
  },
  {
    id: "balanced",
    title: "Balanced Feedback",
    category: "Honest Visit",
    text: "Solid vegetarian cafe with tasty grilled sandwiches and burgers. Good portion sizes and polite team. Can get busy during peak hours, but definitely worth visiting.",
  },
];

/**
 * Copies text using modern navigator.clipboard.writeText with a fallback for older environments.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  // Primary modern Clipboard API
  if (
    typeof navigator !== "undefined" &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === "function"
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Permission denied or context issue; fall through to fallback
    }
  }

  // Fallback for older browsers or restricted mobile contexts
  try {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    textarea.style.top = "-9999px";
    textarea.setAttribute("readonly", "");
    document.body.appendChild(textarea);
    textarea.select();
    const successful = document.execCommand("copy");
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
}

export default function ReviewsPage() {
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copyFailed, setCopyFailed] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Switch template and load text into the editor
  const handleSelectTemplate = (template: ReviewTemplate) => {
    setSelectedTemplateId(template.id);
    setReviewText(template.text);
    setErrorMessage(null);
    setCopyFailed(false);
    setStatusMessage(null);
  };

  // Start from a blank slate
  const handleSelectCustom = () => {
    setSelectedTemplateId("custom");
    setErrorMessage(null);
    setCopyFailed(false);
    setStatusMessage(null);
    textareaRef.current?.focus();
  };

  // Primary CTA: Copy Review & Continue to Google
  const handleCopyAndContinue = async () => {
    const trimmed = reviewText.trim();

    // Validation: Empty or whitespace-only
    if (!trimmed) {
      setErrorMessage("Please select a template or write your review text before continuing.");
      setStatusMessage(null);
      textareaRef.current?.focus();
      return;
    }

    // Prevent duplicate clicks
    if (isSubmitting) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    setCopyFailed(false);
    setStatusMessage("Copying review to clipboard...");

    const success = await copyToClipboard(trimmed);

    if (success) {
      setCopied(true);
      setStatusMessage("Review copied! Redirecting you to Google Reviews...");

      // Short delay so the user perceives the copy success before navigation
      setTimeout(() => {
        window.location.assign(GOOGLE_REVIEW_URL);
      }, 400);
    } else {
      // Clipboard failed: keep customer on page and present manual fallback
      setIsSubmitting(false);
      setCopyFailed(true);
      setStatusMessage(null);
      setErrorMessage(
        "Automatic copy failed due to browser permissions. Please select the text in the editor, copy it manually, and then continue to Google."
      );
    }
  };

  // Secondary Action: Copy Review Only (without immediate navigation)
  const handleCopyOnly = async () => {
    const trimmed = reviewText.trim();

    if (!trimmed) {
      setErrorMessage("Please select a template or write your review text before copying.");
      setStatusMessage(null);
      textareaRef.current?.focus();
      return;
    }

    setErrorMessage(null);
    setCopyFailed(false);

    const success = await copyToClipboard(trimmed);
    if (success) {
      setCopied(true);
      setStatusMessage("Review copied to clipboard! You can paste it into Google Reviews whenever you're ready.");
      setTimeout(() => setCopied(false), 4000);
    } else {
      setCopyFailed(true);
      setStatusMessage(null);
      setErrorMessage(
        "Automatic copy failed. Please select and copy the text manually from the box below."
      );
    }
  };

  // Manual fallback helper to highlight all text in editor
  const handleSelectAll = () => {
    if (textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 pt-8 pb-16">
      {/* Header */}
      <header className="mb-8">
        <h1 className="font-display font-black text-4xl sm:text-5xl leading-none">
          Share your <em className="text-ye">experience</em>
        </h1>
        <p className="mt-3 text-cream/70 text-sm sm:text-base leading-relaxed">
          Select a template that reflects your visit, personalize it in the editor, and copy it to Google.
          Honest feedback from genuine customers helps us grow and helps others find good food.
        </p>
      </header>

      <div className="rounded-3xl bg-card border border-line p-5 sm:p-7 space-y-6">
        {/* Step 1: Template Selection */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-bold text-base text-cream flex items-center gap-2">
              <Sparkles size={18} className="text-ye" />
              1. Choose a review template
            </h2>
            <span className="text-xs text-cream/50">Select to populate</span>
          </div>

          <div
            className="grid gap-3 sm:grid-cols-2"
            role="radiogroup"
            aria-label="Suggested review templates"
          >
            {REVIEW_TEMPLATES.map((tmpl) => {
              const isSelected = selectedTemplateId === tmpl.id;
              return (
                <button
                  key={tmpl.id}
                  type="button"
                  role="radio"
                  aria-checked={isSelected}
                  onClick={() => handleSelectTemplate(tmpl)}
                  className={`text-left p-3.5 rounded-2xl border transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-ye/10 border-ye ring-1 ring-ye text-cream"
                      : "bg-ink/60 border-line text-cream/80 hover:border-ye/40 hover:bg-ink"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-bold text-sm text-cream">{tmpl.title}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        isSelected ? "bg-ye text-ink font-bold" : "bg-card border border-line text-cream/60"
                      }`}
                    >
                      {tmpl.category}
                    </span>
                  </div>
                  <p className="text-xs text-cream/70 line-clamp-2 leading-relaxed">
                    {tmpl.text}
                  </p>
                </button>
              );
            })}

            {/* Custom / Blank option */}
            <button
              type="button"
              role="radio"
              aria-checked={selectedTemplateId === "custom"}
              onClick={handleSelectCustom}
              className={`text-left p-3.5 rounded-2xl border transition-all sm:col-span-2 flex items-center justify-between ${
                selectedTemplateId === "custom"
                  ? "bg-ye/10 border-ye ring-1 ring-ye text-cream"
                  : "bg-ink/60 border-line text-cream/80 hover:border-ye/40 hover:bg-ink"
              }`}
            >
              <div>
                <span className="font-bold text-sm text-cream block">Write from scratch</span>
                <span className="text-xs text-cream/60">Type your own feedback without using a pre-written template</span>
              </div>
              <Edit3 size={18} className="text-ye shrink-0 ml-2" />
            </button>
          </div>
        </div>

        {/* Step 2: Review Editor */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="review-editor" className="font-bold text-base text-cream flex items-center gap-2">
              <Edit3 size={18} className="text-ye" />
              2. Edit your review
            </label>
            <span className="text-xs text-cream/50">
              {reviewText.trim().length} characters
            </span>
          </div>

          <p className="text-xs text-cream/60 mb-2">
            Make any edits you like below. The exact text in this box is what will be copied to your clipboard.
          </p>

          <textarea
            id="review-editor"
            ref={textareaRef}
            rows={4}
            value={reviewText}
            onChange={(e) => {
              setReviewText(e.target.value);
              if (errorMessage) setErrorMessage(null);
            }}
            placeholder="Select a template above to load text, or type your own review here..."
            className="w-full rounded-2xl bg-ink border border-line p-4 text-cream placeholder-cream/40 outline-none focus:border-ye focus:ring-1 focus:ring-ye leading-relaxed text-sm transition-colors resize-y min-h-[120px]"
            aria-invalid={!!errorMessage}
            aria-describedby={errorMessage ? "review-error" : undefined}
          />
        </div>

        {/* Google Limitation Notice */}
        <div className="rounded-2xl bg-ink border border-line p-3.5 text-xs text-cream/70 flex items-start gap-2.5">
          <span className="text-base leading-none">💡</span>
          <div className="space-y-1">
            <p className="font-semibold text-cream">How Google Reviews works:</p>
            <p className="text-cream/60 leading-relaxed">
              Google does not allow external websites to pre-fill or publish reviews automatically. When Google opens,
              simply tap inside the <em>&ldquo;Share details of your own experience&rdquo;</em> box and select <strong>Paste</strong>.
            </p>
          </div>
        </div>

        {/* Validation / Error Alert */}
        {errorMessage && (
          <div
            id="review-error"
            role="alert"
            className="rounded-2xl bg-red-500/10 border border-red-500/30 p-3.5 text-xs text-red-400 flex items-start gap-2.5"
          >
            <AlertCircle size={16} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">Action required</p>
              <p className="mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Manual Copy Fallback when clipboard fails */}
        {copyFailed && (
          <div
            role="region"
            aria-label="Manual copy instructions"
            className="rounded-2xl bg-ye/10 border border-ye/30 p-4 text-xs text-cream space-y-3"
          >
            <p className="font-semibold text-ye">Manual Copy Fallback:</p>
            <p className="text-cream/80">
              Your browser blocked clipboard access. You can select all text in the box above, copy it with your keyboard or long-press, and then proceed directly to Google.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <button
                type="button"
                onClick={handleSelectAll}
                className="px-3.5 py-1.5 rounded-lg bg-card border border-line text-cream font-semibold hover:border-ye transition-colors"
              >
                Select All Text in Box
              </button>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-ye text-ink font-bold flex items-center gap-1.5 hover:bg-ye/90 transition-colors"
              >
                <ExternalLink size={14} />
                Open Google Reviews Anyway
              </a>
            </div>
          </div>
        )}

        {/* Status Feedback Banner */}
        {statusMessage && !errorMessage && (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-2xl p-3.5 text-xs flex items-center gap-2.5 transition-all ${
              copied
                ? "bg-leaf/10 border border-leaf/30 text-leaf"
                : "bg-ye/10 border border-ye/30 text-ye"
            }`}
          >
            {copied ? <Check size={16} className="shrink-0" /> : <Loader2 size={16} className="animate-spin shrink-0" />}
            <span className="font-medium">{statusMessage}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          {/* Primary CTA */}
          <button
            type="button"
            onClick={handleCopyAndContinue}
            disabled={isSubmitting}
            className="w-full rounded-full bg-ye text-ink font-black py-4 flex items-center justify-center gap-2 hover:bg-ye/90 transition-all text-base focus:outline-none focus:ring-2 focus:ring-ye/50 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-ye/10"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Copying & Redirecting...
              </>
            ) : (
              <>
                <ExternalLink size={20} />
                Copy Review & Continue to Google
              </>
            )}
          </button>

          {/* Secondary Action */}
          <button
            type="button"
            onClick={handleCopyOnly}
            disabled={isSubmitting}
            className="w-full rounded-full border border-line bg-card hover:bg-card/80 text-cream font-bold py-3.5 flex items-center justify-center gap-2 transition-all text-sm focus:outline-none focus:ring-2 focus:ring-ye/50 active:scale-[0.99] disabled:opacity-60"
          >
            {copied ? (
              <>
                <Check size={16} className="text-leaf" />
                Review Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy Review
              </>
            )}
          </button>
        </div>
      </div>

      {/* Private feedback option */}
      <a
        href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent("Feedback for 7 GRILL: ")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 flex items-center justify-center gap-2 rounded-full border border-line py-3.5 font-bold text-sm text-cream/80 hover:border-ye/40 hover:text-cream transition-colors"
      >
        <Send size={18} className="text-[#25D366]" />
        Prefer private feedback? Message the owner directly
      </a>
      <p className="text-xs text-cream/40 text-center mt-2.5">
        Private feedback is optional and never replaces a public review.
      </p>
    </div>
  );
}
