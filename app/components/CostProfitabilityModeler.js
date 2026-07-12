'use client';

import React, { useState, useMemo, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  Layers,
  Settings,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Play,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  LineChart,
  Percent,
  ShieldCheck,
  TrendingDown,
  Info,
  Sparkles,
  FileText,
  Target,
  ChevronRight
} from 'lucide-react';

// Preset business models with Unit metrics and benchmarks
const PRESETS = {
  manufacturing: {
    id: "manufacturing",
    name: "Apex Auto Parts (Advanced Manufacturing)",
    description: "High raw material, energy, and logistics intensity with complex global supply chains.",
    baseInflation: {
      labor: 6.5,
      material: 12.0,
      energy: 15.0,
      logistics: 9.0
    },
    elasticity: {
      p1: 1.6, // Heavy Castings (Highly price sensitive)
      p2: 0.8, // Precision Gears (Specialized, low sensitivity)
      p3: 2.2  // Standard Fasteners (Commodity, very high sensitivity)
    },
    products: [
      { id: "p1", name: "Heavy Engine Castings", revenue: 5000000, baseLabor: 1200000, baseMaterial: 1800000, baseLogistics: 500000, baseUnits: 100000, targetUnitCost: 42.00 },
      { id: "p2", name: "Precision Gears & Shafts", revenue: 4000000, baseLabor: 1500000, baseMaterial: 1000000, baseLogistics: 200000, baseUnits: 50000, targetUnitCost: 70.00 },
      { id: "p3", name: "Standard Fasteners", revenue: 2000000, baseLabor: 400000, baseMaterial: 1000000, baseLogistics: 300000, baseUnits: 2000000, targetUnitCost: 0.78 }
    ],
    customers: [
      { id: "c1", name: "Automotive OEMs", revenueShare: { p1: 0.8, p2: 0.3, p3: 0.4 } },
      { id: "c2", name: "Industrial Distributors", revenueShare: { p1: 0.1, p2: 0.5, p3: 0.5 } },
      { id: "c3", name: "Aerospace Specialists", revenueShare: { p1: 0.1, p2: 0.2, p3: 0.1 } }
    ],
    overheadPools: [
      { id: "o1", name: "Warehouse & Material Handling", cost: 1200000, costDriver: "Warehouse Space Volume (sq ft)", allocationKey: "spaceVolume", costCategory: "energy" },
      { id: "o2", name: "Quality Control & Compliance", cost: 800000, costDriver: "QC Inspection Labor Hours", allocationKey: "laborHours", costCategory: "labor" },
      { id: "o3", name: "Machine Setup & Maintenance", cost: 1000000, costDriver: "Machine Setup Hours", allocationKey: "machineHours", costCategory: "energy" },
      { id: "o4", name: "Client Management & Sales Support", cost: 600000, costDriver: "Sales Effort Share (%)", allocationKey: "salesEffort", costCategory: "labor" }
    ],
    drivers: {
      products: {
        p1: { laborHours: 24000, machineHours: 12000, spaceVolume: 8000, salesEffort: 0.3, supportTickets: 120 },
        p2: { laborHours: 30000, machineHours: 8000, spaceVolume: 2000, salesEffort: 0.5, supportTickets: 240 },
        p3: { laborHours: 8000, machineHours: 5000, spaceVolume: 4000, salesEffort: 0.2, supportTickets: 40 }
      },
      customers: {
        c1: { laborHours: 15000, machineHours: 10000, spaceVolume: 9000, salesEffort: 0.4, supportTickets: 150 },
        c2: { laborHours: 12000, machineHours: 8000, spaceVolume: 4000, salesEffort: 0.2, supportTickets: 50 },
        c3: { laborHours: 35000, machineHours: 7000, spaceVolume: 1000, salesEffort: 0.4, supportTickets: 200 }
      }
    }
  },
  saas: {
    id: "saas",
    name: "CloudScale Analytics (Enterprise SaaS)",
    description: "Heavy R&D, engineering labor, global cloud infrastructure, and dedicated customer success.",
    baseInflation: {
      labor: 7.5,
      material: 2.0, // Server cloud infrastructure (under 'material' category)
      energy: 9.5,   // Server/cloud energy surcharges
      logistics: 1.5  // Minimal physical logistics
    },
    elasticity: {
      p1: 0.5, // Enterprise Custom (Very sticky, low sensitivity)
      p2: 1.1, // Professional Tier (Moderate sensitivity)
      p3: 1.8  // Self-Serve Developer (High price sensitivity)
    },
    products: [
      { id: "p1", name: "Enterprise Custom Tier", revenue: 8000000, baseLabor: 2500000, baseMaterial: 800000, baseLogistics: 50000, baseUnits: 80, targetUnitCost: 55000.00 },
      { id: "p2", name: "Professional Team Tier", revenue: 5000000, baseLabor: 1200000, baseMaterial: 600000, baseLogistics: 10000, baseUnits: 2500, targetUnitCost: 1100.00 },
      { id: "p3", name: "Self-Serve Developer Tier", revenue: 2000000, baseLabor: 300000, baseMaterial: 400000, baseLogistics: 5000, baseUnits: 20000, targetUnitCost: 55.00 }
    ],
    customers: [
      { id: "c1", name: "Strategic Accounts (Fortune 500)", revenueShare: { p1: 0.95, p2: 0.1, p3: 0.0 } },
      { id: "c2", name: "Mid-Market Growth Accounts", revenueShare: { p1: 0.05, p2: 0.8, p3: 0.2 } },
      { id: "c3", name: "SMB & Individual Devs", revenueShare: { p1: 0.0, p2: 0.1, p3: 0.8 } }
    ],
    overheadPools: [
      { id: "o1", name: "Cloud Infrastructure (AWS/GCP)", cost: 2500000, costDriver: "API Call & Data Storage Volume", allocationKey: "spaceVolume", costCategory: "energy" },
      { id: "o2", name: "Premium Client Success Team", cost: 1200000, costDriver: "Support Ticket Volume", allocationKey: "supportTickets", costCategory: "labor" },
      { id: "o3", name: "Product Engineering & Security R&D", cost: 3000000, costDriver: "Dev Sprint Hours", allocationKey: "machineHours", costCategory: "labor" },
      { id: "o4", name: "Enterprise Direct Sales & Marketing", cost: 1500000, costDriver: "Sales Effort Share (%)", allocationKey: "salesEffort", costCategory: "labor" }
    ],
    drivers: {
      products: {
        p1: { laborHours: 40000, machineHours: 18000, spaceVolume: 8000, salesEffort: 0.6, supportTickets: 600 },
        p2: { laborHours: 15000, machineHours: 8000, spaceVolume: 3000, salesEffort: 0.3, supportTickets: 300 },
        p3: { laborHours: 5000, machineHours: 4000, spaceVolume: 1000, salesEffort: 0.1, supportTickets: 100 }
      },
      customers: {
        c1: { laborHours: 42000, machineHours: 20000, spaceVolume: 7500, salesEffort: 0.7, supportTickets: 650 },
        c2: { laborHours: 13000, machineHours: 8000, spaceVolume: 3000, salesEffort: 0.2, supportTickets: 250 },
        c3: { laborHours: 5000, machineHours: 2000, spaceVolume: 1500, salesEffort: 0.1, supportTickets: 100 }
      }
    }
  },
  ecommerce: {
    id: "ecommerce",
    name: "Velo Apparel (Global E-Commerce/Retail)",
    description: "High volume, direct-to-consumer digital channels, heavy shipping and warehouse inventory management.",
    baseInflation: {
      labor: 5.5,
      material: 10.5, // Inventory cost inflation
      energy: 8.0,    // Warehouse facility costs inflation
      logistics: 14.5 // Shipping, fuel and freight inflation
    },
    elasticity: {
      p1: 1.4, // Premium Carbon Bikes (High price point, somewhat elastic)
      p2: 0.9, // Technical Cycling Apparel (Moderate brand loyalty)
      p3: 1.7  // Accessories & Tools (Highly substitutable)
    },
    products: [
      { id: "p1", name: "Premium Carbon Bikes", revenue: 6000000, baseLabor: 800000, baseMaterial: 2500000, baseLogistics: 600000, baseUnits: 3000, targetUnitCost: 1650.00 },
      { id: "p2", name: "Technical Cycling Apparel", revenue: 4000000, baseLabor: 600000, baseMaterial: 1200000, baseLogistics: 200000, baseUnits: 40000, targetUnitCost: 72.00 },
      { id: "p3", name: "Accessories & Tools", revenue: 2000000, baseLabor: 200000, baseMaterial: 700000, baseLogistics: 100000, baseUnits: 100000, targetUnitCost: 14.00 }
    ],
    customers: [
      { id: "c1", name: "Direct Web Consumers (D2C)", revenueShare: { p1: 0.5, p2: 0.7, p3: 0.6 } },
      { id: "c2", name: "Wholesale Retail Partners", revenueShare: { p1: 0.4, p2: 0.2, p3: 0.3 } },
      { id: "c3", name: "Sponsored Racing Teams", revenueShare: { p1: 0.1, p2: 0.1, p3: 0.1 } }
    ],
    overheadPools: [
      { id: "o1", name: "Digital Advertising (CAC)", cost: 1500000, costDriver: "Ad Effort Allocation (%)", allocationKey: "salesEffort", costCategory: "material" },
      { id: "o2", name: "Fulfillment & Returns Warehouse", cost: 2000000, costDriver: "Fulfillment Space (sq ft)", allocationKey: "spaceVolume", costCategory: "energy" },
      { id: "o3", name: "Customer Care & Return Center", cost: 800000, costDriver: "CS & Claims Tickets", allocationKey: "supportTickets", costCategory: "labor" },
      { id: "o4", name: "Design & Product Lifecycle Dev", cost: 1000000, costDriver: "Design Labor Hours", allocationKey: "laborHours", costCategory: "labor" }
    ],
    drivers: {
      products: {
        p1: { laborHours: 8000, machineHours: 4000, spaceVolume: 8000, salesEffort: 0.4, supportTickets: 250 },
        p2: { laborHours: 12000, machineHours: 1000, spaceVolume: 3000, salesEffort: 0.4, supportTickets: 500 },
        p3: { laborHours: 5000, machineHours: 500, spaceVolume: 1000, salesEffort: 0.2, supportTickets: 250 }
      },
      customers: {
        c1: { laborHours: 10000, machineHours: 1500, spaceVolume: 4000, salesEffort: 0.6, supportTickets: 800 },
        c2: { laborHours: 12000, machineHours: 3500, spaceVolume: 7000, salesEffort: 0.3, supportTickets: 150 },
        c3: { laborHours: 3000, machineHours: 500, spaceVolume: 1000, salesEffort: 0.1, supportTickets: 50 }
      }
    }
  }
};

