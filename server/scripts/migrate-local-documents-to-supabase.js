#!/usr/bin/env node
/**
 * @deprecated Prod Greffio = S3. Utiliser migrate-local-documents-to-s3.js
 */
import dotenv from 'dotenv';
import { migrateAllLocalDocumentsToS3 } from '../services/storageMigrationService.js';

dotenv.config({ override: process.env.NODE_ENV === 'production' });

const dryRun = process.argv.includes('--dry-run');
const limitArg = process.argv.find((arg) => arg.startsWith('--limit='));
const limit = limitArg ? Number(limitArg.split('=')[1]) : 200;

console.warn('[deprecated] migrate-local-documents-to-supabase.js → migration S3');

const run = async () => {
  const summary = await migrateAllLocalDocumentsToS3({ dryRun, limit });
  console.log(JSON.stringify(summary, null, 2));
  if (summary.failed > 0) process.exit(1);
};

run().catch((error) => {
  console.error('MIGRATE_LOCAL_DOCUMENTS_FAILED', error);
  process.exit(1);
});
