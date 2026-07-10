import { profile } from "@/lib/data/profile";

export function getGmailComposeUrl(subject?: string) {
  const params = new URLSearchParams({
    view: "cm",
    fs: "1",
    to: profile.email,
  });

  if (subject) {
    params.set("su", subject);
  }

  return `https://mail.google.com/mail/?${params.toString()}`;
}
