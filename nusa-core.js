/**
 * NUSAVENTURE OS v6.0 - BLACK-BOX UI ENGINE & B2B INVENTORY SERVICE ORCHESTRATOR
 * Visual Design System: Identical to "AERO STEP" Reference Architecture
 * Methodology: Waterfall Phase 4 (Strict Black-Box UI Props-In / Events-Out + Service Layer)
 */

const NUSA_STORAGE_KEY = 'NUSAVENTURE_OS_STATE_V6_AERO';
const NUSA_THEME_KEY = 'NUSAVENTURE_THEME_AERO';
const NUSA_SESSION_PREFIX = 'NUSAVENTURE_OAUTH_SESSION_';
const NUSA_CHANNEL_NAME = 'NUSAVENTURE_REALTIME_BUS_V6';
const API_BASE_URL = 'http://localhost:4000/api';

// Inject Shared Aero Step CSS Tokens & Typography across all portals
(function injectAeroDesignTokens() {
  if (typeof document === 'undefined') return;
  const style = document.createElement('style');
  style.textContent = `
    :root {
      --aero-bg: #F5F4F0;
      --aero-surface: #FFFFFF;
      --aero-stone: #EAE8E1;
      --aero-stone-soft: #F0EFEA;
      --aero-olive: #52584E;
      --aero-olive-dark: #3E433B;
      --aero-text: #1C1E1B;
      --aero-muted: #767A73;
      --aero-coral-bg: #F6DFD7;
      --aero-coral-text: #C86446;
      --aero-gold: #E5A93C;
      --aero-border: rgba(28, 30, 27, 0.08);
    }
    html.dark {
      --aero-bg: #111311;
      --aero-surface: #1A1D1A;
      --aero-stone: #252925;
      --aero-stone-soft: #1F231F;
      --aero-olive: #697263;
      --aero-olive-dark: #828C7B;
      --aero-text: #F3F4F2;
      --aero-muted: #9CA198;
      --aero-coral-bg: #3D251E;
      --aero-coral-text: #F28B6D;
      --aero-border: rgba(255, 255, 255, 0.09);
    }
    body {
      background-color: var(--aero-bg) !important;
      color: var(--aero-text) !important;
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif !important;
      transition: background-color 0.25s ease, color 0.25s ease;
    }
    .aero-surface { background-color: var(--aero-surface); border: 1px solid var(--aero-border); }
    .aero-stone { background-color: var(--aero-stone); }
    .aero-stone-soft { background-color: var(--aero-stone-soft); }
    .aero-btn-olive {
      background-color: var(--aero-olive);
      color: #FFFFFF;
      transition: all 0.2s ease;
    }
    .aero-btn-olive:hover { background-color: var(--aero-olive-dark); transform: translateY(-1px); }
    .aero-pill-outline {
      background-color: var(--aero-surface);
      border: 1px solid var(--aero-border);
      color: var(--aero-text);
      transition: all 0.2s ease;
    }
    .aero-pill-outline:hover { border-color: var(--aero-olive); }
    .aero-hero-canvas {
      background: linear-gradient(125deg, #ECEAE3 0%, #DFDDD4 52%, #D4D1C7 100%);
    }
    html.dark .aero-hero-canvas {
      background: linear-gradient(125deg, #1B1E1B 0%, #232723 52%, #181B18 100%);
    }
    .aero-club-card {
      background: linear-gradient(135deg, #B5B3A8 0%, #8C8A7E 50%, #6E6C62 100%);
      box-shadow: 0 20px 40px -15px rgba(50, 54, 48, 0.35);
    }
    .no-scrollbar::-webkit-scrollbar { display: none; }
    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
  `;
  document.head.appendChild(style);
})();

