"use client";

import { useMemo } from "react";
import { buildExporters } from "@/lib/export/registry";
import type { ReportExporter } from "@/lib/export/types";

/**
 * Supplies the declarative list of report exporters for the current session.
 *
 * @returns A memoized array of `ReportExporter` (Google Sheets, CSV, …).
 */
export function useExporters(): ReportExporter[] {
  return useMemo(() => buildExporters(), []);
}
