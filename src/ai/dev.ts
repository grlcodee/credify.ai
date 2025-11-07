import { config } from 'dotenv';
config();

import '@/ai/flows/generate-verified-summary.ts';
import '@/ai/flows/analyze-content-and-provide-verdict.ts';