const INITIAL_NUSA_STATE = {
  meta: {
    platformName: 'NUSA STEP B2B',
    totalAUM: 4850000000,
    escrowLiquidity: 1420000000,
    exportPoolDP: 960000000,
    activeB2BCreditVolume: 645000000,
    totalInventorySKUs: 5,
    lastUpdated: new Date().toISOString()
  },
  users: [
    {
      id: 'USR-MITRA-01',
      role: 'MITRA',
      authProvider: 'GOOGLE_OAUTH_2',
      name: 'Bp. Hendra Wijaya',
      email: 'hendra@rotiwarisan.id',
      password: 'password123',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      phone: '081234567801',
      entityId: 'UMKM-001',
      entityName: 'Roti Warisan Nusantara',
      kycStatus: 'VERIFIED_BANK_GRADE',
      registeredAt: '2026-09-10 08:30',
      lastLoginAt: '2026-10-31 19:15',
      loginCount: 14
    },
    {
      id: 'USR-MITRA-02',
      role: 'MITRA',
      authProvider: 'GOOGLE_OAUTH_2',
      name: 'Damar Prakoso',
      email: 'damar@kopimerapi.id',
      password: 'password123',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
      phone: '081234567802',
      entityId: 'UMKM-002',
      entityName: 'Kopi Lereng Merapi Roastery',
      kycStatus: 'VERIFIED_BANK_GRADE',
      registeredAt: '2026-09-12 10:00',
      lastLoginAt: '2026-10-31 20:05',
      loginCount: 22
    },
    {
      id: 'USR-MITRA-03',
      role: 'MITRA',
      authProvider: 'GOOGLE_OAUTH_2',
      name: 'Rizal & Koperasi Tani Makmur',
      email: 'rizal@coketa.id',
      password: 'password123',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
      phone: '081234567803',
      entityId: 'UMKM-003',
      entityName: 'Coketa Bio-Energy & Charcoal',
      kycStatus: 'VERIFIED_BANK_GRADE',
      registeredAt: '2026-09-15 14:20',
      lastLoginAt: '2026-10-30 16:10',
      loginCount: 9
    },
    {
      id: 'USR-INV-01',
      role: 'INVESTOR',
      authProvider: 'GOOGLE_OAUTH_2',
      name: 'Sovereign Impact Fund',
      email: 'invest@sovereign-impact.id',
      password: 'investor123',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
      phone: '081199887766',
      investorType: 'Institutional Venture Fund',
      npwp: '01.334.556.7-091.000',
      kycStatus: 'ACCREDITED_INVESTOR',
      registeredAt: '2026-09-01 09:00',
      lastLoginAt: '2026-10-31 20:40',
      loginCount: 31
    }
  ],
  authLogs: [
    {
      id: 'LOG-901',
      userId: 'USR-INV-01',
      name: 'Sovereign Impact Fund',
      email: 'invest@sovereign-impact.id',
      role: 'INVESTOR',
      action: 'GOOGLE_OAUTH_VERIFIED',
      portal: 'NusaBit Investor Terminal',
      timestamp: '2026-10-31 20:40:04'
    },
    {
      id: 'LOG-902',
      userId: 'USR-MITRA-02',
      name: 'Damar Prakoso',
      email: 'damar@kopimerapi.id',
      role: 'MITRA',
      action: 'GOOGLE_OAUTH_VERIFIED',
      portal: 'Portal Inventaris Mitra UMKM',
      timestamp: '2026-10-31 20:05:19'
    }
  ],
  b2bCatalog: [
    {
      id: 'B2B-101',
      sku: 'AERO-PKG-01',
      supplierId: 'UMKM-004',
      supplierName: 'NusaPack Eco-Packaging',
      itemName: 'NUSA PACK VORTEX QR-3',
      subtitle: 'Kemasan Standing Pouch + QR Audit (1.000 pcs)',
      category: 'Kemasan QR',
      categoryCode: 'PACKAGING',
      marketPrice: 2400000,
      ecosystemCreditPrice: 1850000,
      rating: 4.9,
      unitEquivalent: 1000,
      unitBadge: '1.000 PCS',
      tag: 'UNGGULAN',
      tagType: 'NEW',
      stock: 45,
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'B2B-102',
      sku: 'AERO-KOP-02',
      supplierId: 'UMKM-002',
      supplierName: 'Kopi Lereng Merapi Roastery',
      itemName: 'MERAPI PULSE ARABICA PRO',
      subtitle: 'Konsentrat Kopi & Bahan Baku Ekspor (250 Kg)',
      category: 'Bahan Baku',
      categoryCode: 'RAW',
      marketPrice: 4800000,
      ecosystemCreditPrice: 3650000,
      rating: 4.9,
      unitEquivalent: 500,
      unitBadge: '250 KG',
      tag: 'TERLARIS',
      tagType: 'NEW',
      stock: 28,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'B2B-103',
      sku: 'AERO-BRQ-03',
      supplierId: 'UMKM-003',
      supplierName: 'Coketa Bio-Energy & Charcoal',
      itemName: 'COKETA BIO-FLOW HEXA',
      subtitle: 'Briket Bio-Energi Kalori Tinggi Oven B2B (500 Kg)',
      category: 'Bio-Energi',
      categoryCode: 'ENERGY',
      marketPrice: 3500000,
      ecosystemCreditPrice: 2700000,
      rating: 4.8,
      unitEquivalent: 500,
      unitBadge: '500 KG',
      tag: 'HEMAT 23%',
      tagType: 'DISCOUNT',
      stock: 60,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'B2B-104',
      sku: 'AERO-MCH-04',
      supplierId: 'UMKM-001',
      supplierName: 'Roti Warisan Nusantara',
      itemName: 'ROTARY OVEN & MIXER SHARE',
      subtitle: 'Sewa Kapasitas Mesin Industri (Shift Malam)',
      category: 'Sewa Mesin',
      categoryCode: 'MACHINERY',
      marketPrice: 1900000,
      ecosystemCreditPrice: 1350000,
      rating: 4.7,
      unitEquivalent: 200,
      unitBadge: '1 SHIFT',
      tag: '-29% HPP',
      tagType: 'DISCOUNT',
      stock: 14,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80'
    },
    {
      id: 'B2B-105',
      sku: 'AERO-EXP-05',
      supplierId: 'UMKM-002',
      supplierName: 'Konsorsium Ekspor Nusantara',
      itemName: 'SLOT KONTAINER ROTTERDAM X1',
      subtitle: 'Kuota Palet Kontainer Kolektif Berpendingin',
      category: 'Logistik Ekspor',
      categoryCode: 'EXPORT',
      marketPrice: 6200000,
      ecosystemCreditPrice: 4900000,
      rating: 4.9,
      unitEquivalent: 1000,
      unitBadge: '2 PALET',
      tag: 'OPM 50% DP',
      tagType: 'NEW',
      stock: 19,
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80'
    }
  ],
  umkmList: [
    {
      id: 'UMKM-001',
      ticker: 'ROTI-SKH',
      name: 'Roti Warisan Nusantara',
      owner: 'Bp. Hendra Wijaya (54 thn)',
      sector: 'F&B Bakery & Pastry',
      location: 'Sukoharjo, Jawa Tengah',
      stage: 'Tranche 2: Standarisasi QC & Kemasan',
      trancheCurrent: 2,
      trancheTotal: 3,
      trancheFrozen: false,
      capitalInjected: 350000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 315000000,
      profitSharePct: 25,
      escrowBalance: 85000000,
      b2bCreditBalance: 42000000,
      hppReductionPct: 22.4,
      monthlyRevenue: 168000000,
      monthlyNetProfit: 46500000,
      unitPriceLot: 250000,
      availableLots: 420,
      totalLots: 1400,
      yieldAnnualized: 19.8,
      exportMOQContribution: 3500,
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&auto=format&fit=crop&q=80',
      training: {
        mod1_hpp_ringfencing: true,
        mod2_qc_massbalance: true,
        mod3_market_export: false,
        quizScore: 0,
        certified: false,
        completedAt: null
      },
      massBalance: {
        inputUnits: 12000,
        posSalesUnits: 10850,
        warehouseStockUnits: 920,
        verifiedRejectUnits: 110
      },
      financialHistory: [112, 125, 138, 149, 155, 168],
      lastAuditDate: '2026-10-14',
      riskNote: 'Operasional stabil. Rasio konversi bahan baku ke produk jadi sangat presisi.'
    },
    {
      id: 'UMKM-002',
      ticker: 'KOPI-JTG',
      name: 'Kopi Lereng Merapi Roastery',
      owner: 'Damar Prakoso (24 thn)',
      sector: 'Agro-Processing & Specialty Coffee',
      location: 'Boyolali, Jawa Tengah',
      stage: 'Tranche 3: Agregasi Ekspor Global',
      trancheCurrent: 3,
      trancheTotal: 3,
      trancheFrozen: false,
      capitalInjected: 500000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 640000000,
      profitSharePct: 25,
      escrowBalance: 140000000,
      b2bCreditBalance: 68000000,
      hppReductionPct: 27.8,
      monthlyRevenue: 245000000,
      monthlyNetProfit: 72000000,
      unitPriceLot: 500000,
      availableLots: 180,
      totalLots: 1000,
      yieldAnnualized: 23.4,
      exportMOQContribution: 6200,
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80',
      training: {
        mod1_hpp_ringfencing: true,
        mod2_qc_massbalance: true,
        mod3_market_export: true,
        quizScore: 100,
        certified: true,
        completedAt: '2026-10-05'
      },
      massBalance: {
        inputUnits: 8500,
        posSalesUnits: 7600,
        warehouseStockUnits: 740,
        verifiedRejectUnits: 95
      },
      financialHistory: [160, 175, 190, 210, 232, 245],
      lastAuditDate: '2026-10-18',
      riskNote: 'Siap melakukan Joint Venture Spin-Off (55/45) untuk kontrak buyer Belanda.'
    },
    {
      id: 'UMKM-003',
      ticker: 'BRQ-SOLO',
      name: 'Coketa Bio-Energy & Charcoal',
      owner: 'Rizal & Koperasi Tani Makmur',
      sector: 'CleanTech & Biomass Export',
      location: 'Nguter, Sukoharjo',
      stage: 'Tranche 2: Upgrade Mesin Press & Kemasan QR',
      trancheCurrent: 2,
      trancheTotal: 3,
      trancheFrozen: true,
      capitalInjected: 420000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 195000000,
      profitSharePct: 25,
      escrowBalance: 64000000,
      b2bCreditBalance: 29000000,
      hppReductionPct: 19.5,
      monthlyRevenue: 134000000,
      monthlyNetProfit: 38000000,
      unitPriceLot: 300000,
      availableLots: 510,
      totalLots: 1400,
      yieldAnnualized: 18.2,
      exportMOQContribution: 8000,
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&auto=format&fit=crop&q=80',
      training: {
        mod1_hpp_ringfencing: true,
        mod2_qc_massbalance: false,
        mod3_market_export: false,
        quizScore: 0,
        certified: false,
        completedAt: null
      },
      massBalance: {
        inputUnits: 15000,
        posSalesUnits: 12400,
        warehouseStockUnits: 1600,
        verifiedRejectUnits: 250
      },
      financialHistory: [95, 108, 119, 142, 139, 134],
      lastAuditDate: '2026-10-02',
      riskNote: 'Terdeteksi deviasi Mass Balance 5.0% pada batch kemasan Oktober.'
    },
    {
      id: 'UMKM-004',
      ticker: 'KMSN-SMG',
      name: 'NusaPack Eco-Packaging',
      owner: 'Ibu Ratna Sari (47 thn)',
      sector: 'Downstream B2B Packaging & QR Label',
      location: 'Semarang, Jawa Tengah',
      stage: 'Tranche 2: Otomasi Cetak QR Anti-Fraud',
      trancheCurrent: 2,
      trancheTotal: 3,
      trancheFrozen: false,
      capitalInjected: 300000000,
      targetCapMultiplier: 1.6,
      returnedToInvestor: 270000000,
      profitSharePct: 25,
      escrowBalance: 92000000,
      b2bCreditBalance: 54000000,
      hppReductionPct: 24.1,
      monthlyRevenue: 152000000,
      monthlyNetProfit: 41000000,
      unitPriceLot: 200000,
      availableLots: 310,
      totalLots: 1500,
      yieldAnnualized: 20.5,
      exportMOQContribution: 4500,
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=600&auto=format&fit=crop&q=80',
      training: {
        mod1_hpp_ringfencing: true,
        mod2_qc_massbalance: true,
        mod3_market_export: true,
        quizScore: 95,
        certified: true,
        completedAt: '2026-10-11'
      },
      massBalance: {
        inputUnits: 20000,
        posSalesUnits: 18400,
        warehouseStockUnits: 1300,
        verifiedRejectUnits: 180
      },
      financialHistory: [105, 118, 126, 135, 144, 152],
      lastAuditDate: '2026-10-19',
      riskNote: 'Pemasok utama kemasan QR untuk seluruh ekosistem B2B NusaVenture.'
    }
  ],
  escrowRequests: [
    {
      id: 'ESC-881',
      umkmId: 'UMKM-001',
      umkmName: 'Roti Warisan Nusantara',
      supplierName: 'PT Bogasari / Koperasi Gandum Nusantara',
      purpose: 'Pengadaan 4 Ton Tepung Protein Tinggi (Tranche 2 Milestone)',
      amount: 38500000,
      date: '2026-10-31 09:15',
      status: 'PENDING_CO_MANAGER',
      umkmOwnerApproved: true,
      coManagerApproved: false
    },
    {
      id: 'ESC-882',
      umkmId: 'UMKM-003',
      umkmName: 'Coketa Bio-Energy & Charcoal',
      supplierName: 'CV Teknik Mandiri Pressindo',
      purpose: 'Pelunasan Suku Cadang Hydraulic Briquette Extruder',
      amount: 24000000,
      date: '2026-10-31 11:40',
      status: 'BLOCKED_BY_MASS_BALANCE',
      umkmOwnerApproved: true,
      coManagerApproved: false
    }
  ],
  b2bTransactions: [
    {
      id: 'TX-B2B-901',
      buyerName: 'Roti Warisan Nusantara',
      sellerName: 'NusaPack Eco-Packaging',
      item: 'NUSA PACK VORTEX QR-3 (x2)',
      creditAmount: 3700000,
      savedAmount: 1100000,
      timestamp: '2026-10-30 16:20'
    },
    {
      id: 'TX-B2B-902',
      buyerName: 'Roti Warisan Nusantara',
      sellerName: 'Coketa Bio-Energy & Charcoal',
      item: 'COKETA BIO-FLOW HEXA (x1)',
      creditAmount: 2700000,
      savedAmount: 800000,
      timestamp: '2026-10-31 08:10'
    }
  ],
  applications: [
    {
      id: 'APP-301',
      businessName: 'Keripik Singkong Fermentasi Mojolaban',
      legalEntityType: 'CV (Commanditaire Vennootschap)',
      nibNumber: '9120300451821',
      npwpBusiness: '02.881.992.1-532.000',
      ownerName: 'Ibu Sri Wahyuni',
      ownerNik: '3311084905770002',
      ownerPhone: '081329004411',
      ownerEmail: 'sriwahyuni@mocafsnack.id',
      age: 49,
      sector: 'F&B Bakery & Pengolahan Pangan',
      location: 'Mojolaban, Sukoharjo',
      bankName: 'Bank Mandiri',
      bankAccountNo: '1380019283746',
      slikStatus: 'Kolektibilitas 1 (Lancar)',
      monthlyRevenue: 48000000,
      monthlyNetProfit: 13500000,
      painPoint: 'Biaya kemasan tinggi & terjerat bunga pinjaman konvensional',
      requestedCapital: 150000000,
      tranchePlan: 'T1: Bahan baku singkong | T2: Mesin spinner & kemasan QR | T3: Ekspor',
      exportTarget: 'Malaysia & Singapura (4.000 pack/bln)',
      diagnosticScore: 88,
      status: 'MENUNGGU_DUE_DILIGENCE',
      submittedAt: '2026-10-31 07:30'
    }
  ],
  auditSchedules: [
    {
      id: 'AUD-501',
      umkmId: 'UMKM-003',
      umkmName: 'Coketa Bio-Energy & Charcoal',
      auditor: 'Tim Audit Lapangan Alpha (Raffi & Dzikra)',
      auditType: 'Investigasi Deviasi Mass-Balance (5.0% Gap)',
      scheduledDate: '2026-11-02 09:00 WIB',
      priority: 'CRITICAL',
      status: 'TERJADWAL',
      aiReasoning: 'Selisih 750 unit antara input bahan baku dan output POS + Gudang melewati batas toleransi 3.0%.'
    }
  ],
  investorTrades: [
    {
      id: 'TRD-701',
      investorName: 'Sovereign Impact Fund',
      ticker: 'KOPI-JTG',
      type: 'TRANCHE_BUY',
      lots: 50,
      totalValue: 25000000,
      timestamp: '2026-10-31 14:20'
    }
  ]
};

