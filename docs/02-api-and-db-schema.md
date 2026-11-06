# Skema Database & Kontrak REST API — NusaVenture OS v6.0

## 1. Struktur Koleksi Data (`nusa-db.json`)
- **`users[]`**: `{ id, role, authProvider, googleSub, name, email, avatar, phone, entityId, entityName, npwp, kycStatus, registeredAt, lastLoginAt, loginCount }`
- **`authLogs[]`**: `{ id, userId, name, email, role, action, portal, timestamp }`
- **`b2bCatalog[]`**: `{ id, sku, supplierId, supplierName, itemName, subtitle, category, categoryCode, marketPrice, ecosystemCreditPrice, rating, unitEquivalent, unitBadge, tag, tagType, stock, image }`
- **`umkmList[]`**: `{ id, ticker, name, owner, sector, location, stage, trancheCurrent, trancheTotal, trancheFrozen, capitalInjected, targetCapMultiplier, returnedToInvestor, profitSharePct, escrowBalance, b2bCreditBalance, hppReductionPct, monthlyRevenue, monthlyNetProfit, unitPriceLot, availableLots, totalLots, yieldAnnualized, exportMOQContribution, training: { mod1_hpp_ringfencing, mod2_qc_massbalance, mod3_market_export, quizScore, certified, completedAt }, massBalance: { inputUnits, posSalesUnits, warehouseStockUnits, verifiedRejectUnits }, financialHistory[] }`
- **`applications[]`**: `{ id, ownerName, ownerNik, age, ownerPhone, ownerNpwp, emergencyContact, businessName, legalEntityType, nibNumber, npwpBusiness, sector, location, certifications, fullAddress, bankName, bankAccountNo, bankAccountHolder, slikStatus, monthlyRevenue, monthlyNetProfit, requestedCapital, exportMoqCapacity, tranchePlan, ownerEmail, diagnosticScore, status, submittedAt }`

## 2. Kontrak Endpoint REST API (`server.js`)

### `POST /api/auth/google`
- **Deskripsi:** Verifikasi login Google OAuth 2.0, registrasi otomatis pengguna baru, dan penerbitan Bearer token sesi.
- **Request Body:**
  ```json
  {
    "simulatedProfile": {
      "email": "hendra@rotiwarisan.id",
      "name": "Bp. Hendra Wijaya",
      "entityName": "Roti Warisan Nusantara"
    },
    "requestedRole": "MITRA",
    "portalName": "Portal Inventaris Mitra"
  }