export default function CostProfitabilityModeler() {
  const [mounted, setMounted] = useState(false);
  
  // Navigation State
  const [activeStep, setActiveStep] = useState(1);
  const [activePreset, setActivePreset] = useState("manufacturing");
  const [dimensionFocus, setDimensionFocus] = useState("products"); // "products" | "customers"
  const [allocationMethod, setAllocationMethod] = useState("abc"); // "abc" | "traditional"

  // Modeler inputs - dynamic based on presets
  const [laborInflation, setLaborInflation] = useState(6.5);
  const [materialInflation, setMaterialInflation] = useState(12.0);
  const [energyInflation, setEnergyInflation] = useState(15.0);
  const [logisticsInflation, setLogisticsInflation] = useState(9.0);

  // Levers state (Strategic Playground)
  const [priceIncreases, setPriceIncreases] = useState({ p1: 0, p2: 0, p3: 0 });
  const [procurementMitigation, setProcurementMitigation] = useState(0);
  const [laborEfficiency, setLaborEfficiency] = useState(0);
  const [logisticsEfficiency, setLogisticsEfficiency] = useState(0);

  // Custom targets configuration state
  const [customBenchmarks, setCustomBenchmarks] = useState({});

  // Hydration sync
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  // Update inflation states and resets when active preset changes
  useEffect(() => {
    const preset = PRESETS[activePreset];
    if (preset) {
      const timer = setTimeout(() => {
        setLaborInflation(preset.baseInflation.labor);
        setMaterialInflation(preset.baseInflation.material);
        setEnergyInflation(preset.baseInflation.energy);
        setLogisticsInflation(preset.baseInflation.logistics);
        // Reset Levers
        setPriceIncreases({ p1: 0, p2: 0, p3: 0 });
        setProcurementMitigation(0);
        setLaborEfficiency(0);
        setLogisticsEfficiency(0);
        
        // Initialize custom benchmarks from preset defaults
        const initialBenchmarks = {};
        preset.products.forEach(p => {
          initialBenchmarks[p.id] = p.targetUnitCost;
        });
        setCustomBenchmarks(initialBenchmarks);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [activePreset]);

  // Load the current active preset details
  const preset = useMemo(() => PRESETS[activePreset], [activePreset]);

  // Handle custom target inputs
  const handleBenchmarkChange = (prodId, val) => {
    setCustomBenchmarks(prev => ({
      ...prev,
      [prodId]: Number(val)
    }));
  };

  // Core Math Model (Extended for Unit Costs & Future Projections)
  const modelResults = useMemo(() => {
    // ----------------------------------------------------
    // 1. CALCULATE STATE FOR PRODUCTS
    // ----------------------------------------------------
    const productsData = preset.products.map(p => {
      const elasticity = preset.elasticity[p.id];
      const priceIncrease = priceIncreases[p.id] || 0;
      
      // Volume factor based on elasticity: volume drop = price increase * elasticity
      const demandDrop = (priceIncrease * elasticity) / 100;
      const volFactor = Math.max(0.3, 1 - demandDrop); // Cap drop at 70% max
      const priceMult = 1 + priceIncrease / 100;

      // Base metrics
      const baseRev = p.revenue;
      const baseDirectLabor = p.baseLabor;
      const baseDirectMaterial = p.baseMaterial;
      const baseDirectLogistics = p.baseLogistics;
      const baseDirectTotal = baseDirectLabor + baseDirectMaterial + baseDirectLogistics;
      const baseGrossProfit = baseRev - baseDirectTotal;

      // Inflated metrics (Unmitigated)
      const infDirectLabor = baseDirectLabor * (1 + laborInflation / 100);
      const infDirectMaterial = baseDirectMaterial * (1 + materialInflation / 100);
      const infDirectLogistics = baseDirectLogistics * (1 + logisticsInflation / 100);
      const infDirectTotal = infDirectLabor + infDirectMaterial + infDirectLogistics;
      const infGrossProfit = baseRev - infDirectTotal;

      // Optimized metrics (Mitigated)
      const simRev = baseRev * priceMult * volFactor;
      const simDirectLabor = baseDirectLabor * (1 + laborInflation / 100) * (1 - laborEfficiency / 100) * volFactor;
      const simDirectMaterial = baseDirectMaterial * (1 + materialInflation * (1 - procurementMitigation / 100) / 100) * volFactor;
      const simDirectLogistics = baseDirectLogistics * (1 + logisticsInflation / 100) * (1 - logisticsEfficiency / 100) * volFactor;
      const simDirectTotal = simDirectLabor + simDirectMaterial + simDirectLogistics;
      const simGrossProfit = simRev - simDirectTotal;

      // Quantities
      const baseUnits = p.baseUnits;
      const simUnits = baseUnits * volFactor;
      const targetUnitCost = customBenchmarks[p.id] !== undefined ? customBenchmarks[p.id] : p.targetUnitCost;

      return {
        id: p.id,
        name: p.name,
        elasticity,
        priceIncrease,
        volFactor,
        demandDrop: demandDrop * 100,
        baseUnits,
        simUnits,
        targetUnitCost,
        // Base
        baseRev,
        baseDirectLabor,
        baseDirectMaterial,
        baseDirectLogistics,
        baseDirectTotal,
        baseGrossProfit,
        baseGrossMargin: (baseGrossProfit / baseRev) * 100,
        // Inflated
        infRev: baseRev,
        infDirectLabor,
        infDirectMaterial,
        infDirectLogistics,
        infDirectTotal,
        infGrossProfit,
        infGrossMargin: (infGrossProfit / baseRev) * 100,
        // Optimized
        simRev,
        simDirectLabor,
        simDirectMaterial,
        simDirectLogistics,
        simDirectTotal,
        simGrossProfit,
        simGrossMargin: simRev > 0 ? (simGrossProfit / simRev) * 100 : 0,
      };
    });

    // ----------------------------------------------------
    // 2. CALCULATE OVERHEAD POOLS COST IN THREE STATES
    // ----------------------------------------------------
    const poolsData = preset.overheadPools.map(pool => {
      const baseCost = pool.cost;
      let inflationRate = 0;
      let efficiencyMitigation = 0;

      switch (pool.costCategory) {
        case 'labor':
          inflationRate = laborInflation;
          efficiencyMitigation = laborEfficiency;
          break;
        case 'material':
          inflationRate = materialInflation;
          efficiencyMitigation = procurementMitigation;
          break;
        case 'logistics':
          inflationRate = logisticsInflation;
          efficiencyMitigation = logisticsEfficiency;
          break;
        case 'energy':
          inflationRate = energyInflation;
          efficiencyMitigation = 0;
          break;
      }

      const infCost = baseCost * (1 + inflationRate / 100);
      
      let simCost = infCost;
      if (pool.costCategory === 'labor' || pool.costCategory === 'logistics') {
        simCost = baseCost * (1 + inflationRate / 100) * (1 - efficiencyMitigation / 100);
      } else if (pool.costCategory === 'material') {
        simCost = baseCost * (1 + inflationRate * (1 - procurementMitigation / 100) / 100);
      }

      return {
        ...pool,
        baseCost,
        infCost,
        simCost,
        inflationRate
      };
    });

    // Total overhead pools
    const totalBaseOverhead = poolsData.reduce((sum, p) => sum + p.baseCost, 0);
    const totalInfOverhead = poolsData.reduce((sum, p) => sum + p.infCost, 0);
    const totalSimOverhead = poolsData.reduce((sum, p) => sum + p.simCost, 0);

    // Total company metrics
    const totalBaseRevenue = productsData.reduce((sum, p) => sum + p.baseRev, 0);
    const totalBaseDirect = productsData.reduce((sum, p) => sum + p.baseDirectTotal, 0);
    const totalBaseExpenses = totalBaseDirect + totalBaseOverhead;
    const totalBaseEBITDA = totalBaseRevenue - totalBaseExpenses;
    const totalBaseEBITDAMargin = (totalBaseEBITDA / totalBaseRevenue) * 100;

    const totalInfRevenue = totalBaseRevenue;
    const totalInfDirect = productsData.reduce((sum, p) => sum + p.infDirectTotal, 0);
    const totalInfExpenses = totalInfDirect + totalInfOverhead;
    const totalInfEBITDA = totalInfRevenue - totalInfExpenses;
    const totalInfEBITDAMargin = (totalInfEBITDA / totalInfRevenue) * 100;

    const totalSimRevenue = productsData.reduce((sum, p) => sum + p.simRev, 0);
    const totalSimDirect = productsData.reduce((sum, p) => sum + p.simDirectTotal, 0);
    const totalSimExpenses = totalSimDirect + totalSimOverhead;
    const totalSimEBITDA = totalSimRevenue - totalSimExpenses;
    const totalSimEBITDAMargin = totalSimRevenue > 0 ? (totalSimEBITDA / totalSimRevenue) * 100 : 0;

    const totalErosion = totalBaseEBITDA - totalInfEBITDA;
    const totalRecovery = totalSimEBITDA - totalInfEBITDA;

    // ----------------------------------------------------
    // 3. MULTI-DIMENSIONAL ALLOCATION CALCULATIONS
    // ----------------------------------------------------
    const allocatedProducts = productsData.map(p => {
      let baseAllocatedOverhead = 0;
      let infAllocatedOverhead = 0;
      let simAllocatedOverhead = 0;

      poolsData.forEach(pool => {
        const key = pool.allocationKey;
        const baseDrivers = Object.keys(preset.drivers.products).reduce((acc, prodId) => {
          acc[prodId] = preset.drivers.products[prodId][key] || 0;
          return acc;
        }, {});
        
        const simDrivers = Object.keys(preset.drivers.products).reduce((acc, prodId) => {
          const productVolFactor = productsData.find(x => x.id === prodId).volFactor;
          acc[prodId] = preset.drivers.products[prodId][key] * (key === 'salesEffort' ? 1 : productVolFactor);
          return acc;
        }, {});

        const totalBaseDriver = Object.values(baseDrivers).reduce((s, v) => s + v, 0);
        const totalSimDriver = Object.values(simDrivers).reduce((s, v) => s + v, 0);

        if (allocationMethod === 'traditional') {
          const baseShare = p.baseRev / totalBaseRevenue;
          const simShare = p.simRev / totalSimRevenue;

          baseAllocatedOverhead += pool.baseCost * baseShare;
          infAllocatedOverhead += pool.infCost * baseShare;
          simAllocatedOverhead += pool.simCost * (totalSimRevenue > 0 ? simShare : 0);
        } else {
          const baseShare = totalBaseDriver > 0 ? (baseDrivers[p.id] || 0) / totalBaseDriver : 0;
          const simShare = totalSimDriver > 0 ? (simDrivers[p.id] || 0) / totalSimDriver : 0;

          baseAllocatedOverhead += pool.baseCost * baseShare;
          infAllocatedOverhead += pool.infCost * baseShare;
          simAllocatedOverhead += pool.simCost * simShare;
        }
      });

      const baseNetProfit = p.baseGrossProfit - baseAllocatedOverhead;
      const infNetProfit = p.infGrossProfit - infAllocatedOverhead;
      const simNetProfit = p.simGrossProfit - simAllocatedOverhead;

      // Unit Cost Calculation: Total Cost / Units
      // Total Cost = Direct Costs + Allocated Overhead
      const baseTotalCost = p.baseDirectTotal + baseAllocatedOverhead;
      const infTotalCost = p.infDirectTotal + infAllocatedOverhead;
      const simTotalCost = p.simDirectTotal + simAllocatedOverhead;

      const baseUnitCost = baseTotalCost / p.baseUnits;
      const infUnitCost = infTotalCost / p.baseUnits;
      const simUnitCost = simTotalCost / p.simUnits;
      
      const targetUnitCost = p.targetUnitCost;
      const costGapBase = baseUnitCost - targetUnitCost;
      const costGapInf = infUnitCost - targetUnitCost;
      const costGapSim = simUnitCost - targetUnitCost;

      return {
        ...p,
        baseOverhead: baseAllocatedOverhead,
        infOverhead: infAllocatedOverhead,
        simOverhead: simAllocatedOverhead,
        baseNetProfit,
        infNetProfit,
        simNetProfit,
        baseNetMargin: (baseNetProfit / p.baseRev) * 100,
        infNetMargin: (infNetProfit / p.infRev) * 100,
        simNetMargin: p.simRev > 0 ? (simNetProfit / p.simRev) * 100 : 0,
        // Unit cost benchmarking metrics
        baseUnitCost,
        infUnitCost,
        simUnitCost,
        costGapBase,
        costGapInf,
        costGapSim
      };
    });

    const allocatedCustomers = preset.customers.map(c => {
      let baseRev = 0;
      let infRev = 0;
      let simRev = 0;

      let baseDirectLabor = 0;
      let baseDirectMaterial = 0;
      let baseDirectLogistics = 0;

      let infDirectLabor = 0;
      let infDirectMaterial = 0;
      let infDirectLogistics = 0;

      let simDirectLabor = 0;
      let simDirectMaterial = 0;
      let simDirectLogistics = 0;

      productsData.forEach(p => {
        const share = c.revenueShare[p.id] || 0;
        baseRev += p.baseRev * share;
        infRev += p.infRev * share;
        simRev += p.simRev * share;

        baseDirectLabor += p.baseDirectLabor * share;
        baseDirectMaterial += p.baseDirectMaterial * share;
        baseDirectLogistics += p.baseDirectLogistics * share;

        infDirectLabor += p.infDirectLabor * share;
        infDirectMaterial += p.infDirectMaterial * share;
        infDirectLogistics += p.infDirectLogistics * share;

        simDirectLabor += p.simDirectLabor * share;
        simDirectMaterial += p.simDirectMaterial * share;
        simDirectLogistics += p.simDirectLogistics * share;
      });

      const baseDirectTotal = baseDirectLabor + baseDirectMaterial + baseDirectLogistics;
      const infDirectTotal = infDirectLabor + infDirectMaterial + infDirectLogistics;
      const simDirectTotal = simDirectLabor + simDirectMaterial + simDirectLogistics;

      let baseAllocatedOverhead = 0;
      let infAllocatedOverhead = 0;
      let simAllocatedOverhead = 0;

      poolsData.forEach(pool => {
        const key = pool.allocationKey;
        const baseDrivers = Object.keys(preset.drivers.customers).reduce((acc, custId) => {
          acc[custId] = preset.drivers.customers[custId][key] || 0;
          return acc;
        }, {});

        const simDrivers = Object.keys(preset.drivers.customers).reduce((acc, custId) => {
          const customerShares = preset.customers.find(x => x.id === custId).revenueShare;
          let customerVolFactorSum = 0;
          let shareWeightTotal = 0;
          
          productsData.forEach(p => {
            const sh = customerShares[p.id] || 0;
            customerVolFactorSum += p.volFactor * sh;
            shareWeightTotal += sh;
          });
          const custVolFactor = shareWeightTotal > 0 ? customerVolFactorSum / shareWeightTotal : 1;
          acc[custId] = preset.drivers.customers[custId][key] * (key === 'salesEffort' ? 1 : custVolFactor);
          return acc;
        }, {});

        const totalBaseDriver = Object.values(baseDrivers).reduce((s, v) => s + v, 0);
        const totalSimDriver = Object.values(simDrivers).reduce((s, v) => s + v, 0);

        if (allocationMethod === 'traditional') {
          const baseShare = baseRev / totalBaseRevenue;
          const simShare = simRev / totalSimRevenue;

          baseAllocatedOverhead += pool.baseCost * baseShare;
          infAllocatedOverhead += pool.infCost * baseShare;
          simAllocatedOverhead += pool.simCost * (totalSimRevenue > 0 ? simShare : 0);
        } else {
          const baseShare = totalBaseDriver > 0 ? (baseDrivers[c.id] || 0) / totalBaseDriver : 0;
          const simShare = totalSimDriver > 0 ? (simDrivers[c.id] || 0) / totalSimDriver : 0;

          baseAllocatedOverhead += pool.baseCost * baseShare;
          infAllocatedOverhead += pool.infCost * baseShare;
          simAllocatedOverhead += pool.simCost * simShare;
        }
      });

      const baseGrossProfit = baseRev - baseDirectTotal;
      const infGrossProfit = infRev - infDirectTotal;
      const simGrossProfit = simRev - simDirectTotal;

      const baseNetProfit = baseGrossProfit - baseAllocatedOverhead;
      const infNetProfit = infGrossProfit - infAllocatedOverhead;
      const simNetProfit = simGrossProfit - simAllocatedOverhead;

      return {
        id: c.id,
        name: c.name,
        baseRev,
        baseDirectTotal,
        baseOverhead: baseAllocatedOverhead,
        baseNetProfit,
        baseNetMargin: baseRev > 0 ? (baseNetProfit / baseRev) * 100 : 0,
        infRev,
        infDirectTotal,
        infOverhead: infAllocatedOverhead,
        infNetProfit,
        infNetMargin: infRev > 0 ? (infNetProfit / infRev) * 100 : 0,
        simRev,
        simDirectTotal,
        simOverhead: simAllocatedOverhead,
        simNetProfit,
        simNetMargin: simRev > 0 ? (simNetProfit / simRev) * 100 : 0
      };
    });

    // ----------------------------------------------------
    // 4. FUTURE COMPOUND EXPENSE PROJECTIONS (1Y, 3Y, 5Y)
    // ----------------------------------------------------
    // Direct Costs split by driver category across all products
    const totalBaseLaborDirect = preset.products.reduce((sum, p) => sum + p.baseLabor, 0);
    const totalBaseMaterialDirect = preset.products.reduce((sum, p) => sum + p.baseMaterial, 0);
    const totalBaseLogisticsDirect = preset.products.reduce((sum, p) => sum + p.baseLogistics, 0);

    // Summing costs by category for the whole firm
    const baseExpensesByCategory = {
      labor: totalBaseLaborDirect + poolsData.filter(po => po.costCategory === 'labor').reduce((sum, po) => sum + po.baseCost, 0),
      material: totalBaseMaterialDirect + poolsData.filter(po => po.costCategory === 'material').reduce((sum, po) => sum + po.baseCost, 0),
      logistics: totalBaseLogisticsDirect + poolsData.filter(po => po.costCategory === 'logistics').reduce((sum, po) => sum + po.baseCost, 0),
      energy: poolsData.filter(po => po.costCategory === 'energy').reduce((sum, po) => sum + po.baseCost, 0)
    };

    // Calculate future years
    const projectionYears = [1, 3, 5];
    const expenseProjections = projectionYears.map(year => {
      let inflatedTotal = 0;
      let optimizedTotal = 0;
      let baselineTotal = 0;

      // Compound each category
      // Baseline: assumes no inflation and volume changes
      baselineTotal = (baseExpensesByCategory.labor + baseExpensesByCategory.material + baseExpensesByCategory.logistics + baseExpensesByCategory.energy);

      // Compounding Inflation rate
      const infLaborMult = Math.pow(1 + laborInflation / 100, year);
      const infMatMult = Math.pow(1 + materialInflation / 100, year);
      const infEnergyMult = Math.pow(1 + energyInflation / 100, year);
      const infLogMult = Math.pow(1 + logisticsInflation / 100, year);

      inflatedTotal = (baseExpensesByCategory.labor * infLaborMult) +
                      (baseExpensesByCategory.material * infMatMult) +
                      (baseExpensesByCategory.energy * infEnergyMult) +
                      (baseExpensesByCategory.logistics * infLogMult);

      // Mitigated/Optimized compounding
      // Effective inflation rates after mitigation levers
      const optLaborMult = Math.pow(1 + (laborInflation * (1 - laborEfficiency/100)) / 100, year) * (1 - laborEfficiency/100);
      const optMatMult = Math.pow(1 + (materialInflation * (1 - procurementMitigation/100)) / 100, year);
      const optEnergyMult = Math.pow(1 + energyInflation / 100, year);
      const optLogMult = Math.pow(1 + (logisticsInflation * (1 - logisticsEfficiency/100)) / 100, year) * (1 - logisticsEfficiency/100);

      // Average product volume factor to apply to variable costs
      const avgVolFactor = productsData.reduce((sum, p) => sum + p.volFactor, 0) / productsData.length;

      // Note: direct costs scale by volume factor, overhead pools do not
      const optDirectLabor = totalBaseLaborDirect * optLaborMult * avgVolFactor;
      const optDirectMaterial = totalBaseMaterialDirect * optMatMult * avgVolFactor;
      const optDirectLogistics = totalBaseLogisticsDirect * optLogMult * avgVolFactor;

      const optOverheadLabor = poolsData.filter(po => po.costCategory === 'labor').reduce((sum, po) => sum + po.baseCost, 0) * optLaborMult;
      const optOverheadMaterial = poolsData.filter(po => po.costCategory === 'material').reduce((sum, po) => sum + po.baseCost, 0) * optMatMult;
      const optOverheadLogistics = poolsData.filter(po => po.costCategory === 'logistics').reduce((sum, po) => sum + po.baseCost, 0) * optLogMult;
      const optOverheadEnergy = poolsData.filter(po => po.costCategory === 'energy').reduce((sum, po) => sum + po.baseCost, 0) * optEnergyMult;

      optimizedTotal = optDirectLabor + optDirectMaterial + optDirectLogistics + 
                       optOverheadLabor + optOverheadMaterial + optOverheadLogistics + optOverheadEnergy;

      return {
        year: `Year ${year}`,
        "Baseline": Math.round(baselineTotal),
        "Unmitigated Inflated": Math.round(inflatedTotal),
        "Mitigated Optimized": Math.round(optimizedTotal)
      };
    });

    // ----------------------------------------------------
    // 5. FINDING LEAKS AND INEFFICIENCIES
    // ----------------------------------------------------
    const leaks = [];
    allocatedProducts.forEach(p => {
      const erosionAmount = p.baseNetProfit - p.infNetProfit;
      const erosionPct = p.baseNetMargin - p.infNetMargin;

      const baseGrossMargin = p.baseGrossMargin;
      const baseNetMargin = p.baseNetMargin;

      if (baseGrossMargin > 20 && baseNetMargin < 5 && allocationMethod === 'abc') {
        leaks.push({
          type: "Product Hidden Profit Leak",
          name: p.name,
          impact: p.baseOverhead,
          description: `Seemingly healthy gross margin (${baseGrossMargin.toFixed(1)}%), but eroded to ${baseNetMargin.toFixed(1)}% net margin due to high overhead activity consumption (Allocated Overhead: $${p.baseOverhead.toLocaleString()}).`
        });
      }

      if (p.costGapSim > 0) {
        leaks.push({
          type: "Unit Cost Benchmark Gap",
          name: p.name,
          impact: p.costGapSim * p.simUnits,
          description: `Actual unit cost is $${p.simUnitCost.toFixed(2)} compared to target benchmark $${p.targetUnitCost.toFixed(2)} (Gap: +$${p.costGapSim.toFixed(2)}/unit, Total Gap Value: $${Math.round(p.costGapSim * p.simUnits).toLocaleString()}).`
        });
      }

      if (erosionPct > 5) {
        leaks.push({
          type: "Product Inflation Risk",
          name: p.name,
          impact: erosionAmount,
          description: `Highly vulnerable to inflation. Net margin compressed from ${p.baseNetMargin.toFixed(1)}% to ${p.infNetMargin.toFixed(1)}% (Erosion: $${erosionAmount.toLocaleString()}).`
        });
      }
    });

    allocatedCustomers.forEach(c => {
      const baseNetMargin = c.baseNetMargin;
      if (baseNetMargin < 2 && allocationMethod === 'abc') {
        leaks.push({
          type: "Customer Margin Drain",
          name: c.name,
          impact: c.baseOverhead,
          description: `Returns only ${baseNetMargin.toFixed(1)}% net margin after Activity-Based allocations. Consumes heavy operational overhead compared to revenue generated.`
        });
      }
    });

    return {
      products: allocatedProducts,
      customers: allocatedCustomers,
      pools: poolsData,
      totals: {
        baseRevenue: totalBaseRevenue,
        baseDirect: totalBaseDirect,
        baseOverhead: totalBaseOverhead,
        baseExpenses: totalBaseExpenses,
        baseEBITDA: totalBaseEBITDA,
        baseEBITDAMargin: totalBaseEBITDAMargin,

        infRevenue: totalInfRevenue,
        infDirect: totalInfDirect,
        infOverhead: totalInfOverhead,
        infExpenses: totalInfExpenses,
        infEBITDA: totalInfEBITDA,
        infEBITDAMargin: totalInfEBITDAMargin,

        simRevenue: totalSimRevenue,
        simDirect: totalSimDirect,
        simOverhead: totalSimOverhead,
        simExpenses: totalSimExpenses,
        simEBITDA: totalSimEBITDA,
        simEBITDAMargin: totalSimEBITDAMargin,

        erosion: totalErosion,
        recovery: totalRecovery
      },
      expenseProjections,
      leaks
    };
  }, [
    preset,
    laborInflation,
    materialInflation,
    energyInflation,
    logisticsInflation,
    priceIncreases,
    procurementMitigation,
    laborEfficiency,
    logisticsEfficiency,
    allocationMethod,
    customBenchmarks
  ]);

  // Compute Inflation Resilience Score (0 - 100%)
  const resilienceScore = useMemo(() => {
    const baseEbitda = modelResults.totals.baseEBITDA;
    const infEbitda = modelResults.totals.infEBITDA;
    const simEbitda = modelResults.totals.simEBITDA;

    if (baseEbitda === infEbitda) return 100;
    const score = ((simEbitda - infEbitda) / (baseEbitda - infEbitda)) * 100;
    return Math.min(100, Math.max(0, Math.round(score)));
  }, [modelResults]);

  if (!mounted) {
    return (
      <div className="w-full max-w-6xl mx-auto p-8 bg-[var(--surface)] border border-[var(--border)] rounded-2xl flex items-center justify-center h-[550px] font-sans">
        <div className="text-[var(--muted)] text-[15px] flex items-center gap-3 animate-pulse">
          <RefreshCw className="animate-spin h-5 w-5 text-[var(--accent)]" />
          Initializing Profitability Modeler...
        </div>
      </div>
    );
  }

  // Waterfall chart preparation for Step 4
  const waterfallData = [
    { name: "Revenue", value: modelResults.totals.baseRevenue, dummy: 0, fill: "var(--accent)" },
    { name: "Direct Costs", value: -modelResults.totals.baseDirect, dummy: modelResults.totals.baseRevenue - modelResults.totals.baseDirect, fill: "var(--danger)" },
    { name: "Gross Profit", value: modelResults.totals.baseRevenue - modelResults.totals.baseDirect, dummy: 0, fill: "var(--color-surface)", stroke: "var(--border-strong)" },
    { name: "Base Overhead", value: -modelResults.totals.baseOverhead, dummy: modelResults.totals.baseEBITDA, fill: "var(--danger)" },
    { name: "Base EBITDA", value: modelResults.totals.baseEBITDA, dummy: 0, fill: "var(--success)" },
    { name: "Inflation Impact", value: -modelResults.totals.erosion, dummy: modelResults.totals.infEBITDA, fill: "#e05a4f" },
    { name: "Inflated EBITDA", value: modelResults.totals.infEBITDA, dummy: 0, fill: "var(--muted)" }
  ];

  const formattedWaterfall = waterfallData.map((d) => {
    const isSum = ["Revenue", "Gross Profit", "Base EBITDA", "Inflated EBITDA"].includes(d.name);
    return {
      name: d.name,
      displayVal: Math.round(Math.abs(d.value)),
      dummy: isSum ? 0 : d.dummy,
      barVal: Math.round(Math.abs(d.value)),
      fill: d.fill,
      stroke: d.stroke || "none",
      type: d.value < 0 ? "decrease" : "total"
    };
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-[var(--surface)] border border-[var(--border)] rounded-2xl shadow-soft font-sans text-[var(--foreground)] transition-all">
      
      {/* Top Banner KPI Dashboard */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Baseline EBITDA</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-[var(--foreground)]">
            ${Math.round(modelResults.totals.baseEBITDA).toLocaleString()}
          </p>
          <span className="text-[11px] font-medium text-[var(--muted)]">Margin: {modelResults.totals.baseEBITDAMargin.toFixed(1)}%</span>
        </div>

        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)] flex items-center gap-1.5">
            Inflated EBITDA
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
          </p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-red-500">
            ${Math.round(modelResults.totals.infEBITDA).toLocaleString()}
          </p>
          <span className="text-[11px] font-medium text-red-400">
            Erosion: -${Math.round(modelResults.totals.erosion).toLocaleString()}
          </span>
        </div>

        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Optimized EBITDA</p>
          <p className="text-2xl md:text-3xl font-bold mt-1 text-[var(--success)]">
            ${Math.round(modelResults.totals.simEBITDA).toLocaleString()}
          </p>
          <span className="text-[11px] font-medium text-[var(--success)]">
            Margin: {modelResults.totals.simEBITDAMargin.toFixed(1)}%
          </span>
        </div>

        <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl relative overflow-hidden">
          <div className="flex justify-between items-center">
            <p className="text-[11px] font-bold uppercase tracking-wider text-[var(--muted)]">Resilience Score</p>
            <ShieldCheck className={`h-4.5 w-4.5 ${resilienceScore > 75 ? 'text-green-500' : resilienceScore > 40 ? 'text-amber-500' : 'text-red-500'}`} />
          </div>
          <p className={`text-2xl md:text-3xl font-bold mt-1 ${resilienceScore > 75 ? 'text-green-500' : resilienceScore > 40 ? 'text-amber-500' : 'text-red-500'}`}>
            {resilienceScore}%
          </p>
          <span className="text-[11px] font-medium text-[var(--muted)]">Inflation defense health</span>
        </div>
      </div>

      {/* Stepper Navigation */}
      <div className="mb-8 border-b border-[var(--border)] pb-4 overflow-x-auto">
        <nav className="flex space-x-1 min-w-[700px] md:min-w-0" aria-label="Tabs">
          {[
            { step: 1, label: "1. Preset Select" },
            { step: 2, label: "2. Future Projections" },
            { step: 3, label: "3. Cost Allocations" },
            { step: 4, label: "4. Target Benchmarks" },
            { step: 5, label: "5. Remediation Playroom" },
            { step: 6, label: "6. Executive Report" }
          ].map((tab) => (
            <button
              key={tab.step}
              onClick={() => setActiveStep(tab.step)}
              className={`flex-1 py-2 px-3 text-center border-b-2 font-medium text-xs rounded-t-lg transition-all ${
                activeStep === tab.step
                  ? "border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-soft)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)] hover:bg-[var(--surface-subtle)]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Step Content */}
      <div className="min-h-[380px]">

        {/* STEP 1: WELCOME & PRESET SELECT */}
        {activeStep === 1 && (
          <div className="space-y-6">
            <div className="max-w-[750px]">
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[var(--accent)]" />
                Select Guided Model Template
              </h3>
              <p className="body-copy mt-2 text-sm leading-relaxed">
                Choose a preconfigured industry template to load customized direct cost matrices and activity-based allocation pools. Under high inflation, overhead allocation reveals hidden leaks that traditional accounting obscures.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {Object.values(PRESETS).map((p) => (
                <button
                  key={p.id}
                  onClick={() => setActivePreset(p.id)}
                  className={`text-left p-5 rounded-xl border transition-all flex flex-col justify-between h-full group ${
                    activePreset === p.id
                      ? "border-[var(--accent)] bg-[var(--accent-soft)] shadow-sm"
                      : "border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className={`p-2 rounded-lg text-xs font-bold uppercase ${
                        activePreset === p.id ? 'bg-[var(--surface)] text-[var(--accent)]' : 'bg-[var(--surface-subtle)] text-[var(--muted)]'
                      }`}>
                        {p.id === 'manufacturing' ? 'Industrial' : p.id === 'saas' ? 'Technology' : 'Commerce'}
                      </span>
                      {activePreset === p.id && <CheckCircle className="h-5 w-5 text-[var(--accent)]" />}
                    </div>
                    <h4 className="font-serif font-bold text-lg text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                      {p.name}
                    </h4>
                    <p className="text-xs text-[var(--muted)] mt-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--border)] w-full">
                    <p className="text-[11px] uppercase tracking-wider font-bold text-[var(--muted)]">Default Inflation Drivers</p>
                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                      <div>Labor: <span className="font-semibold">{p.baseInflation.labor}%</span></div>
                      <div>Material: <span className="font-semibold">{p.baseInflation.material}%</span></div>
                      <div>Energy: <span className="font-semibold">{p.baseInflation.energy}%</span></div>
                      <div>Shipping: <span className="font-semibold">{p.baseInflation.logistics}%</span></div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-[var(--surface-subtle)] border border-[var(--border)] p-5 rounded-xl flex items-start gap-4">
              <Info className="h-5 w-5 text-[var(--accent)] mt-0.5 shrink-0" />
              <div className="text-xs leading-relaxed">
                <span className="font-bold text-[var(--foreground)]">Guided Methodology:</span> This model applies **Activity-Based Costing (ABC)**. Instead of distributing corporate overhead (cloud server cost, sales administration, logistics QC) evenly based on sales revenue (Traditional allocation), we allocate overhead pools based on the actual driver hours/tickets consumed. This unmasks the true product & channel margins before you run strategic inflation simulations.
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: FUTURE EXPENSE PROJECTIONS & FACTORS */}
        {activeStep === 2 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                    <Settings className="h-5 w-5 text-[var(--accent)]" />
                    Macro Cost Inflation Drivers
                  </h3>
                  <p className="body-copy mt-2 text-xs leading-relaxed">
                    Adjust annual inflation drivers representing current raw cost movements. These drivers dictate the baseline compression rate of product and overhead expenses.
                  </p>
                </div>

                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[var(--muted-strong)]">Labor Cost Inflation (Annual %)</span>
                      <span className="font-bold text-[var(--accent)]">{laborInflation.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={laborInflation}
                      onChange={(e) => setLaborInflation(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[var(--muted-strong)]">Raw Materials & Inventory Inflation (Annual %)</span>
                      <span className="font-bold text-[var(--accent)]">{materialInflation.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="0.5"
                      value={materialInflation}
                      onChange={(e) => setMaterialInflation(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[var(--muted-strong)]">Utilities & Energy Surcharges (Annual %)</span>
                      <span className="font-bold text-[var(--accent)]">{energyInflation.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="0.5"
                      value={energyInflation}
                      onChange={(e) => setEnergyInflation(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[var(--muted-strong)]">Logistics & Freight Inflation (Annual %)</span>
                      <span className="font-bold text-[var(--accent)]">{logisticsInflation.toFixed(1)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="25"
                      step="0.5"
                      value={logisticsInflation}
                      onChange={(e) => setLogisticsInflation(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setLaborInflation(preset.baseInflation.labor);
                      setMaterialInflation(preset.baseInflation.material);
                      setEnergyInflation(preset.baseInflation.energy);
                      setLogisticsInflation(preset.baseInflation.logistics);
                    }}
                    className="button-secondary text-xs flex items-center gap-1.5 w-auto cursor-pointer"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Reset to Preset Defaults
                  </button>
                </div>
              </div>

              {/* FUTURE EXPENSE PROJECTIONS CARD */}
              <div className="lg:col-span-7 flex flex-col justify-between bg-[var(--surface-subtle)] p-5 border border-[var(--border)] rounded-xl">
                <div>
                  <h4 className="font-serif font-bold text-base text-[var(--foreground)] mb-2">5-Year Cumulative Expense Projection</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Projects cumulative operating expenses over 1, 3, and 5 years, highlighting the cost compounding gap between unmitigated inflation and your optimized mitigation settings.
                  </p>
                </div>

                <div className="h-[220px] my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={modelResults.expenseProjections}
                      margin={{ top: 10, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                      <XAxis dataKey="year" tick={{ fill: 'var(--muted)', fontSize: 11 }} />
                      <YAxis tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} tick={{ fill: 'var(--muted)', fontSize: 11 }} axisLine={false} width={45} />
                      <Tooltip formatter={(value) => [`$${Math.round(value).toLocaleString()}`, undefined]} />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                      <Bar dataKey="Baseline" name="Baseline (No Inflation)" fill="var(--border-strong)" />
                      <Bar dataKey="Unmitigated Inflated" name="Unmitigated Compounding" fill="#e05a4f" />
                      <Bar dataKey="Mitigated Optimized" name="Mitigated Compounding" fill="var(--success)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-[11px] leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-3 flex justify-between items-center">
                  <span>Year 5 Expense Requirements Gap: </span>
                  <span className="font-bold text-[var(--success)]">
                    -${Math.round(modelResults.expenseProjections[2]["Unmitigated Inflated"] - modelResults.expenseProjections[2]["Mitigated Optimized"]).toLocaleString()} saved
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: COST ALLOCATIONS */}
        {activeStep === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Layers className="h-5 w-5 text-[var(--accent)]" />
                  Compare Cost Allocation Methods
                </h3>
                <p className="body-copy mt-2 text-xs leading-relaxed max-w-[650px]">
                  Traditional accounting allocates indirect costs proportionally to revenue. Activity-Based Costing allocates overhead based on actual operational drivers, surfacing the hidden costs of serving specific segments.
                </p>
              </div>

              <div className="flex items-center gap-1.5 bg-[var(--surface-subtle)] border border-[var(--border)] p-1 rounded-lg shrink-0">
                <button
                  onClick={() => setAllocationMethod("traditional")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    allocationMethod === "traditional"
                      ? "bg-[var(--surface)] text-[var(--foreground)] shadow-xs"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Traditional (Revenue Share)
                </button>
                <button
                  onClick={() => setAllocationMethod("abc")}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-all ${
                    allocationMethod === "abc"
                      ? "bg-[var(--accent)] text-white shadow-xs"
                      : "text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  Activity-Based (ABC)
                </button>
              </div>
            </div>

            {/* Toggle dimension focus */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--muted)]">Dimension View:</span>
              <div className="inline-flex rounded-md shadow-xs bg-[var(--surface-subtle)] p-0.5 border border-[var(--border)]">
                <button
                  onClick={() => setDimensionFocus("products")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    dimensionFocus === "products" ? "bg-[var(--surface)] text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  Product / Service
                </button>
                <button
                  onClick={() => setDimensionFocus("customers")}
                  className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all ${
                    dimensionFocus === "customers" ? "bg-[var(--surface)] text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  Customer Segment
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 overflow-x-auto border border-[var(--border)] rounded-xl">
                <table className="min-w-full divide-y divide-[var(--border)] text-xs text-left">
                  <thead className="bg-[var(--surface-subtle)] font-bold text-[var(--muted-strong)] uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="px-4 py-3">Name</th>
                      <th scope="col" className="px-4 py-3 text-right">Revenue</th>
                      <th scope="col" className="px-4 py-3 text-right">Direct Costs</th>
                      <th scope="col" className="px-4 py-3 text-right">Allocated Overhead</th>
                      <th scope="col" className="px-4 py-3 text-right">Net Profit</th>
                      <th scope="col" className="px-4 py-3 text-right">Margin (%)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {(dimensionFocus === "products" ? modelResults.products : modelResults.customers).map((item) => (
                      <tr key={item.id} className="hover:bg-[var(--surface-subtle)] transition-colors">
                        <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{item.name}</td>
                        <td className="px-4 py-3 text-right">${Math.round(item.baseRev).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right text-[var(--muted)]">${Math.round(item.baseDirectTotal || item.baseDirectTotal === 0 ? item.baseDirectTotal : (item.baseRev - item.baseGrossProfit)).toLocaleString()}</td>
                        <td className="px-4 py-3 text-right font-medium text-amber-500">${Math.round(item.baseOverhead).toLocaleString()}</td>
                        <td className={`px-4 py-3 text-right font-bold ${item.baseNetProfit >= 0 ? 'text-[var(--foreground)]' : 'text-red-500'}`}>
                          ${Math.round(item.baseNetProfit).toLocaleString()}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            item.baseNetMargin >= 15 ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200' :
                            item.baseNetMargin >= 5 ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-200' :
                            item.baseNetMargin >= 0 ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-200' :
                            'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200'
                          }`}>
                            {item.baseNetMargin.toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="lg:col-span-5 bg-[var(--surface-subtle)] p-5 border border-[var(--border)] rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[var(--foreground)] mb-2">Margin Dispersion Comparison</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Notice how changing the allocation methodology shifts profitability between segments. Traditional allocations make high-touch customers or complex products appear more profitable than they actually are.
                  </p>
                </div>

                <div className="h-[200px] my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={(dimensionFocus === "products" ? modelResults.products : modelResults.customers).map(x => ({
                        name: x.name.split(" ")[0],
                        "Net Margin %": Math.round(x.baseNetMargin)
                      }))}
                      margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                      <YAxis tickFormatter={(val) => `${val}%`} tick={{ fill: 'var(--muted)', fontSize: 10 }} axisLine={false} width={30} />
                      <Tooltip formatter={(value) => [`${value}%`, "Net Margin"]} />
                      <Bar dataKey="Net Margin %" radius={[4, 4, 0, 0]}>
                        {(dimensionFocus === "products" ? modelResults.products : modelResults.customers).map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.baseNetMargin >= 10 ? "var(--success)" : entry.baseNetMargin >= 0 ? "var(--accent)" : "var(--danger)"} />
                        ))}
                      </Bar>
                      <ReferenceLine y={0} stroke="var(--border-strong)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-[11px] leading-relaxed text-[var(--muted)]">
                  {allocationMethod === 'traditional' ? (
                    <p className="flex items-center gap-1.5 text-amber-600 font-medium">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      Currently showing Revenue Proportionate share. Overhead drivers are hidden.
                    </p>
                  ) : (
                    <p className="flex items-center gap-1.5 text-green-600 font-medium">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                      Currently showing Activity-Based allocated overhead costs.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: TARGET BENCHMARKS & COST GAP ANALYSIS */}
        {activeStep === 4 && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                  <Target className="h-5 w-5 text-[var(--accent)]" />
                  Unit Cost Benchmarking & Target Gaps
                </h3>
                <p className="body-copy mt-2 text-xs leading-relaxed max-w-[680px]">
                  Analyze fully allocated unit costs (direct + allocated overhead) compared to custom targets. Gaps identify where process inefficiencies or inflation compound unit cost above target benchmarks.
                </p>
              </div>

              <div className="bg-[var(--surface-subtle)] border border-[var(--border)] px-4 py-2 rounded-lg text-xs leading-relaxed max-w-[320px]">
                <span className="font-semibold text-[var(--foreground)]">Absorption Principle:</span> Raising prices drops sales volume due to elasticity, which spreads fixed overhead costs over fewer units, increasing actual unit cost.
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Unit Cost Gaps Table */}
              <div className="lg:col-span-8 overflow-x-auto border border-[var(--border)] rounded-xl">
                <table className="min-w-full divide-y divide-[var(--border)] text-xs text-left">
                  <thead className="bg-[var(--surface-subtle)] font-bold text-[var(--muted-strong)] uppercase tracking-wider">
                    <tr>
                      <th scope="col" className="px-4 py-3">Product / Service</th>
                      <th scope="col" className="px-4 py-3 text-right">Units (Vol)</th>
                      <th scope="col" className="px-4 py-3 text-right">Target Benchmark</th>
                      <th scope="col" className="px-4 py-3 text-right">Actual Unit Cost</th>
                      <th scope="col" className="px-4 py-3 text-right">Gap ($ / unit)</th>
                      <th scope="col" className="px-4 py-3 text-right">Total Gap Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {modelResults.products.map((p) => {
                      const isOver = p.costGapSim > 0;
                      return (
                        <tr key={p.id} className="hover:bg-[var(--surface-subtle)] transition-colors">
                          <td className="px-4 py-3">
                            <span className="font-semibold block text-[var(--foreground)]">{p.name}</span>
                            <span className="text-[10px] text-[var(--muted)]">Elasticity: {p.elasticity}x</span>
                          </td>
                          <td className="px-4 py-3 text-right">{Math.round(p.simUnits).toLocaleString()}</td>
                          <td className="px-4 py-3 text-right font-medium">
                            <div className="flex items-center justify-end gap-1.5">
                              <span className="text-[var(--muted)]">$</span>
                              <input
                                type="number"
                                step="0.01"
                                value={customBenchmarks[p.id] !== undefined ? customBenchmarks[p.id] : p.targetUnitCost}
                                onChange={(e) => handleBenchmarkChange(p.id, e.target.value)}
                                className="w-16 px-1.5 py-0.5 text-right border border-[var(--border)] rounded bg-[var(--surface)] text-[var(--foreground)] font-semibold text-xs outline-none focus:border-[var(--accent)]"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-[var(--foreground)]">
                            ${p.simUnitCost.toFixed(2)}
                          </td>
                          <td className={`px-4 py-3 text-right font-bold ${isOver ? 'text-red-500' : 'text-[var(--success)]'}`}>
                            {isOver ? `+$${p.costGapSim.toFixed(2)}` : `-$${Math.abs(p.costGapSim).toFixed(2)}`}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                              isOver ? 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-200' : 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-200'
                            }`}>
                              {isOver ? `+$${Math.round(p.costGapSim * p.simUnits).toLocaleString()}` : "Target Achieved"}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Benchmarking Summary */}
              <div className="lg:col-span-4 bg-[var(--surface-subtle)] p-5 border border-[var(--border)] rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[var(--foreground)] mb-2">Cost Gap Analysis</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Compare current unit costs against your custom benchmarks. Use Step 5 (Remediation Playground) to reduce material/labor inflation costs and close positive cost gaps.
                  </p>
                </div>

                <div className="space-y-3 my-4">
                  {modelResults.products.map(p => {
                    const pctDiff = ((p.simUnitCost - p.targetUnitCost) / p.targetUnitCost) * 100;
                    return (
                      <div key={p.id} className="text-xs">
                        <div className="flex justify-between text-[11px] text-[var(--muted-strong)]">
                          <span>{p.name.split(" ")[0]}</span>
                          <span className={pctDiff > 0 ? "text-red-500 font-bold" : "text-[var(--success)] font-bold"}>
                            {pctDiff > 0 ? `+${pctDiff.toFixed(1)}% over` : `${pctDiff.toFixed(1)}% under`}
                          </span>
                        </div>
                        <div className="w-full bg-[var(--border)] h-1.5 rounded-full mt-1 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${pctDiff > 0 ? "bg-red-500" : "bg-[var(--success)]"}`}
                            style={{ width: `${Math.min(100, Math.max(10, 100 - pctDiff))}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="text-[11px] leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-2 font-medium">
                  {modelResults.products.some(p => p.costGapSim > 0) ? (
                    <span className="flex items-center gap-1 text-red-500">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      Gaps remain. Adjust operational efficiency in Step 5.
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[var(--success)]">
                      <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                      All products are within benchmark limits!
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: REMEDIATION PLAYGROUND */}
        {activeStep === 5 && (
          <div className="space-y-6">
            <div className="max-w-[700px]">
              <h3 className="text-xl font-serif font-bold text-[var(--foreground)] flex items-center gap-2">
                <Play className="h-5 w-5 text-[var(--accent)]" />
                Strategic Scenario Remediation Playground
              </h3>
              <p className="body-copy mt-2 text-xs leading-relaxed">
                Take tactical actions to offset inflation and secure profitability. Mitigate cost inflation via procurement, optimize labor hours through automation, and implement pricing actions (pricing sensitivity affects demand volumes).
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Levers Panel */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-[var(--accent)]" />
                    Product Pricing Adjustments
                  </h4>
                  
                  {preset.products.map(p => (
                    <div key={p.id} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="font-medium text-[var(--foreground)]">{p.name}</span>
                        <span className="text-[11px] text-[var(--muted)]">
                          Price: <strong className="text-[var(--accent)]">+{priceIncreases[p.id]}%</strong> (Vol: <strong className="text-red-500">-{((priceIncreases[p.id] || 0) * preset.elasticity[p.id]).toFixed(1)}%</strong>)
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="25"
                        step="0.5"
                        value={priceIncreases[p.id] || 0}
                        onChange={(e) => setPriceIncreases({ ...priceIncreases, [p.id]: Number(e.target.value) })}
                        className="w-full accent-[var(--accent)] cursor-pointer"
                      />
                    </div>
                  ))}
                </div>

                <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-xl space-y-4">
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
                    <Settings className="h-4 w-4 text-[var(--accent)]" />
                    Operational & Sourcing Levers
                  </h4>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Procurement Sourcing renegotiation</span>
                      <span className="font-bold text-[var(--accent)]">Mitigation: {procurementMitigation}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="50"
                      step="5"
                      value={procurementMitigation}
                      onChange={(e) => setProcurementMitigation(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                    <p className="text-[10px] text-[var(--muted)]">Reduces raw materials/inventory inflation impact.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Labor Process Automation</span>
                      <span className="font-bold text-[var(--accent)]">Savings: {laborEfficiency}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="2.5"
                      value={laborEfficiency}
                      onChange={(e) => setLaborEfficiency(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                    <p className="text-[10px] text-[var(--muted)]">Improves labor efficiency to lower direct and indirect labor costs.</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Logistics Route & Load Optimization</span>
                      <span className="font-bold text-[var(--accent)]">Efficiency: {logisticsEfficiency}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="30"
                      step="2.5"
                      value={logisticsEfficiency}
                      onChange={(e) => setLogisticsEfficiency(Number(e.target.value))}
                      className="w-full accent-[var(--accent)] cursor-pointer"
                    />
                    <p className="text-[10px] text-[var(--muted)]">Optimizes transit routes to mitigate logistics and freight expenses.</p>
                  </div>
                </div>
              </div>

              {/* Simulation Output Dashboard */}
              <div className="lg:col-span-7 bg-[var(--surface-subtle)] p-5 border border-[var(--border)] rounded-xl flex flex-col justify-between">
                <div>
                  <h4 className="font-serif font-bold text-base text-[var(--foreground)] mb-2">Scenario Analysis: Net Margin Comparison</h4>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    Compare profitability in three states: **Baseline** (before inflation), **Inflated** (inflation active, no pricing/operational mitigation), and **Optimized** (inflation active, with your selected remediation settings applied).
                  </p>
                </div>

                <div className="h-[230px] my-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        {
                          name: "Baseline State",
                          Revenue: modelResults.totals.baseRevenue,
                          EBITDA: modelResults.totals.baseEBITDA,
                          "EBITDA Margin (%)": modelResults.totals.baseEBITDAMargin
                        },
                        {
                          name: "Inflated State",
                          Revenue: modelResults.totals.infRevenue,
                          EBITDA: modelResults.totals.infEBITDA,
                          "EBITDA Margin (%)": modelResults.totals.infEBITDAMargin
                        },
                        {
                          name: "Simulated State",
                          Revenue: modelResults.totals.simRevenue,
                          EBITDA: modelResults.totals.simEBITDA,
                          "EBITDA Margin (%)": modelResults.totals.simEBITDAMargin
                        }
                      ]}
                      margin={{ top: 15, right: 10, left: 10, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.3} />
                      <XAxis dataKey="name" tick={{ fill: 'var(--muted)', fontSize: 10 }} />
                      <YAxis tickFormatter={(val) => `$${(val / 1000000).toFixed(1)}M`} tick={{ fill: 'var(--muted)', fontSize: 10 }} axisLine={false} width={40} />
                      <Tooltip formatter={(value, name) => [name === "EBITDA Margin (%)" ? `${value.toFixed(1)}%` : `$${Math.round(value).toLocaleString()}`, name]} />
                      <Legend iconSize={8} iconType="circle" wrapperStyle={{ fontSize: 10 }} />
                      <Bar dataKey="Revenue" fill="var(--muted)" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="EBITDA" fill="var(--accent)" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="text-[11px] leading-relaxed text-[var(--muted)] border-t border-[var(--border)] pt-3 flex justify-between items-center">
                  <span>Simulated Net Profit Improvement:</span>
                  <span className={`font-bold ${modelResults.totals.recovery > 0 ? 'text-[var(--success)]' : 'text-[var(--foreground)]'}`}>
                    +${Math.round(modelResults.totals.recovery).toLocaleString()} (vs. Inflated state)
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 6: EXECUTIVE CONSOLIDATED SUMMARY */}
        {activeStep === 6 && (
          <div className="space-y-6 print-section">
            <div className="flex justify-between items-start gap-4 pb-4 border-b border-[var(--border)]">
              <div>
                <h3 className="text-2xl font-serif font-bold text-[var(--foreground)]">
                  Executive Consolidated Profitability Summary
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Report generated on {new Date().toLocaleDateString()} | Active Model: {preset.name}
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="button-primary text-xs shrink-0 cursor-pointer hidden md:flex items-center gap-1.5"
              >
                <FileText className="h-3.5 w-3.5" />
                Print/Save Report
              </button>
            </div>

            {/* Inefficiencies & Benchmarks bridge */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--surface-subtle)] md:col-span-2 space-y-4">
                <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)] flex items-center gap-1">
                  <Target className="h-4.5 w-4.5 text-[var(--accent)]" />
                  Strategic Inefficiency & Cost Gap Findings
                </h4>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--success)] mt-0.5 shrink-0" />
                    <p className="text-xs leading-relaxed text-[var(--muted-strong)]">
                      <strong>Inflation Margin Compression:</strong> Annual cost inflation reduced EBITDA from <strong>${Math.round(modelResults.totals.baseEBITDA).toLocaleString()}</strong> ({modelResults.totals.baseEBITDAMargin.toFixed(1)}%) to <strong>${Math.round(modelResults.totals.infEBITDA).toLocaleString()}</strong> ({modelResults.totals.infEBITDAMargin.toFixed(1)}%), compression of <strong>${Math.round(modelResults.totals.erosion).toLocaleString()}</strong>.
                    </p>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-[var(--success)] mt-0.5 shrink-0" />
                    <p className="text-xs leading-relaxed text-[var(--muted-strong)]">
                      <strong>Mitigation Impact:</strong> Through pricing adjustment and operational efficiency optimizations, simulated EBITDA is restored to <strong>${Math.round(modelResults.totals.simEBITDA).toLocaleString()}</strong> ({modelResults.totals.simEBITDAMargin.toFixed(1)}%), recovering <strong>{resilienceScore}%</strong> of the lost profit.
                    </p>
                  </div>

                  {modelResults.products.some(p => p.costGapSim > 0) ? (
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 shrink-0" />
                      <div className="text-xs leading-relaxed text-[var(--muted-strong)]">
                        <strong>Remaining Target Benchmark Gaps:</strong>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          {modelResults.products.filter(p => p.costGapSim > 0).map(p => (
                            <li key={p.id}>
                              {p.name} unit cost remains <strong>+${p.costGapSim.toFixed(2)}</strong> above target benchmark ($${p.simUnitCost.toFixed(2)} vs target $${p.targetUnitCost.toFixed(2)}). Total Gap value is <strong>${Math.round(p.costGapSim * p.simUnits).toLocaleString()}</strong>.
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[var(--success)] mt-0.5 shrink-0" />
                      <p className="text-xs leading-relaxed text-[var(--muted-strong)]">
                        <strong>Benchmark Targets Satisfied:</strong> All simulated product unit costs are successfully aligned below custom targets!
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div className="p-5 border border-[var(--border)] rounded-xl bg-[var(--surface-subtle)] space-y-4 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-[var(--muted)]">Remediation Roadmap Checklist</h4>
                  <ul className="text-xs space-y-2.5 mt-3">
                    <li className="flex items-center gap-2">
                      <input type="checkbox" checked={Object.values(priceIncreases).some(x => x > 0)} readOnly className="rounded border-gray-300 text-[var(--accent)] h-3.5 w-3.5" />
                      <span>Implement product-specific price increases</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" checked={procurementMitigation > 0} readOnly className="rounded border-gray-300 text-[var(--accent)] h-3.5 w-3.5" />
                      <span>Renegotiate supply contracts (-{procurementMitigation}%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" checked={laborEfficiency > 0} readOnly className="rounded border-gray-300 text-[var(--accent)] h-3.5 w-3.5" />
                      <span>Automate labor workflows (-{laborEfficiency}%)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <input type="checkbox" checked={logisticsEfficiency > 0} readOnly className="rounded border-gray-300 text-[var(--accent)] h-3.5 w-3.5" />
                      <span>Optimize route & shipping rates (-{logisticsEfficiency}%)</span>
                    </li>
                  </ul>
                </div>

                <div className="text-[10px] text-[var(--muted)] border-t border-[var(--border)] pt-2 mt-4">
                  Note: Price increases account for price elasticity of demand based on historical customer responses.
                </div>
              </div>
            </div>

            {/* Performance breakdown table */}
            <div className="border border-[var(--border)] rounded-xl overflow-hidden mt-6">
              <div className="bg-[var(--surface-subtle)] p-4 border-b border-[var(--border)]">
                <h4 className="font-serif font-bold text-sm text-[var(--foreground)]">Dimensional Profitability Comparison Matrix</h4>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[var(--border)] text-xs text-left">
                  <thead className="bg-[var(--surface-subtle)] font-bold text-[var(--muted-strong)] uppercase">
                    <tr>
                      <th scope="col" className="px-4 py-3">Segment Name</th>
                      <th scope="col" className="px-4 py-3 text-right">Baseline Margin</th>
                      <th scope="col" className="px-4 py-3 text-right">Inflated Margin</th>
                      <th scope="col" className="px-4 py-3 text-right">Simulated Margin</th>
                      <th scope="col" className="px-4 py-3 text-right">Target Unit Benchmark</th>
                      <th scope="col" className="px-4 py-3 text-right">Simulated Unit Cost</th>
                      <th scope="col" className="px-4 py-3 text-right">Benchmark Cost Gap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border)]">
                    {modelResults.products.map((p) => {
                      const isOver = p.costGapSim > 0;
                      return (
                        <tr key={p.id} className="hover:bg-[var(--surface-subtle)] transition-colors">
                          <td className="px-4 py-3 font-semibold text-[var(--foreground)]">{p.name}</td>
                          <td className="px-4 py-3 text-right font-medium">{p.baseNetMargin.toFixed(1)}%</td>
                          <td className="px-4 py-3 text-right text-red-500">{p.infNetMargin.toFixed(1)}%</td>
                          <td className={`px-4 py-3 text-right font-bold ${p.simNetMargin >= p.infNetMargin ? 'text-[var(--success)]' : 'text-red-500'}`}>
                            {p.simNetMargin.toFixed(1)}%
                          </td>
                          <td className="px-4 py-3 text-right font-semibold text-[var(--muted-strong)]">
                            ${p.targetUnitCost.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-right font-bold text-[var(--foreground)]">
                            ${p.simUnitCost.toFixed(2)}
                          </td>
                          <td className={`px-4 py-3 text-right font-bold ${isOver ? 'text-red-500' : 'text-[var(--success)]'}`}>
                            {isOver ? `+$${p.costGapSim.toFixed(2)}` : `-$${Math.abs(p.costGapSim).toFixed(2)}`}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Wizard Action Footer */}
      <div className="mt-8 pt-4 border-t border-[var(--border)] flex justify-between items-center text-xs">
        <button
          onClick={() => activeStep > 1 && setActiveStep(activeStep - 1)}
          disabled={activeStep === 1}
          className={`flex items-center gap-1 px-3 py-1.5 border border-[var(--border)] rounded-md font-semibold transition-all cursor-pointer ${
            activeStep === 1
              ? "opacity-40 cursor-not-allowed"
              : "bg-[var(--surface)] text-[var(--foreground)] hover:border-[var(--border-strong)]"
          }`}
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Previous Step
        </button>

        <span className="text-[var(--muted)] font-medium">
          Step {activeStep} of 6
        </span>

        {activeStep < 6 ? (
          <button
            onClick={() => setActiveStep(activeStep + 1)}
            className="button-primary text-xs flex items-center gap-1 px-4 py-1.5 cursor-pointer"
          >
            Next Step
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        ) : (
          <button
            onClick={() => setActiveStep(1)}
            className="button-secondary text-xs flex items-center gap-1 px-4 py-1.5 cursor-pointer"
          >
            Reset Wizard
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {/* Styled Print Stylesheet */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-section, .print-section * {
            visibility: visible;
          }
          .print-section {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: black !important;
            padding: 20px !important;
          }
          button, nav, input, select, footer {
            display: none !important;
          }
        }
      `}</style>

    </div>
  );
}
