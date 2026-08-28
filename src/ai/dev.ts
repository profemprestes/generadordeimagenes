import { config } from 'dotenv';
config();

import '@/ai/flows/summarize-testimonials.ts';
import '@/ai/flows/generate-image-prompt.ts';
import '@/ai/flows/suggest-image-params.ts';
import '@/ai/flows/summarize-service-page.ts';
import '@/ai/flows/suggest-service-image-details.ts';
import '@/ai/flows/generate-service-image-prompt.ts';
import '@/ai/flows/suggest-optimal-image-details.ts';
import '@/ai/flows/generate-optimal-image-prompt.ts';
import '@/ai/flows/generate-replication-prompt.ts';
import '@/ai/flows/generate-replication-prompt-v2.ts';
import '@/ai/flows/generate-component-prompt.ts';

