import { redirect } from "next/navigation";

/**
 * Redirects the root route to `/prom-checker`.
 */
export default function Home() {
  redirect("/prom-checker");
}
