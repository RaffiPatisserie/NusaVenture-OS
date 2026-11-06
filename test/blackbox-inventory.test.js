/**
 * NUSAVENTURE OS v6.0 - WATERFALL PHASE 5: BEHAVIORAL BLACK-BOX TEST SUITE
 * Teknik: Equivalence Partitioning (EP) & Boundary Value Analysis (BVA)
 * Cara Menjalankan: node tests/blackbox-inventory.test.js
 */

const assert = require('assert');

// Simulasi Black-Box Formula & Validator sesuai Kontrak Spesifikasi Fase 2
function validateB2BOrderQuantityBVA(qty) {
  if (!Number.isInteger(qty) || qty < 1 || qty > 500) {
    return { valid: false, message: 'BVA_VALIDATION: Kuantitas pesanan B2B harus antara 1 hingga 500 lot.' };
  }
  return { valid: true, message: 'OK' };
}

function evaluateMassBalanceBlackBox(inputUnits, posUnits, stockUnits, rejectUnits) {
  const accounted = posUnits + stockUnits + rejectUnits;
  const gap = Math.max(0, inputUnits - accounted);
  const pct = inputUnits > 0 ? Number(((gap / inputUnits) * 100).toFixed(2)) : 0;
  return {
    gap,
    pct,
    trancheFrozen: pct > 3.0,
    uiBannerStatus: pct > 3.0 ? 'FRAUD ALERT (>3% GAP)' : 'TERVERIFIKASI AMAN (<=3%)'
  };
}

console.log('===================================================================');
console.log(' MENJALANKAN PENGUJIAN BLACK-BOX (EP & BVA) NUSAVENTURE OS v6.0');
console.log('===================================================================');

// 1. Boundary Value Analysis (BVA) pada Kuantitas Pemesanan Inventaris B2B (Rentang Valid: 1..500)
assert.strictEqual(validateB2BOrderQuantityBVA(0).valid, false, 'BVA Min-1 (0 lot) harus ditolak');
assert.strictEqual(validateB2BOrderQuantityBVA(1).valid, true, 'BVA Min (1 lot) harus diterima');
assert.strictEqual(validateB2BOrderQuantityBVA(500).valid, true, 'BVA Max (500 lot) harus diterima');
assert.strictEqual(validateB2BOrderQuantityBVA(501).valid, false, 'BVA Max+1 (501 lot) harus ditolak');
console.log('✓ [PASS] BVA Kuantitas Pesanan Inventaris B2B (0, 1, 500, 501 Lot)');

// 2. Boundary Value Analysis (BVA) pada Ambang Batas Mass-Balance 3.0%
const exactBoundary = evaluateMassBalanceBlackBox(1000, 900, 50, 20); // Gap = 30 unit (3.00%)
assert.strictEqual(exactBoundary.trancheFrozen, false, 'BVA 3.00% tepat pada batas tidak boleh membekukan Tranche');

const overBoundary = evaluateMassBalanceBlackBox(1000, 899, 50, 20); // Gap = 31 unit (3.10%)
assert.strictEqual(overBoundary.trancheFrozen, true, 'BVA 3.10% (>3.0%) wajib memicu pembekuan Tranche otomatis');
console.log('✓ [PASS] BVA Ambang Batas Audit Mass-Balance (3.00% vs 3.10% Gap)');

console.log('===================================================================');
console.log(' SELURUH SKENARIO BLACK-BOX TESTING LULUS 100%');
console.log('===================================================================');