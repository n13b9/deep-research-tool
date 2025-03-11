import FirecrawlApp, { SearchResponse } from "@mendable/firecrawl-js";
import { generateObject } from "ai";
import { compact } from "lodash-es";
import pLimit from "p-limit";
import { z } from "zod";

import { o3MiniModel, trimPrompt } from "./ai/providers";
import { systemPrompt } from "./prompt";
import { OutputManager } from "./output-manager";

// Initialize output manager for coordinated console/progress output
const output = new OutputManager();

// Replace console.log with output.log
function log(...args: any[]) {
  output.log(...args);
}

export type ResearchProgress = {
  currentDepth: number;
  totalDepth: number;
  currentBreadth: number;
  totalBreadth: number;
  currentQuery?: string;
  totalQueries: number;
  completedQueries: number;
};