/**
 * ============================================================================
 * LAYER 1: ENCAPSULATED BLACK-BOX UI COMPONENTS (PURE PROPS-IN / EVENTS-OUT)
 * ============================================================================
 * Tidak ada panggilan fetch(), localStorage, atau mutasi state global di dalam
 * komponen ini. Seluruh interaksi dikirim melalui callback terikat.
 */
const NusaBlackBoxUI = {
  renderHeader(props) {
    const {
      brandTitle = 'AERO STEP',
      brandSub = 'NUSA B2B INVENTORY',
      navItems = [],
      user = null,
      badgeLabel = 'Inventaris',
      badgeCount = 0,
      onLoginClick = 'NusaCore.openOAuthModal()',
      onBadgeClick = '#katalog'
    } = props;

    const navHtml = navItems
      .map(
        n =>
          `<a href="${n.href}" class="text-xs sm:text-sm font-medium hover:opacity-70 transition whitespace-nowrap">${n.label}</a>`
      )
      .join('');

    const userPillHtml = user
      ? `<div class="flex items-center gap-2">
           <button onclick="${onLoginClick}" class="aero-pill-outline px-4 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
             <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
             <span class="truncate max-w-[130px]">${user.name}</span>
           </button>
           <button onclick="NusaCore.logoutAll()" title="Keluar Sesi" class="aero-pill-outline px-3 py-2.5 rounded-full text-xs font-bold text-rose-500 hover:bg-rose-500/10">
             ✕
           </button>
         </div>`
      : `<button onclick="${onLoginClick}" class="aero-pill-outline px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm">
           <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/></svg>
           <span>Masuk OAuth</span>
         </button>`;

    return `
      <header class="sticky top-0 z-40 backdrop-blur-md bg-[var(--aero-bg)]/90 border-b border-[var(--aero-border)]">
        <div class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          <!-- Brand Logo Identical to Aero Step -->
          <a href="#" class="flex items-center gap-3 shrink-0">
            <div class="w-10 h-10 rounded-2xl aero-stone flex items-center justify-center font-extrabold text-sm tracking-tighter">
              <svg class="w-6 h-6 text-[var(--aero-olive)]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 8.5c-4.5 0-8.2 1.8-11.2 4.8L4 19h4.5l4.2-4.2c2.2-2.2 5-3.3 8.3-3.3V8.5zM17 5c-4.5 0-8.5 2-11.5 5L2 13.5h3.8l3.5-3.5C11.5 7.8 14.2 6.8 17 6.8V5z"/>
              </svg>
            </div>
            <div>
              <span class="block text-base sm:text-lg font-extrabold tracking-tight leading-none">${brandTitle}</span>
              <span class="block text-[9px] uppercase tracking-[0.22em] text-[var(--aero-muted)] font-bold mt-0.5">${brandSub}</span>
            </div>
          </a>

          <!-- Center Horizontal Navigation -->
          <nav class="hidden lg:flex items-center gap-7 text-[var(--aero-text)]">
            ${navHtml}
          </nav>

          <!-- Right Action Pills (Theme Toggle + Google OAuth Login Pill + Olive Cart/Inventory Pill) -->
          <div class="flex items-center gap-2.5">
            <button data-theme-toggle onclick="NusaCore.toggleTheme()" class="aero-pill-outline px-3.5 py-2.5 rounded-full text-xs font-bold">
              🌙 Mode
            </button>
            ${userPillHtml}
            <a href="${onBadgeClick}" class="aero-btn-olive px-4 sm:px-5 py-2.5 rounded-full text-xs font-bold flex items-center gap-2.5 shadow-sm">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"/></svg>
              <span class="hidden sm:inline">${badgeLabel}</span>
              <span class="w-5 h-5 rounded-full bg-white text-[#3E433B] font-mono-num text-[11px] font-extrabold flex items-center justify-center">${badgeCount}</span>
            </a>
          </div>
        </div>
      </header>
    `;
  },

  renderHeroBanner(props) {
    const {
      badge = 'EKOSISTEM INVENTARIS B2B TERPADU',
      titleLines = [
        'MANAJEMEN STOK',
        'UNTUK RITME,',
        'EFISIENSI HPP, DAN',
        'EKSPOR GLOBAL'
      ],
      subtitle = 'Teknologi audit Mass-Balance, rantai pasok B2B tanpa tengkulak, dan modal kerja bertahap untuk akselerasi UMKM Indonesia.',
      primaryCta = { label: 'Buka Katalog B2B', href: '#katalog' },
      secondaryCta = { label: 'Simulasi 1.6x', href: '#simulasi' },
      heroImage = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1000&auto=format&fit=crop&q=80',
      floatingPerks = [
        { icon: '📦', title: 'Tanpa Tengkulak', sub: 'Potong HPP 15%–30%' },
        { icon: '🛡️', title: 'Zero Agunan Rumah', sub: '100% Ring-Fenced Asset' },
        { icon: '🔍', title: 'Mass-Balance QR', sub: 'Toleransi Gap Maks 3.0%' }
      ],
      socialProof = { countText: '10.000+ Transaksi B2B', rating: '4.9' }
    } = props;

    return `
      <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div class="aero-hero-canvas rounded-[34px] p-6 sm:p-10 lg:p-12 relative overflow-hidden border border-[var(--aero-border)]">
          <div class="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <!-- Left Editorial Headline Column (5 Cols) -->
            <div class="lg:col-span-5 space-y-6">
              <span class="inline-block px-4 py-1.5 rounded-full bg-white/80 dark:bg-black/40 text-[11px] font-extrabold uppercase tracking-wider text-[var(--aero-olive)]">
                ${badge}
              </span>

              <h1 class="text-3xl sm:text-4xl lg:text-[44px] font-extrabold uppercase tracking-tight leading-[1.08] text-[var(--aero-text)]">
                ${titleLines.join('<br/>')}
              </h1>

              <p class="text-sm sm:text-base text-[var(--aero-muted)] leading-relaxed max-w-md">
                ${subtitle}
              </p>

              <div class="flex flex-wrap items-center gap-3 pt-2">
                <a href="${primaryCta.href}" class="aero-btn-olive px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold inline-flex items-center gap-3 shadow-sm">
                  <span>${primaryCta.label}</span>
                  <span>→</span>
                </a>
                <a href="${secondaryCta.href}" class="aero-pill-outline px-6 py-3.5 rounded-full text-xs sm:text-sm font-bold">
                  ${secondaryCta.label}
                </a>
              </div>
            </div>

            <!-- Center Showcase Visual (4 Cols) -->
            <div class="lg:col-span-4 flex items-center justify-center">
              <div class="relative w-full max-w-[360px] aspect-square rounded-[32px] overflow-hidden shadow-lg border-4 border-white/60 dark:border-white/10">
                <img src="${heroImage}" alt="Showcase" class="w-full h-full object-cover object-center transform hover:scale-105 transition duration-500" />
              </div>
            </div>

            <!-- Right Floating Feature Cards & Social Proof (3 Cols - Identical to Aero Step Image) -->
            <div class="lg:col-span-3 flex flex-col gap-3.5 justify-between">
              ${floatingPerks
                .map(
                  p => `
                <div class="aero-surface rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
                  <div class="w-10 h-10 rounded-full aero-stone-soft flex items-center justify-center text-base shrink-0">
                    ${p.icon}
                  </div>
                  <div>
                    <p class="text-xs font-extrabold text-[var(--aero-text)] leading-snug">${p.title}</p>
                    <p class="text-[11px] text-[var(--aero-muted)] mt-0.5">${p.sub}</p>
                  </div>
                </div>
              `
                )
                .join('')}

              <!-- Bottom-Right Social Proof Pill Card -->
              <div class="aero-surface rounded-2xl p-3.5 flex items-center justify-between gap-3 shadow-sm mt-1">
                <div class="flex -space-x-2 overflow-hidden">
                  <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80" alt="User 1"/>
                  <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" alt="User 2"/>
                  <img class="inline-block h-8 w-8 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" alt="User 3"/>
                </div>
                <div class="text-right">
                  <p class="text-[11px] font-bold text-[var(--aero-text)]">${socialProof.countText}</p>
                  <p class="text-xs font-mono-num font-extrabold text-[var(--aero-gold)]">${socialProof.rating} ★★★★★</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  renderSearchAndCategoryBar(props) {
    const {
      searchId = 'aeroSearchInput',
      placeholder = 'Cari SKU inventaris, bahan baku, mesin, atau emiten UMKM...',
      onSearchInput = '',
      categories = [
        { id: 'ALL', icon: '⊞', label: 'Semua Kategori' },
        { id: 'RAW', icon: '🌾', label: 'Bahan Baku' },
        { id: 'PACKAGING', icon: '📦', label: 'Kemasan QR' },
        { id: 'ENERGY', icon: '🔥', label: 'Bio-Energi' },
        { id: 'MACHINERY', icon: '⚙️', label: 'Sewa Mesin' },
        { id: 'EXPORT', icon: '🚢', label: 'Logistik Ekspor' }
      ],
      activeCategory = 'ALL',
      onCategoryClick = 'handleSelectCategory'
    } = props;

    return `
      <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="aero-surface rounded-[24px] p-2.5 flex flex-wrap lg:flex-nowrap items-center justify-between gap-3 shadow-sm">
          <!-- Left Search Pill with Circular Olive Search Button -->
          <div class="flex items-center w-full lg:w-[380px] aero-stone-soft rounded-full pl-4 pr-1.5 py-1.5">
            <svg class="w-4 h-4 text-[var(--aero-muted)] mr-2 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            <input id="${searchId}" type="text" oninput="${onSearchInput}" placeholder="${placeholder}" class="w-full bg-transparent text-xs font-medium focus:outline-none text-[var(--aero-text)]" />
            <button onclick="${onSearchInput}" class="w-8 h-8 rounded-full aero-btn-olive flex items-center justify-center shrink-0">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/></svg>
            </button>
          </div>

          <!-- Right Category Filter Pills -->
          <div class="flex items-center gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto py-1">
            ${categories
              .map(cat => {
                const isActive = cat.id === activeCategory;
                return `
                  <button onclick="${onCategoryClick}('${cat.id}')" class="px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 whitespace-nowrap transition ${
                    isActive
                      ? 'aero-btn-olive shadow-sm'
                      : 'aero-stone-soft text-[var(--aero-text)] hover:opacity-80'
                  }">
                    <span>${cat.icon}</span>
                    <span>${cat.label}</span>
                  </button>
                `;
              })
              .join('')}
          </div>
        </div>
      </section>
    `;
  },

  renderInventoryCard(props) {
    const {
      id,
      title,
      subtitle,
      priceFormatted,
      oldPriceFormatted = '',
      rating = '4.9',
      unitBadge = '1 LOT',
      tag = '',
      tagType = 'NEW',
      image,
      actionLabel = 'Pesan B2B',
      onActionClick = ''
    } = props;

    const tagStyle =
      tagType === 'DISCOUNT'
        ? 'background-color: var(--aero-coral-bg); color: var(--aero-coral-text);'
        : 'background-color: var(--aero-stone); color: var(--aero-text);';

    return `
      <div class="aero-surface rounded-[26px] p-4 flex flex-col justify-between hover:shadow-md transition group">
        <div>
          <!-- Image Pedestal Container -->
          <div class="relative aero-stone-soft rounded-[20px] aspect-[4/3] overflow-hidden mb-3.5">
            ${
              tag
                ? `<span style="${tagStyle}" class="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider">${tag}</span>`
                : ''
            }
            <button onclick="${onActionClick}" title="Tindakan Cepat" class="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/85 dark:bg-black/60 flex items-center justify-center text-xs hover:scale-110 transition">
              ♡
            </button>
            <img src="${image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
          </div>

          <h3 class="text-xs sm:text-sm font-extrabold uppercase tracking-tight text-[var(--aero-text)] truncate">${title}</h3>
          <p class="text-[11px] text-[var(--aero-muted)] mt-0.5 truncate">${subtitle}</p>
        </div>

        <div class="pt-3 mt-3 border-t border-[var(--aero-border)] space-y-2.5">
          <div class="flex items-center justify-between text-xs">
            <div class="flex items-baseline gap-1.5">
              <span class="font-mono-num font-extrabold text-sm text-[var(--aero-text)]">${priceFormatted}</span>
              ${
                oldPriceFormatted
                  ? `<span class="font-mono-num text-[10px] line-through text-[var(--aero-muted)]">${oldPriceFormatted}</span>`
                  : ''
              }
            </div>
            <span class="font-mono-num text-[11px] font-bold text-[var(--aero-gold)]">★ ${rating}</span>
          </div>

          <div class="flex items-center justify-between gap-2">
            <span class="px-2.5 py-1 rounded-full aero-stone-soft font-mono-num text-[10px] font-bold text-[var(--aero-muted)]">${unitBadge}</span>
            ${
              onActionClick
                ? `<button onclick="${onActionClick}" class="aero-btn-olive px-3.5 py-1.5 rounded-full text-[11px] font-bold">${actionLabel} →</button>`
                : ''
            }
          </div>
        </div>
      </div>
    `;
  },

  renderBentoGrid(bentoItems) {
    return `
      <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid md:grid-cols-2 gap-5">
          ${bentoItems
            .map(
              b => `
            <div class="aero-surface rounded-[28px] overflow-hidden grid grid-cols-12 min-h-[210px] shadow-sm hover:shadow-md transition">
              <div class="col-span-7 p-6 sm:p-7 flex flex-col justify-between">
                <div>
                  <h3 class="text-lg sm:text-xl font-extrabold uppercase tracking-tight text-[var(--aero-text)]">${b.title}</h3>
                  <p class="text-xs text-[var(--aero-muted)] mt-2 leading-relaxed">${b.desc}</p>
                </div>
                <a href="${b.href || '#'}" class="inline-flex items-center gap-1.5 text-xs font-extrabold text-[var(--aero-olive)] hover:underline mt-4">
                  <span>${b.linkText || 'Selengkapnya'}</span>
                  <span>→</span>
                </a>
              </div>
              <div class="col-span-5 relative overflow-hidden aero-stone-soft">
                <img src="${b.image}" alt="${b.title}" class="w-full h-full object-cover" />
              </div>
            </div>
          `
            )
            .join('')}
        </div>
      </section>
    `;
  },

  renderTechPillars(title, pillars) {
    return `
      <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 class="text-base sm:text-lg font-extrabold uppercase tracking-wider text-[var(--aero-text)] mb-5">${title}</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          ${pillars
            .map(
              p => `
            <div class="aero-surface rounded-[24px] p-5 text-center flex flex-col items-center justify-between space-y-2.5 shadow-sm">
              <div class="w-11 h-11 rounded-2xl aero-stone-soft flex items-center justify-center text-lg text-[var(--aero-olive)]">
                ${p.icon}
              </div>
              <h4 class="text-xs font-extrabold uppercase tracking-wide text-[var(--aero-text)]">${p.title}</h4>
              <p class="text-[11px] text-[var(--aero-muted)] leading-relaxed">${p.desc}</p>
            </div>
          `
            )
            .join('')}
        </div>
      </section>
    `;
  },

  renderClubBanner(props) {
    const {
      cardTitle = 'NUSA STEP',
      cardSub = 'B2B ESCROW PASS',
      headline = 'Bergabung ke Ekosistem NUSA B2B CLUB',
      desc = 'Akses pendanaan modal kerja bertahap tanpa agunan pribadi, diskon bahan baku B2B hingga 30%, dan kuota kontainer ekspor kolektif.',
      perks = [
        'Potong HPP 15%–30% via B2B Credit',
        'Akses Prioritas Kontainer Ekspor',
        'Zero Agunan Rumah / Tanah Pribadi',
        'Lulus Mandiri 100% pada Cap 1.6x'
      ],
      ctaLabel = 'Ajukan Kemitraan',
      ctaHref = '#daftar'
    } = props;

    return `
      <section class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="aero-stone rounded-[32px] p-6 sm:p-10 grid lg:grid-cols-12 gap-8 items-center border border-[var(--aero-border)]">
          <!-- Left 3D Metallic Card Illustration (Identical to Aero Step Club Card) -->
          <div class="lg:col-span-4 flex justify-center">
            <div class="aero-club-card w-full max-w-[300px] aspect-[1.58/1] rounded-[22px] p-6 text-white flex flex-col justify-between transform -rotate-3 hover:rotate-0 transition duration-300">
              <div class="flex items-start justify-between">
                <div>
                  <p class="text-xl font-extrabold tracking-tight leading-none">${cardTitle}</p>
                  <p class="text-[10px] uppercase tracking-widest opacity-80 mt-1">${cardSub}</p>
                </div>
                <div class="w-8 h-6 rounded bg-amber-200/80 border border-white/40"></div>
              </div>
              <div class="flex items-center justify-between text-[11px] font-mono-num opacity-90">
                <span>RING-FENCED 1.6X CAP</span>
                <span>OAUTH VERIFIED</span>
              </div>
            </div>
          </div>

          <!-- Center Perks Description (5 Cols) -->
          <div class="lg:col-span-5 space-y-4">
            <h3 class="text-xl sm:text-2xl font-extrabold text-[var(--aero-text)]">${headline}</h3>
            <p class="text-xs sm:text-sm text-[var(--aero-muted)] leading-relaxed">${desc}</p>
            <div class="grid sm:grid-cols-2 gap-2.5 pt-1">
              ${perks
                .map(
                  perk => `
                <div class="flex items-center gap-2 text-xs font-semibold text-[var(--aero-text)]">
                  <span class="w-5 h-5 rounded-full aero-surface flex items-center justify-center text-[10px] text-[var(--aero-olive)]">★</span>
                  <span>${perk}</span>
                </div>
              `
                )
                .join('')}
            </div>
          </div>

          <!-- Right CTA Pill (3 Cols) -->
          <div class="lg:col-span-3 flex flex-col items-start lg:items-end justify-center">
            <a href="${ctaHref}" class="aero-btn-olive px-7 py-4 rounded-full text-xs sm:text-sm font-extrabold shadow-sm text-center w-full sm:w-auto">
              ${ctaLabel}
            </a>
            <span class="text-[11px] text-[var(--aero-muted)] mt-2 lg:mr-4">Tanpa biaya pendaftaran awal</span>
          </div>
        </div>
      </section>
    `;
  },

  renderFooter(portalTitle = 'NUSA STEP B2B') {
    const slaItems = [
      { icon: '🚚', title: 'Distribusi B2B Sirkular', sub: 'Pengiriman langsung antar-gudang UMKM mitra' },
      { icon: '🔄', title: 'Audit Mass-Balance 3.0%', sub: 'Rekonsiliasi stok QR otomatis & transparan' },
      { icon: '🛡️', title: '100% Ring-Fenced Capital', sub: 'Tanpa agunan sertifikat rumah/tanah pribadi' },
      { icon: '🎧', title: 'Pendampingan Co-Manager 24/7', sub: 'Didukung NusaAI Forensic Auditor' }
    ];

    return `
      <footer class="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-12 space-y-8">
        <!-- Top 4-Column Trust & SLA Strip -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[var(--aero-border)]">
          ${slaItems
            .map(
              s => `
            <div class="aero-surface rounded-2xl p-4 flex items-center gap-3.5 shadow-sm">
              <div class="w-10 h-10 rounded-xl aero-stone-soft flex items-center justify-center text-base shrink-0">${s.icon}</div>
              <div>
                <p class="text-xs font-extrabold text-[var(--aero-text)]">${s.title}</p>
                <p class="text-[11px] text-[var(--aero-muted)]">${s.sub}</p>
              </div>
            </div>
          `
            )
            .join('')}
        </div>

        <!-- Bottom 5-Column Editorial Footer -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 pt-6 border-t border-[var(--aero-border)] text-xs">
          <div class="lg:col-span-1 space-y-3">
            <p class="text-base font-extrabold tracking-tight">${portalTitle}</p>
            <p class="text-[var(--aero-muted)] leading-relaxed">
              Ekosistem manajemen inventaris B2B, modal kerja bertahap (Tranche), dan agregasi ekspor UMKM Indonesia dengan arsitektur Waterfall & Black-Box UI.
            </p>
          </div>
          <div class="space-y-2">
            <p class="font-extrabold uppercase tracking-wider">Katalog Inventaris</p>
            <ul class="space-y-1.5 text-[var(--aero-muted)]">
              <li>Bahan Baku Hulu</li>
              <li>Kemasan QR Anti-Fraud</li>
              <li>Briket Bio-Energi</li>
              <li>Sewa Mesin Industri</li>
            </ul>
          </div>
          <div class="space-y-2">
            <p class="font-extrabold uppercase tracking-wider">Mitra & Investor</p>
            <ul class="space-y-1.5 text-[var(--aero-muted)]">
              <li>Dual-Approval Escrow</li>
              <li>Kurikulum NusaAcademy</li>
              <li>Redeemable Cap 1.6x</li>
              <li>Google OAuth 2.0 SSO</li>
            </ul>
          </div>
          <div class="space-y-2">
            <p class="font-extrabold uppercase tracking-wider">Tata Kelola</p>
            <ul class="space-y-1.5 text-[var(--aero-muted)]">
              <li>Ring-Fencing Aset</li>
              <li>Mass-Balance Telemetry</li>
              <li>SLIK OJK & KYB Bank</li>
              <li>OPM Export Pool 50%</li>
            </ul>
          </div>
          <div class="space-y-2">
            <p class="font-extrabold uppercase tracking-wider">Kontak Operasional</p>
            <ul class="space-y-1.5 text-[var(--aero-muted)] font-mono-num">
              <li>📞 0800-123-NUSA</li>
              <li>✉️ b2b@nusaventure.id</li>
              <li>📍 Sukoharjo & Surakarta, Jawa Tengah</li>
              <li>🕒 Operasional 08:00 – 21:00 WIB</li>
            </ul>
          </div>
        </div>
      </footer>
    `;
  }
};

/**
 * ============================================================================
 * LAYER 2: SERVICE ORCHESTRATOR, STATE ENGINE & GOOGLE OAUTH 2.0 HANDLER
 * ============================================================================
 */
const NusaCore = {
  channel: typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(NUSA_CHANNEL_NAME) : null,

  getTheme(defaultTheme = 'light') {
    return localStorage.getItem(NUSA_THEME_KEY) || defaultTheme;
  },

  setTheme(mode) {
    localStorage.setItem(NUSA_THEME_KEY, mode);
    this.applyTheme(mode);
    if (this.channel) this.channel.postMessage({ type: 'THEME_UPDATED', theme: mode });
  },

  toggleTheme() {
    const next = this.getTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
    return next;
  },

  applyTheme(defaultTheme = 'light') {
    const mode = this.getTheme(defaultTheme);
    const root = document.documentElement;
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');

    document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
      btn.innerHTML = mode === 'dark' ? '☀️ Siang' : '🌙 Malam';
    });
    return mode;
  },

  getState() {
    try {
      const raw = localStorage.getItem(NUSA_STORAGE_KEY);
      if (!raw) {
        this.saveState(INITIAL_NUSA_STATE, false);
        return JSON.parse(JSON.stringify(INITIAL_NUSA_STATE));
      }
      const parsed = JSON.parse(raw);
      if (!parsed.b2bCatalog || !parsed.b2bCatalog[0]?.sku) {
        parsed.b2bCatalog = INITIAL_NUSA_STATE.b2bCatalog;
      }
      return parsed;
    } catch (e) {
      return JSON.parse(JSON.stringify(INITIAL_NUSA_STATE));
    }
  },

  saveState(newState, broadcast = true) {
    newState.meta.lastUpdated = new Date().toISOString();
    newState.umkmList.forEach(u => {
      const mb = this.calculateMassBalance(u.massBalance);
      u.trancheFrozen = mb.isAlert;
    });
    localStorage.setItem(NUSA_STORAGE_KEY, JSON.stringify(newState));
    if (broadcast && this.channel) {
      this.channel.postMessage({ type: 'STATE_UPDATED', timestamp: newState.meta.lastUpdated });
    }
    fetch(`${API_BASE_URL}/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newState)
    }).catch(() => {});
  },

  resetState() {
    localStorage.removeItem(NUSA_STORAGE_KEY);
    this.saveState(JSON.parse(JSON.stringify(INITIAL_NUSA_STATE)), true);
    window.location.reload();
  },

  onUpdate(callback) {
    if (this.channel) {
      this.channel.onmessage = event => {
        if (event.data?.type === 'STATE_UPDATED') callback(this.getState());
        if (event.data?.type === 'THEME_UPDATED') this.applyTheme();
      };
    }
    window.addEventListener('storage', e => {
      if (e.key === NUSA_STORAGE_KEY) callback(this.getState());
      if (e.key === NUSA_THEME_KEY) this.applyTheme();
    });
  },

  // ================= GOOGLE OAUTH 2.0 & SESSION ENGINE =================
  async authenticateWithGoogleOAuth({ email, name, role = 'MITRA', entityName = '', portalName = 'NusaVenture Portal' }) {
    const state = this.getState();
    const cleanEmail = (email || '').trim().toLowerCase();
    if (!cleanEmail) throw new Error('Email akun Google wajib diisi.');

    let user = state.users.find(u => u.email.toLowerCase() === cleanEmail);
    if (!user) {
      let entityId = null;
      if (role === 'MITRA') {
        entityId = state.umkmList[0]?.id || 'UMKM-001';
      }
      user = {
        id: `USR-GOOG-${Math.floor(1000 + Math.random() * 9000)}`,
        role,
        authProvider: 'GOOGLE_OAUTH_2',
        name: name || cleanEmail.split('@')[0],
        email: cleanEmail,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name || cleanEmail)}&background=52584E&color=fff`,
        entityId,
        entityName: entityName || (role === 'MITRA' ? 'Mitra UMKM Terverifikasi' : 'Accredited Investor'),
        kycStatus: 'GOOGLE_OAUTH_VERIFIED',
        registeredAt: new Date().toLocaleString('id-ID'),
        lastLoginAt: new Date().toLocaleString('id-ID'),
        loginCount: 1
      };
      state.users.unshift(user);
    } else {
      user.lastLoginAt = new Date().toLocaleString('id-ID');
      user.loginCount = (user.loginCount || 0) + 1;
      user.authProvider = 'GOOGLE_OAUTH_2';
    }

    state.authLogs.unshift({
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      action: 'GOOGLE_OAUTH_2_LOGIN',
      portal: portalName,
      timestamp: user.lastLoginAt
    });

    this.saveState(state);

    // Sinkronisasi ke endpoint /api/auth/google di server.js
    try {
      const resp = await fetch(`${API_BASE_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          simulatedProfile: { email: user.email, name: user.name, entityName: user.entityName },
          requestedRole: user.role,
          portalName
        })
      });
      const data = await resp.json();
      if (data.token) user.sessionToken = data.token;
    } catch (e) {}

    this.setSession(user.role, user);
    this.setSession('ACTIVE_USER', user);
    return user;
  },

  registerUserAccount(payload) {
    const state = this.getState();
    const emailClean = (payload.email || '').trim().toLowerCase();
    if (!emailClean || !payload.password) throw new Error('Email dan kata sandi wajib diisi.');

    const existing = state.users.find(u => u.email.toLowerCase() === emailClean);
    if (existing) throw new Error('Email sudah terdaftar. Silakan masuk menggunakan Google OAuth atau form login.');

    let linkedEntityId = payload.entityId || 'UMKM-001';
    const newUser = {
      id: `USR-${payload.role}-${Math.floor(100 + Math.random() * 900)}`,
      role: payload.role,
      authProvider: 'PASSWORD_AND_OAUTH',
      name: payload.name,
      email: emailClean,
      password: payload.password,
      phone: payload.phone || '-',
      entityId: linkedEntityId,
      entityName: payload.entityName || payload.name,
      investorType: payload.investorType || null,
      npwp: payload.npwp || '-',
      kycStatus: payload.kycStatus || 'VERIFIED_ACTIVE',
      registeredAt: new Date().toLocaleString('id-ID'),
      lastLoginAt: new Date().toLocaleString('id-ID'),
      loginCount: 1
    };

    state.users.unshift(newUser);
    state.authLogs.unshift({
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      action: 'ACCOUNT_REGISTERED',
      portal: payload.role,
      timestamp: new Date().toLocaleString('id-ID')
    });

    this.saveState(state);
    this.setSession(payload.role, newUser);
    this.setSession('ACTIVE_USER', newUser);
    return newUser;
  },

  loginUser(email, password, requiredRole) {
    const state = this.getState();
    const cleanEmail = (email || '').trim().toLowerCase();
    const user = state.users.find(
      u => u.email.toLowerCase() === cleanEmail && u.password === password && (!requiredRole || u.role === requiredRole)
    );
    if (!user) throw new Error('Email atau kata sandi tidak cocok untuk portal ini.');

    user.lastLoginAt = new Date().toLocaleString('id-ID');
    user.loginCount = (user.loginCount || 0) + 1;

    state.authLogs.unshift({
      id: `LOG-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      action: 'LOGIN_SUCCESS',
      portal: requiredRole || 'Portal',
      timestamp: user.lastLoginAt
    });

    this.saveState(state);
    this.setSession(user.role, user);
    this.setSession('ACTIVE_USER', user);
    return user;
  },

  setSession(roleKey, userObj) {
    const safe = { ...userObj };
    delete safe.password;
    sessionStorage.setItem(NUSA_SESSION_PREFIX + roleKey, JSON.stringify(safe));
  },

  getSession(roleKey = 'ACTIVE_USER') {
    try {
      const raw = sessionStorage.getItem(NUSA_SESSION_PREFIX + roleKey);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  },

  logoutSession(roleKey) {
    sessionStorage.removeItem(NUSA_SESSION_PREFIX + roleKey);
    sessionStorage.removeItem(NUSA_SESSION_PREFIX + 'ACTIVE_USER');
  },

  logoutAll() {
    Object.keys(sessionStorage).forEach(k => {
      if (k.startsWith(NUSA_SESSION_PREFIX)) sessionStorage.removeItem(k);
    });
    window.location.reload();
  },

  // ================= UNIVERSAL GOOGLE OAUTH 2.0 BLACK-BOX MODAL =================
  openOAuthModal(defaultRole = 'MITRA', onSuccessCallback = null) {
    let modal = document.getElementById('nusaGoogleOAuthModal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'nusaGoogleOAuthModal';
      document.body.appendChild(modal);
    }

    modal.className = 'fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4';
    modal.innerHTML = `
      <div class="aero-surface rounded-[32px] max-w-md w-full p-7 shadow-2xl space-y-5 border border-[var(--aero-border)]">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm">
              <svg class="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.8C6.2 7.2 8.9 5 12 5z"/>
                <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.7z"/>
                <path fill="#FBBC05" d="M5.3 14.8c-.2-.8-.4-1.6-.4-2.5s.2-1.7.4-2.5L1.6 7C.6 9 0 11.2 0 13.5s.6 4.5 1.6 6.5l3.7-2.9z"/>
                <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.1-6.7-5l-3.7 2.8C3.5 21.4 7.4 24 12 24z"/>
              </svg>
            </div>
            <div>
              <h3 class="text-base font-extrabold text-[var(--aero-text)]">Google OAuth 2.0 SSO</h3>
              <p class="text-[11px] text-[var(--aero-muted)]">Pilih akun Google terverifikasi untuk melanjutkan</p>
            </div>
          </div>
          <button onclick="document.getElementById('nusaGoogleOAuthModal').classList.add('hidden')" class="w-8 h-8 rounded-full aero-stone-soft text-xs font-bold">✕</button>
        </div>

        <!-- Quick One-Tap Verified Google Accounts -->
        <div class="space-y-2">
          <p class="text-[11px] font-bold uppercase tracking-wider text-[var(--aero-muted)]">Akun Google Terdaftar (1-Klik OAuth):</p>
          <button type="button" onclick="NusaCore.triggerQuickGoogleAccount('hendra@rotiwarisan.id', 'Bp. Hendra Wijaya', 'MITRA', 'Roti Warisan Nusantara')" class="w-full p-3 rounded-2xl aero-stone-soft hover:opacity-90 flex items-center justify-between text-left transition">
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <p class="text-xs font-extrabold text-[var(--aero-text)]">Bp. Hendra Wijaya (Mitra UMKM)</p>
                <p class="text-[11px] text-[var(--aero-muted)] font-mono-num">hendra@rotiwarisan.id</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full aero-surface text-[10px] font-bold">MITRA</span>
          </button>

          <button type="button" onclick="NusaCore.triggerQuickGoogleAccount('damar@kopimerapi.id', 'Damar Prakoso', 'MITRA', 'Kopi Lereng Merapi Roastery')" class="w-full p-3 rounded-2xl aero-stone-soft hover:opacity-90 flex items-center justify-between text-left transition">
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <p class="text-xs font-extrabold text-[var(--aero-text)]">Damar Prakoso (Mitra Lulus LMS)</p>
                <p class="text-[11px] text-[var(--aero-muted)] font-mono-num">damar@kopimerapi.id</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full aero-surface text-[10px] font-bold">MITRA</span>
          </button>

          <button type="button" onclick="NusaCore.triggerQuickGoogleAccount('invest@sovereign-impact.id', 'Sovereign Impact Fund', 'INVESTOR', 'Institutional Venture Fund')" class="w-full p-3 rounded-2xl aero-stone-soft hover:opacity-90 flex items-center justify-between text-left transition">
            <div class="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=80" class="w-9 h-9 rounded-full object-cover" />
              <div>
                <p class="text-xs font-extrabold text-[var(--aero-text)]">Sovereign Impact Fund (Investor)</p>
                <p class="text-[11px] text-[var(--aero-muted)] font-mono-num">invest@sovereign-impact.id</p>
              </div>
            </div>
            <span class="px-2.5 py-1 rounded-full aero-surface text-[10px] font-bold">INVESTOR</span>
          </button>
        </div>

        <!-- Custom Google Workspace Email Input -->
        <form onsubmit="NusaCore.handleCustomOAuthSubmit(event, '${defaultRole}')" class="pt-3 border-t border-[var(--aero-border)] space-y-3">
          <p class="text-[11px] font-bold uppercase tracking-wider text-[var(--aero-muted)]">Atau Gunakan Email Google Workspace Lain:</p>
          <input id="oauthCustomName" type="text" required placeholder="Nama Lengkap Anda" class="w-full px-4 py-2.5 rounded-full aero-stone-soft text-xs font-medium focus:outline-none" />
          <div class="grid grid-cols-3 gap-2">
            <input id="oauthCustomEmail" type="email" required placeholder="nama@gmail.com" class="col-span-2 px-4 py-2.5 rounded-full aero-stone-soft text-xs font-medium focus:outline-none" />
            <select id="oauthCustomRole" class="px-3 py-2.5 rounded-full aero-stone-soft text-xs font-bold">
              <option value="MITRA" ${defaultRole === 'MITRA' ? 'selected' : ''}>MITRA</option>
              <option value="INVESTOR" ${defaultRole === 'INVESTOR' ? 'selected' : ''}>INVESTOR</option>
            </select>
          </div>
          <button type="submit" class="w-full py-3 rounded-full aero-btn-olive text-xs font-extrabold shadow-sm">
            Lanjutkan dengan Google OAuth 2.0 →
          </button>
        </form>
      </div>
    `;
    modal.classList.remove('hidden');
    this._oauthCallback = onSuccessCallback;
  },

  async triggerQuickGoogleAccount(email, name, role, entityName) {
    await this.authenticateWithGoogleOAuth({ email, name, role, entityName, portalName: document.title });
    const modal = document.getElementById('nusaGoogleOAuthModal');
    if (modal) modal.classList.add('hidden');
    if (typeof this._oauthCallback === 'function') this._oauthCallback();
    else window.location.reload();
  },

  async handleCustomOAuthSubmit(e, defaultRole) {
    e.preventDefault();
    const name = document.getElementById('oauthCustomName').value;
    const email = document.getElementById('oauthCustomEmail').value;
    const role = document.getElementById('oauthCustomRole').value || defaultRole;
    await this.triggerQuickGoogleAccount(email, name, role, name + ' Enterprise');
  },

  // ================= LMS & BUSINESS FORMULAS =================
  getTrainingStatus(umkm) {
    const t = umkm?.training || {
      mod1_hpp_ringfencing: false,
      mod2_qc_massbalance: false,
      mod3_market_export: false,
      quizScore: 0,
      certified: false
    };
    const completedCount =
      (t.mod1_hpp_ringfencing ? 1 : 0) +
      (t.mod2_qc_massbalance ? 1 : 0) +
      (t.mod3_market_export ? 1 : 0);
    const progressPct = Math.round((completedCount / 3) * 100);
    const isCertified = completedCount === 3 && t.certified;
    return { ...t, completedCount, progressPct, isCertified };
  },

  completeTrainingModule(umkmId, moduleKey, quizScore = 100) {
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.id === umkmId);
    if (!umkm) throw new Error('Data UMKM tidak ditemukan.');

    if (!umkm.training) {
      umkm.training = {
        mod1_hpp_ringfencing: false,
        mod2_qc_massbalance: false,
        mod3_market_export: false,
        quizScore: 0,
        certified: false,
        completedAt: null
      };
    }

    if (moduleKey === 'ALL_WITH_QUIZ') {
      umkm.training.mod1_hpp_ringfencing = true;
      umkm.training.mod2_qc_massbalance = true;
      umkm.training.mod3_market_export = true;
      umkm.training.quizScore = quizScore;
      umkm.training.certified = true;
      umkm.training.completedAt = new Date().toLocaleDateString('id-ID');
    } else {
      umkm.training[moduleKey] = true;
      if (
        umkm.training.mod1_hpp_ringfencing &&
        umkm.training.mod2_qc_massbalance &&
        umkm.training.mod3_market_export
      ) {
        umkm.training.quizScore = Math.max(umkm.training.quizScore || 90, quizScore);
        umkm.training.certified = true;
        umkm.training.completedAt = new Date().toLocaleDateString('id-ID');
      }
    }

    this.saveState(state);
    return this.getTrainingStatus(umkm);
  },

  calculateMassBalance(mb) {
    const input = Number(mb?.inputUnits) || 0;
    const pos = Number(mb?.posSalesUnits) || 0;
    const stock = Number(mb?.warehouseStockUnits) || 0;
    const reject = Number(mb?.verifiedRejectUnits) || 0;
    const accounted = pos + stock + reject;
    const unaccountedGap = Math.max(0, input - accounted);
    const discrepancyPct = input > 0 ? (unaccountedGap / input) * 100 : 0;
    const isAlert = discrepancyPct > 3.0;

    return {
      input,
      accounted,
      unaccountedGap,
      discrepancyPct: Number(discrepancyPct.toFixed(2)),
      isAlert,
      statusLabel: isAlert ? 'FRAUD ALERT (>3% GAP)' : 'TERVERIFIKASI AMAN (<=3%)'
    };
  },

  calculateGraduationProgress(umkm) {
    const targetCapAmount = umkm.capitalInjected * (umkm.targetCapMultiplier || 1.6);
    const pct = Math.min(100, (umkm.returnedToInvestor / targetCapAmount) * 100);
    const remaining = Math.max(0, targetCapAmount - umkm.returnedToInvestor);
    return {
      targetCapAmount,
      progressPct: Number(pct.toFixed(1)),
      remainingAmount: remaining,
      isGraduated: pct >= 100
    };
  },

  formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount || 0);
  },

  formatCompactIDR(amount) {
    if (amount >= 1e9) return `Rp ${(amount / 1e9).toFixed(2)} Miliar`;
    if (amount >= 1e6) return `Rp ${(amount / 1e6).toFixed(1)} Juta`;
    return this.formatIDR(amount);
  },

  // ================= B2B INVENTORY & PORTAL OPERATIONS =================
  registerNewUMKM(appData) {
    const state = this.getState();
    const newApp = {
      id: `APP-${Math.floor(400 + Math.random() * 500)}`,
      ...appData,
      status: 'MENUNGGU_DUE_DILIGENCE',
      submittedAt: new Date().toLocaleString('id-ID')
    };
    state.applications.unshift(newApp);

    if (appData.ownerEmail && appData.accountPassword) {
      const emailClean = appData.ownerEmail.trim().toLowerCase();
      const exists = state.users.some(u => u.email.toLowerCase() === emailClean);
      if (!exists) {
        const newUmkmId = `UMKM-00${state.umkmList.length + 1}`;
        const ticker = (appData.businessName.replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase() || 'MITR') + '-ID';
        state.umkmList.push({
          id: newUmkmId,
          ticker,
          name: appData.businessName,
          owner: `${appData.ownerName} (${appData.age || 35} thn)`,
          sector: appData.sector,
          location: appData.location,
          stage: 'Tranche 1: Onboarding & Pelatihan Wajib Pasar',
          trancheCurrent: 1,
          trancheTotal: 3,
          trancheFrozen: false,
          capitalInjected: Number(appData.requestedCapital) || 150000000,
          targetCapMultiplier: 1.6,
          returnedToInvestor: 0,
          profitSharePct: 25,
          escrowBalance: Math.round((Number(appData.requestedCapital) || 150000000) * 0.4),
          b2bCreditBalance: 20000000,
          hppReductionPct: 18.0,
          monthlyRevenue: Number(appData.monthlyRevenue) || 50000000,
          monthlyNetProfit: Number(appData.monthlyNetProfit) || 14000000,
          unitPriceLot: 250000,
          availableLots: 400,
          totalLots: 600,
          yieldAnnualized: 19.5,
          exportMOQContribution: Number(appData.exportMoqCapacity) || 2000,
          image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&auto=format&fit=crop&q=80',
          training: {
            mod1_hpp_ringfencing: false,
            mod2_qc_massbalance: false,
            mod3_market_export: false,
            quizScore: 0,
            certified: false,
            completedAt: null
          },
          massBalance: { inputUnits: 4000, posSalesUnits: 3650, warehouseStockUnits: 310, verifiedRejectUnits: 20 },
          financialHistory: [35, 38, 42, 45, 48, 52],
          lastAuditDate: new Date().toISOString().slice(0, 10),
          riskNote: 'Pendaftar baru dari Form KYB Perbankan. Menunggu penyelesaian 3 modul pelatihan dasar.'
        });

        state.users.unshift({
          id: `USR-MITRA-${Math.floor(100 + Math.random() * 900)}`,
          role: 'MITRA',
          authProvider: 'KYB_BANK_FORM',
          name: appData.ownerName,
          email: emailClean,
          password: appData.accountPassword,
          phone: appData.ownerPhone || '-',
          entityId: newUmkmId,
          entityName: appData.businessName,
          npwp: appData.npwpBusiness || '-',
          kycStatus: 'KYC_SUBMITTED_FULL',
          registeredAt: new Date().toLocaleString('id-ID'),
          lastLoginAt: '-',
          loginCount: 0
        });
      }
    }

    this.saveState(state);
    return newApp;
  },

  updatePOSAndMassBalance(umkmId, payload) {
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.id === umkmId);
    if (!umkm) return null;

    umkm.massBalance.inputUnits = Number(payload.inputUnits);
    umkm.massBalance.posSalesUnits = Number(payload.posSalesUnits);
    umkm.massBalance.warehouseStockUnits = Number(payload.warehouseStockUnits);
    umkm.massBalance.verifiedRejectUnits = Number(payload.verifiedRejectUnits);

    if (payload.addedRevenue > 0) {
      umkm.monthlyRevenue += Number(payload.addedRevenue);
      const addedProfit = Math.round(Number(payload.addedRevenue) * 0.28);
      umkm.monthlyNetProfit += addedProfit;
      const investorShare = Math.round(addedProfit * (umkm.profitSharePct / 100));
      umkm.returnedToInvestor += investorShare;
    }

    const mbResult = this.calculateMassBalance(umkm.massBalance);
    umkm.trancheFrozen = mbResult.isAlert;

    if (mbResult.isAlert) {
      const exists = state.auditSchedules.some(a => a.umkmId === umkm.id && a.status === 'TERJADWAL');
      if (!exists) {
        state.auditSchedules.unshift({
          id: `AUD-${Math.floor(600 + Math.random() * 399)}`,
          umkmId: umkm.id,
          umkmName: umkm.name,
          auditor: 'Auto-Dispatch NusaAI (Tim Audit Lapangan)',
          auditType: `Audit Darurat Mass-Balance (${mbResult.discrepancyPct}% Gap)`,
          scheduledDate: 'Besok, 08:30 WIB',
          priority: 'CRITICAL',
          status: 'TERJADWAL',
          aiReasoning: `Terdeteksi selisih ${mbResult.unaccountedGap} unit (>3.0% ambang batas). Tranche dibekukan otomatis.`
        });
      }
    }

    this.saveState(state);
    return { umkm, mbResult };
  },

  executeB2BOrder(buyerUmkmId, catalogItemId, qty = 1) {
    const numQty = Number(qty);
    // Boundary Value Validation (1 <= qty <= 500)
    if (!Number.isInteger(numQty) || numQty < 1 || numQty > 500) {
      throw new Error('BVA_VALIDATION: Kuantitas pesanan B2B harus antara 1 hingga 500 lot.');
    }

    const state = this.getState();
    const buyer = state.umkmList.find(u => u.id === buyerUmkmId);
    const item = state.b2bCatalog.find(c => c.id === catalogItemId);
    if (!buyer || !item) throw new Error('Data mitra atau SKU inventaris tidak ditemukan.');

    if (buyer.trancheFrozen) {
      throw new Error('Transaksi ditolak: Akun Escrow & B2B Credit Anda sedang dibekukan karena selisih Mass Balance > 3.0%.');
    }
    if (item.stock < numQty) {
      throw new Error(`Stok inventaris tidak mencukupi (Tersedia: ${item.stock} unit).`);
    }

    const totalCreditCost = item.ecosystemCreditPrice * numQty;
    const totalSaved = (item.marketPrice - item.ecosystemCreditPrice) * numQty;

    if (buyer.b2bCreditBalance < totalCreditCost) {
      throw new Error('Saldo Internal B2B Credit tidak mencukupi.');
    }

    buyer.b2bCreditBalance -= totalCreditCost;
    buyer.massBalance.inputUnits += item.unitEquivalent * numQty;
    item.stock = Math.max(0, item.stock - numQty);

    const seller = state.umkmList.find(u => u.id === item.supplierId);
    if (seller) {
      seller.b2bCreditBalance += totalCreditCost;
      seller.monthlyRevenue += totalCreditCost;
    }

    state.meta.activeB2BCreditVolume += totalCreditCost;
    state.b2bTransactions.unshift({
      id: `TX-B2B-${Math.floor(1000 + Math.random() * 9000)}`,
      buyerName: buyer.name,
      sellerName: item.supplierName,
      item: `${item.itemName} (x${numQty})`,
      creditAmount: totalCreditCost,
      savedAmount: totalSaved,
      timestamp: new Date().toLocaleString('id-ID')
    });

    this.saveState(state);
    return { totalCreditCost, totalSaved, item };
  },

  restockInventoryItem(itemId, addedQty) {
    const qty = Number(addedQty);
    if (!Number.isInteger(qty) || qty < 1 || qty > 10000) {
      throw new Error('Jumlah restock harus bilangan bulat antara 1 hingga 10.000.');
    }
    const state = this.getState();
    const item = state.b2bCatalog.find(c => c.id === itemId);
    if (!item) throw new Error('SKU Inventaris tidak ditemukan.');
    item.stock += qty;
    this.saveState(state);
    return item;
  },

  submitEscrowRequest(umkmId, supplierName, purpose, amount) {
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.id === umkmId);
    if (!umkm) throw new Error('Mitra UMKM tidak ditemukan');

    const trainingStatus = this.getTrainingStatus(umkm);
    if (!trainingStatus.isCertified) {
      throw new Error('Pengajuan ditolak: Anda wajib menyelesaikan 3 Modul Pelatihan Dasar & Kuis Pasar terlebih dahulu.');
    }

    const req = {
      id: `ESC-${Math.floor(900 + Math.random() * 900)}`,
      umkmId: umkm.id,
      umkmName: umkm.name,
      supplierName,
      purpose,
      amount: Number(amount),
      date: new Date().toLocaleString('id-ID'),
      status: umkm.trancheFrozen ? 'BLOCKED_BY_MASS_BALANCE' : 'PENDING_CO_MANAGER',
      umkmOwnerApproved: true,
      coManagerApproved: false
    };
    state.escrowRequests.unshift(req);
    this.saveState(state);
    return req;
  },

  investInUMKM(ticker, lots, investorName = 'Investor Terverifikasi') {
    const numLots = Number(lots);
    if (!Number.isInteger(numLots) || numLots < 1) {
      throw new Error('Jumlah lot minimal adalah 1.');
    }
    const state = this.getState();
    const umkm = state.umkmList.find(u => u.ticker === ticker);
    if (!umkm) throw new Error('Ticker UMKM tidak ditemukan.');
    if (umkm.trancheFrozen) throw new Error('Pembelian dihentikan sementara: Emiten UMKM sedang dalam audit Mass Balance.');
    if (numLots > umkm.availableLots) throw new Error('Jumlah lot melebihi ketersediaan Tranche saat ini.');

    const totalValue = numLots * umkm.unitPriceLot;
    umkm.availableLots -= numLots;
    umkm.capitalInjected += totalValue;
    umkm.escrowBalance += totalValue;
    state.meta.totalAUM += totalValue;
    state.meta.escrowLiquidity += totalValue;

    const trade = {
      id: `TRD-${Math.floor(1000 + Math.random() * 9000)}`,
      investorName,
      ticker: umkm.ticker,
      type: 'TRANCHE_INVEST',
      lots: numLots,
      totalValue,
      timestamp: new Date().toLocaleString('id-ID')
    };
    state.investorTrades.unshift(trade);
    this.saveState(state);
    return trade;
  }
};

window.NusaBlackBoxUI = NusaBlackBoxUI;
window.NusaCore = NusaCore;