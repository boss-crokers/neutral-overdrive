"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  AlertTriangle,
  Wrench,
  Sparkles,
  Clipboard,
  Check,
  Download,
  HelpCircle,
  Play,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Settings,
  ShieldCheck,
  DollarSign
} from "lucide-react";

// Mock Inspection Report JSON Data
const MOCK_INSPECTION_DATA = {
  executive_summary: "This home inspection report shows a structurally sound 1994-built colonial home with typical age-related maintenance needs. While the 40-page technical PDF list contains several scary sounding entries, the majority are standard homeownership maintenance items. The only high-priority safety concerns are minor electrical panel issues (double-tapping) and a water heater pressure release pipe that can both be corrected by licensed professionals for under $1,200 total. The structure and roof are in stable, serviceable condition.",
  deal_risk_level: "Moderate (Manageable)",
  deal_risk_color: "warning", // success, warning, danger
  metrics: {
    safety_defects: 3,
    routine_maintenance: 5,
    cosmetic_issues: 4
  },
  safety_defects: [
    {
      title: "Double-Tapped Circuit Breaker in Main Panel",
      technical_jargon: "Double-tapped breaker observed on 20A branch circuit at main electrical service distribution panel.",
      plain_english: "Two electrical wires are connected to a single switch in your main fuse box. This is a common shortcut but can cause overloading, overheating, or a fire. A licensed electrician can easily fix this by splitting them into two separate switches or adding a tandem breaker.",
      cost_estimate: "$150 - $250",
      location: "Main garage electrical panel",
      severity: "High"
    },
    {
      title: "Water Heater TPR Valve Discharge Pipe Missing",
      technical_jargon: "Temperature and Pressure Relief (TPR) valve discharge tube is absent or terminated inadequately.",
      plain_english: "The safety release valve on the water heater is missing its extension pipe. If the water heater overheats and needs to release scalding water or steam, it could spray directly at someone nearby. Installing a simple copper or heat-resistant plastic pipe running down to the floor solves this safety hazard.",
      cost_estimate: "$50 - $100",
      location: "Basement utility room",
      severity: "High"
    },
    {
      title: "GFCI Protection Missing near Wet Areas",
      technical_jargon: "Receptacles within 6 feet of plumbing fixtures lack ground fault circuit interrupter (GFCI) protection.",
      plain_english: "The electrical outlets near the kitchen sink and bathroom basins do not have safety 'reset' buttons. Standard outlets near water pose a shock hazard. Upgrading these outlets to modern GFCI outlets shuts off power instantly if water contact occurs.",
      cost_estimate: "$150 - $300 (all outlets)",
      location: "Kitchen counter, master bathroom, powder room",
      severity: "Medium"
    }
  ],
  routine_maintenance: [
    {
      title: "HVAC Service Cycle Recommended",
      technical_jargon: "Heat pump system compressor operating normally, but technician service records are outdated (last service 2023).",
      plain_english: "The heating and cooling system works, but it hasn't been cleaned and tuned up by a technician in over two years. Having an HVAC company service the unit will extend its lifespan and keep energy bills lower.",
      cost_estimate: "$150 - $250",
      location: "Exterior compressor unit and basement furnace",
      timeline: "Within first 3 months"
    },
    {
      title: "Clogged Gutters and Downspouts",
      technical_jargon: "Debris accumulation noted in gutters, impeding proper drainage runoff away from the perimeter foundation.",
      plain_english: "Gutters are full of leaves and twigs. When it rains, water overflows and pools near the house foundation, which can cause basement leaks or foundation movement over time. Simply cleaning them out solves the issue.",
      cost_estimate: "$100 - $200 (or free DIY)",
      location: "North and west roof eaves",
      timeline: "Immediately"
    },
    {
      title: "Roofing Shingle Moss Growth",
      technical_jargon: "Localized moss colonization on south-facing roof slope. Recommend gentle chemical remediation.",
      plain_english: "Small patches of moss are starting to grow on the shingles. Moss traps moisture against the roof, which can rot shingles and cause leaks if left untreated. A gentle moss-killing spray will remove it safely.",
      cost_estimate: "$200 - $400",
      location: "Rear south roof plane",
      timeline: "Before winter"
    },
    {
      title: "Furnace Filter Needs Replacement",
      technical_jargon: "HVAC air handler return media filter is heavily loaded with particulates.",
      plain_english: "The furnace air filter is dirty and clogged. A dirty filter restricts airflow, putting strain on the system and reducing indoor air quality. It is a 5-minute fix that you can do yourself.",
      cost_estimate: "$15 - $30 (DIY)",
      location: "Air handler intake grate",
      timeline: "Immediately"
    },
    {
      title: "Tree Branches Overhanging Roof",
      technical_jargon: "Arboreal canopy encroachment over the roof deck. Encroaching branches should be pruned.",
      plain_english: "Tree limbs are touching or hanging directly over the roof shingles. Wind can scrape the shingles and damage them, or squirrels can use the branches to get onto the roof. Trimming them back 6 feet is recommended.",
      cost_estimate: "$300 - $600",
      location: "Northwest corner of property",
      timeline: "Within first 6 months"
    }
  ],
  cosmetic_issues: [
    {
      title: "Hairline Drywall Settlement Cracks",
      technical_jargon: "Minor stress cracks observed at drywall joints above living room door header and hallway partition.",
      plain_english: "Tiny hairline cracks are visible in the drywall. As homes age, they settle slightly into the soil. These cracks are purely cosmetic and can be patched with spackle and painted over whenever you redecorate.",
      cost_estimate: "$50 (DIY)",
      location: "Living room ceiling, upstairs hallway wall"
    },
    {
      title: "Damaged Door Trim",
      technical_jargon: "Physical abrasion and impact damage to casing trim on pantry door.",
      plain_english: "The wooden frame around the pantry door is scuffed and dented, likely from moving furniture or groceries. It just needs sanding and a fresh coat of paint to look new again.",
      cost_estimate: "$20 (DIY)",
      location: "Kitchen pantry entryway"
    },
    {
      title: "Faded Deck Stain",
      technical_jargon: "Exterior wood deck surface shows UV degradation and loss of protective sealer.",
      plain_english: "The wood deck in the backyard has lost its color and seal due to sun exposure. It needs power washing and a new coat of stain to protect the wood from moisture and rot.",
      cost_estimate: "$200 - $500 (DIY or hire out)",
      location: "Rear wooden deck"
    },
    {
      title: "Carpet Wear in High-Traffic Areas",
      technical_jargon: "Frictional wear and fiber crushing visible on stair riser carpet runner.",
      plain_english: "The carpet on the stairs is worn down and looks flattened from heavy foot traffic. It does not affect the safety or structure, and you can replace it or leave it as-is.",
      cost_estimate: "$400 - $800",
      location: "Main staircase"
    }
  ]
};

const PIPELINE_STEPS = [
  "Reading uploaded PDF document bytes...",
  "Converting document to Base64 data format...",
  "Uploading document to Gemini 3.5 Flash...",
  "Analyzing layout and running OCR extraction...",
  "Translating heavy technical jargon into plain English...",
  "Structuring safety, maintenance, and cosmetic reports..."
];

export default function InspectionSummarizer() {
  const [file, setFile] = useState(null);
  const [geminiApiKey, setGeminiApiKey] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  // Pipeline processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [processingTime, setProcessingTime] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  
  // Navigation / UI states
  const [activeTab, setActiveTab] = useState("overview"); // overview, safety, maintenance, cosmetic
  const [expandedItems, setExpandedItems] = useState({});
  const [copied, setCopied] = useState(false);

  // Load Gemini API key from localStorage
  useEffect(() => {
    const savedKey = localStorage.getItem("gemini_api_key");
    if (savedKey) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setGeminiApiKey(savedKey);
    }
  }, []);

  // Timer simulation during processing
  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setProcessingTime((prev) => prev + 1);
      }, 1000);
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProcessingTime(0);
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  // Handle Drag Events
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setError("");
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
    } else {
      setError("Please upload a valid PDF file.");
    }
  };

  const handleFileChange = (e) => {
    setError("");
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else if (selectedFile) {
      setError("Please upload a valid PDF file.");
    }
  };

  // Read file as Base64 helper
  const readAsBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(",")[1];
        resolve(base64String);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  // Save Gemini API key to LocalStorage
  const handleApiKeyChange = (val) => {
    setGeminiApiKey(val);
    localStorage.setItem("gemini_api_key", val);
  };

  // Run the Simulation (Mock Report)
  const runSimulator = () => {
    setError("");
    setIsProcessing(true);
    setResult(null);
    setCurrentStep(0);

    // Simulate progress updates
    const timers = [];
    PIPELINE_STEPS.forEach((_, index) => {
      const t = setTimeout(() => {
        setCurrentStep(index);
        if (index === PIPELINE_STEPS.length - 1) {
          // Final stage
          const finishTimer = setTimeout(() => {
            setIsProcessing(false);
            setResult(MOCK_INSPECTION_DATA);
            setActiveTab("overview");
          }, 1200);
          timers.push(finishTimer);
        }
      }, (index + 1) * 1500);
      timers.push(t);
    });

    return () => timers.forEach(clearTimeout);
  };

  // Run Real Gemini API Processing
  const uploadAndProcess = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }
    if (!geminiApiKey) {
      setError("Please enter a valid Gemini API Key, or use the Simulator.");
      return;
    }

    setError("");
    setIsProcessing(true);
    setResult(null);
    setCurrentStep(0);

    // Simulate pipeline progress steps on timer, but let the actual fetch run
    const progressInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < PIPELINE_STEPS.length - 2) {
          return prev + 1;
        }
        return prev;
      });
    }, 2500);

    try {
      // Step 1: Read PDF file as Base64 in-browser
      const base64Data = await readAsBase64(file);

      // Step 2: Post to Gemini API
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent?key=${geminiApiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: "You are a residential home inspection report parser. Your job is to extract findings from the uploaded PDF home inspection report and translate them into a structured JSON payload that is easy for a buyer to understand.\n\nStrictly output the response as JSON matching this schema:\n{\n  \"executive_summary\": \"A simple, plain-English summary of the property condition, key high-priority safety concerns and overall budget impact.\",\n  \"deal_risk_level\": \"Low / Moderate (Manageable) / High Risk\",\n  \"deal_risk_color\": \"success\" for low risk, \"warning\" for moderate risk, or \"danger\" for high risk,\n  \"safety_defects\": [\n    {\n      \"title\": \"Brief descriptive title of the safety issue (e.g. Double-Tapped Breaker in Panel)\",\n      \"technical_jargon\": \"The exact or paraphrased scary technical sentence from the inspection report PDF\",\n      \"plain_english\": \"Explain in simple, comforting terms what the issue is, why it is a hazard, and how it is typically resolved by a professional.\",\n      \"cost_estimate\": \"A realistic range estimate of repair cost (e.g. $150 - $250)\",\n      \"location\": \"Location in the house (e.g. Main garage electrical panel)\",\n      \"severity\": \"High or Medium\"\n    }\n  ],\n  \"routine_maintenance\": [\n    {\n      \"title\": \"Brief descriptive title of the maintenance issue (e.g. HVAC Service Recommended)\",\n      \"technical_jargon\": \"The technical finding from the PDF\",\n      \"plain_english\": \"Simple explanation of what needs to be maintained, why it's important, and what happens if it is neglected.\",\n      \"cost_estimate\": \"Realistic range or DIY cost (e.g. $15 - $30 DIY)\",\n      \"location\": \"Location of the issue\",\n      \"timeline\": \"When this should be handled (e.g. Immediately, Before winter, within 6 months)\"\n    }\n  ],\n  \"cosmetic_issues\": [\n    {\n      \"title\": \"Brief descriptive title of the cosmetic issue (e.g. Hairline drywall cracks)\",\n      \"technical_jargon\": \"The technical finding from the PDF\",\n      \"plain_english\": \"Simple description and assurance that it's cosmetic and can be tackled whenever convenience allows.\",\n      \"cost_estimate\": \"Estimated cost (e.g. $50 DIY)\",\n      \"location\": \"Location of the issue\"\n    }\n  ]\n}\n\nEnsure that you extract all safety and maintenance issues from the PDF. Translate every finding into plain English. Budget and cost estimates should be realistic for standard contractor or DIY repairs in the US."
                },
                {
                  inlineData: {
                    mimeType: "application/pdf",
                    data: base64Data
                  }
                }
              ]
            }
          ],
          generationConfig: {
            responseMimeType: "application/json"
          }
        })
      });

      if (!response.ok) {
        const errorJson = await response.json().catch(() => ({}));
        throw new Error(errorJson.error?.message || `Gemini API responded with status ${response.status}: ${response.statusText}`);
      }

      const resJson = await response.json();
      const textResponse = resJson.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!textResponse) {
        throw new Error("No response content returned from Gemini API.");
      }

      let responseJson;
      try {
        // Attempt to clean JSON in case of markdown formatting markers like ```json ... ```
        let cleanText = textResponse.trim();
        if (cleanText.startsWith("```")) {
          cleanText = cleanText.replace(/^```json\s*/i, "").replace(/```$/, "");
        }
        responseJson = JSON.parse(cleanText);
      } catch (jsonErr) {
        throw new Error("Gemini API completed successfully but returned an invalid JSON format.");
      }

      // Validate the JSON structure
      if (!responseJson.safety_defects || !responseJson.routine_maintenance || !responseJson.cosmetic_issues) {
        throw new Error("Missing required arrays (safety_defects, routine_maintenance, cosmetic_issues) in Gemini response.");
      }

      // Fill in metadata/metrics if they are missing
      const processedResult = {
        executive_summary: responseJson.executive_summary || "Here is the summary of findings from your residential home inspection report. Heavy jargon has been translated to plain English.",
        deal_risk_level: responseJson.deal_risk_level || (responseJson.safety_defects.length > 2 ? "Needs Review" : "Moderate"),
        deal_risk_color: responseJson.deal_risk_color || (responseJson.safety_defects.length > 2 ? "danger" : "warning"),
        metrics: {
          safety_defects: responseJson.safety_defects.length,
          routine_maintenance: responseJson.routine_maintenance.length,
          cosmetic_issues: responseJson.cosmetic_issues.length
        },
        safety_defects: responseJson.safety_defects,
        routine_maintenance: responseJson.routine_maintenance,
        cosmetic_issues: responseJson.cosmetic_issues
      };

      setCurrentStep(PIPELINE_STEPS.length - 1);
      setTimeout(() => {
        setIsProcessing(false);
        setResult(processedResult);
        setActiveTab("overview");
      }, 1000);

    } catch (err) {
      setError(err.message || "An unexpected error occurred while communicating with the Gemini API.");
      setIsProcessing(false);
    } finally {
      clearInterval(progressInterval);
    }
  };

  // Toggle detail expansion
  const toggleItemExpand = (category, index) => {
    const key = `${category}-${index}`;
    setExpandedItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Copy Markdown text to clipboard
  const copyToClipboard = () => {
    if (!result) return;

    let text = `# Home Inspection Summary Report\n\n`;
    text += `**Deal Health & Risk Level:** ${result.deal_risk_level}\n\n`;
    text += `## Executive Summary\n${result.executive_summary}\n\n`;
    
    text += `## Safety Defects (${result.metrics.safety_defects})\n`;
    result.safety_defects.forEach((item, i) => {
      text += `### ${i+1}. ${item.title}\n`;
      text += `- **Location:** ${item.location || "N/A"}\n`;
      text += `- **Estimated Cost:** ${item.cost_estimate || "N/A"}\n`;
      text += `- **Explanation:** ${item.plain_english}\n`;
      text += `- *Technical Term:* ${item.technical_jargon}\n\n`;
    });

    text += `## Routine Maintenance (${result.metrics.routine_maintenance})\n`;
    result.routine_maintenance.forEach((item, i) => {
      text += `### ${i+1}. ${item.title}\n`;
      text += `- **Location:** ${item.location || "N/A"}\n`;
      text += `- **Timeline:** ${item.timeline || "N/A"}\n`;
      text += `- **Estimated Cost:** ${item.cost_estimate || "N/A"}\n`;
      text += `- **Explanation:** ${item.plain_english}\n`;
      text += `- *Technical Term:* ${item.technical_jargon}\n\n`;
    });

    text += `## Cosmetic Issues (${result.metrics.cosmetic_issues})\n`;
    result.cosmetic_issues.forEach((item, i) => {
      text += `### ${i+1}. ${item.title}\n`;
      text += `- **Location:** ${item.location || "N/A"}\n`;
      text += `- **Estimated Cost:** ${item.cost_estimate || "N/A"}\n`;
      text += `- **Explanation:** ${item.plain_english}\n`;
      text += `- *Technical Term:* ${item.technical_jargon}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Download raw markdown file
  const downloadReportFile = () => {
    if (!result) return;
    
    let text = `# Home Inspection Summary Report\n\n`;
    text += `**Deal Health & Risk Level:** ${result.deal_risk_level}\n\n`;
    text += `## Executive Summary\n${result.executive_summary}\n\n`;
    
    text += `## Safety Defects (${result.metrics.safety_defects})\n`;
    result.safety_defects.forEach((item, i) => {
      text += `### ${i+1}. ${item.title}\n`;
      text += `- **Location:** ${item.location || "N/A"}\n`;
      text += `- **Estimated Cost:** ${item.cost_estimate || "N/A"}\n`;
      text += `- **Explanation:** ${item.plain_english}\n`;
      text += `- *Technical Term:* ${item.technical_jargon}\n\n`;
    });

    text += `## Routine Maintenance (${result.metrics.routine_maintenance})\n`;
    result.routine_maintenance.forEach((item, i) => {
      text += `### ${i+1}. ${item.title}\n`;
      text += `- **Location:** ${item.location || "N/A"}\n`;
      text += `- **Timeline:** ${item.timeline || "N/A"}\n`;
      text += `- **Estimated Cost:** ${item.cost_estimate || "N/A"}\n`;
      text += `- **Explanation:** ${item.plain_english}\n`;
      text += `- *Technical Term:* ${item.technical_jargon}\n\n`;
    });

    text += `## Cosmetic Issues (${result.metrics.cosmetic_issues})\n`;
    result.cosmetic_issues.forEach((item, i) => {
      text += `### ${i+1}. ${item.title}\n`;
      text += `- **Location:** ${item.location || "N/A"}\n`;
      text += `- **Estimated Cost:** ${item.cost_estimate || "N/A"}\n`;
      text += `- **Explanation:** ${item.plain_english}\n`;
      text += `- *Technical Term:* ${item.technical_jargon}\n\n`;
    });

    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `inspection-summary-${file ? file.name.replace(".pdf", "") : "report"}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getRiskBadgeStyles = (level = "") => {
    const lvl = level.toLowerCase();
    if (lvl.includes("low") || lvl.includes("stable")) {
      return "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900";
    }
    if (lvl.includes("moderate") || lvl.includes("manageable")) {
      return "bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-900";
    }
    return "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900";
  };

  const totalIssuesCount = result ? result.metrics.safety_defects + result.metrics.routine_maintenance + result.metrics.cosmetic_issues : 0;

  return (
    <div className="w-full max-w-5xl mx-auto font-sans">
      
      {/* Settings / API Key Panel */}
      <div className="mb-6 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-2xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--accent)]">
              <Settings className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[var(--foreground)] text-[15px]">Gemini API Connection Settings</h3>
              <p className="text-xs text-[var(--muted)]">Configure your Gemini API Key to analyze PDFs directly in your browser</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="inline-flex items-center gap-1.5 text-xs text-[var(--accent)] hover:underline font-semibold"
            >
              <HelpCircle className="h-4 w-4" />
              {showInstructions ? "Hide Setup Guide" : "Show Setup Guide"}
            </button>
          </div>
        </div>

        {/* API Key Input Field */}
        <div className="mt-4">
          <label className="block text-xs font-semibold text-[var(--muted-strong)] mb-1.5 uppercase tracking-wider">
            Gemini API Key
          </label>
          <input
            type="password"
            value={geminiApiKey}
            onChange={(e) => handleApiKeyChange(e.target.value)}
            placeholder="AIzaSy..."
            className="w-full px-3 py-2 bg-[var(--surface)] border border-[var(--border)] rounded-lg outline-none text-sm text-[var(--foreground)] placeholder-neutral-400 focus:ring-2 focus:ring-[var(--accent)] focus:border-transparent transition-all"
          />
        </div>

        {/* Instructions Collapsible */}
        {showInstructions && (
          <div className="mt-5 border-t border-[var(--border)] pt-4 text-sm text-[var(--muted-strong)] space-y-3">
            <p className="font-semibold text-[var(--foreground)]">How to get your Gemini API Key in 2 minutes:</p>
            <ol className="list-decimal pl-5 space-y-2 text-xs leading-relaxed text-[var(--muted)]">
              <li>
                Go to <a href="https://aistudio.google.com" target="_blank" rel="noreferrer" className="text-[var(--accent)] hover:underline">Google AI Studio</a>.
              </li>
              <li>
                Sign in with your Google account and click on the **&quot;Get API Key&quot;** button.
              </li>
              <li>
                Create a new API Key, copy it, and paste it in the **Gemini API Key** field above.
              </li>
              <li>
                Your key will be securely saved locally in your browser&apos;s storage and used to directly analyze home inspection reports.
              </li>
            </ol>
          </div>
        )}
      </div>

      {/* Main Upload Dropzone / Progress Area */}
      {!result && !isProcessing && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`flex flex-col items-center justify-center border-2 border-dashed rounded-3xl p-10 md:p-14 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[var(--accent)] bg-[var(--accent-soft)]/20 scale-[0.99]"
              : "border-[var(--border-strong)] bg-[var(--surface)] hover:border-[var(--accent)] hover:bg-[var(--surface-subtle)]/40"
          }`}
        >
          <div className="mb-5 p-4 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-[var(--border)] text-[var(--accent)]">
            <Upload className="h-10 w-10 animate-bounce" />
          </div>

          <h3 className="text-xl font-bold font-serif text-[var(--foreground)]">
            {file ? file.name : "Upload Home Inspection Report"}
          </h3>

          <p className="mt-2 text-sm text-[var(--muted)] max-w-sm leading-relaxed">
            {file
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB • PDF Document`
              : "Drag & drop your technical PDF report here, or click to browse files from your computer."}
          </p>

          {/* Error Message */}
          {error && (
            <div className="mt-4 px-4 py-2 bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs rounded-lg flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Hidden File Input */}
          <input
            type="file"
            id="pdf-upload"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="mt-8 flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center">
            {file ? (
              <>
                <button
                  onClick={uploadAndProcess}
                  disabled={!geminiApiKey}
                  className={`button-primary inline-flex items-center gap-2 ${
                    !geminiApiKey ? "opacity-40 cursor-not-allowed border-neutral-300 bg-neutral-300" : ""
                  }`}
                >
                  <Sparkles className="h-4 w-4" />
                  Analyze with Gemini
                </button>
                <button
                  onClick={() => setFile(null)}
                  className="button-secondary inline-flex items-center gap-2"
                >
                  <RotateCcw className="h-4 w-4" />
                  Clear File
                </button>
              </>
            ) : (
              <label
                htmlFor="pdf-upload"
                className="button-primary inline-flex items-center gap-2 cursor-pointer"
              >
                Browse Files
              </label>
            )}
            
            <button
              onClick={runSimulator}
              className="button-secondary border-dashed inline-flex items-center gap-2 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <Play className="h-4 w-4" />
              Try with Mock Report
            </button>
          </div>
          
          {!file && (
            <p className="mt-4 text-xs text-[var(--muted)]">
              No real PDF needed to try. Click &ldquo;Try with Mock Report&rdquo; to simulate instantly.
            </p>
          )}
        </div>
      )}

      {/* Pipeline Loader & Step Tracker */}
      {isProcessing && (
        <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-8 md:p-10 shadow-sm flex flex-col items-center justify-center">
          <div className="relative flex items-center justify-center w-24 h-24 mb-6">
            {/* Pulsing ring */}
            <div className="absolute inset-0 rounded-full border-4 border-[var(--accent-soft)] animate-ping opacity-75"></div>
            {/* Spinning ring */}
            <div className="absolute inset-0 rounded-full border-4 border-t-[var(--accent)] border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
            <FileText className="h-10 w-10 text-[var(--accent)]" />
          </div>

          <h3 className="text-lg font-bold text-[var(--foreground)] text-center">
            Processing Technical Report
          </h3>
          <p className="text-sm text-[var(--muted)] mt-1.5">
            Running OCR & translation pipeline • {processingTime}s elapsed
          </p>

          {/* Stepper Progress List */}
          <div className="mt-8 w-full max-w-md border-t border-[var(--border)] pt-6 space-y-4">
            {PIPELINE_STEPS.map((step, idx) => {
              const isCompleted = idx < currentStep;
              const isActive = idx === currentStep;
              return (
                <div key={idx} className="flex items-start gap-3 text-sm">
                  <div className="mt-0.5 shrink-0">
                    {isCompleted ? (
                      <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs">
                        <Check className="h-3.5 w-3.5 stroke-[3]" />
                      </div>
                    ) : isActive ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--accent)] text-[var(--accent)] flex items-center justify-center text-xs relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse"></div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-[var(--border-strong)] text-[var(--muted)] flex items-center justify-center text-xs">
                        {idx + 1}
                      </div>
                    )}
                  </div>
                  <span
                    className={`font-medium ${
                      isCompleted
                        ? "text-emerald-600 dark:text-emerald-400 line-through opacity-70"
                        : isActive
                        ? "text-[var(--accent)] font-bold"
                        : "text-[var(--muted)]"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Dashboard Result View */}
      {result && (
        <div className="space-y-6">
          
          {/* Header Summary Banner */}
          <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[var(--border)]">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] bg-[var(--accent-soft)] px-2.5 py-1 rounded-full">
                  Analysis Completed Successfully
                </span>
                <h2 className="mt-2.5 font-serif text-3xl font-bold leading-tight text-[var(--foreground)]">
                  Inspection Summary Dashboard
                </h2>
                <p className="text-sm text-[var(--muted)] mt-1">
                  {file ? file.name : "Simulated Inspection Report"} • PDF parsed via Gemini 3.5 OCR
                </p>
              </div>

              {/* Deal Status Indicator */}
              <div className="flex flex-col items-start lg:items-end gap-1 shrink-0">
                <span className="text-xs font-semibold text-[var(--muted)] uppercase tracking-wider">Property Transaction Health</span>
                <span className={`px-4 py-1.5 rounded-full text-sm font-bold flex items-center gap-1.5 ${getRiskBadgeStyles(result.deal_risk_level)}`}>
                  <ShieldCheck className="h-4.5 w-4.5" />
                  {result.deal_risk_level}
                </span>
              </div>
            </div>

            {/* Quick Metrics Statistics grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6">
              <div className="p-4 bg-[var(--surface-subtle)] border border-[var(--border)] rounded-2xl text-center">
                <p className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider">Total Defects</p>
                <p className="text-3xl font-bold text-[var(--foreground)] mt-1">{totalIssuesCount}</p>
              </div>
              <div className="p-4 bg-rose-50/40 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900/40 rounded-2xl text-center">
                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Safety Hazards</p>
                <p className="text-3xl font-bold text-rose-600 dark:text-rose-400 mt-1">{result.metrics.safety_defects}</p>
              </div>
              <div className="p-4 bg-amber-50/40 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/40 rounded-2xl text-center">
                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">Maintenance</p>
                <p className="text-3xl font-bold text-amber-600 dark:text-amber-400 mt-1">{result.metrics.routine_maintenance}</p>
              </div>
              <div className="p-4 bg-blue-50/40 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/40 rounded-2xl text-center">
                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Cosmetic</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1">{result.metrics.cosmetic_issues}</p>
              </div>
            </div>
          </div>

          {/* Main Content Area: Tabs Navigation */}
          <div className="flex border-b border-[var(--border)] gap-2 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "overview"
                  ? "border-[var(--accent)] text-[var(--accent)]"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <FileText className="h-4 w-4" />
              Executive Summary
            </button>
            <button
              onClick={() => setActiveTab("safety")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "safety"
                  ? "border-rose-500 text-rose-600 dark:text-rose-400"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <AlertTriangle className="h-4 w-4 text-rose-500" />
              Safety Defects ({result.metrics.safety_defects})
            </button>
            <button
              onClick={() => setActiveTab("maintenance")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "maintenance"
                  ? "border-amber-500 text-amber-600 dark:text-amber-400"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Wrench className="h-4 w-4 text-amber-500" />
              Routine Maintenance ({result.metrics.routine_maintenance})
            </button>
            <button
              onClick={() => setActiveTab("cosmetic")}
              className={`px-4 py-3 text-sm font-semibold border-b-2 whitespace-nowrap transition-all flex items-center gap-2 ${
                activeTab === "cosmetic"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              <Sparkles className="h-4 w-4 text-blue-500" />
              Cosmetic Issues ({result.metrics.cosmetic_issues})
            </button>
          </div>

          {/* TAB CONTENT: Overview */}
          {activeTab === "overview" && (
            <div className="bg-[var(--surface)] border border-[var(--border)] rounded-3xl p-6 shadow-sm space-y-6">
              <div>
                <h3 className="font-serif text-2xl font-bold text-[var(--foreground)] mb-3">Reassuring Translation</h3>
                <p className="body-copy text-[15px] leading-relaxed text-[var(--muted-strong)]">
                  {result.executive_summary}
                </p>
              </div>

              <div className="border-t border-[var(--border)] pt-6">
                <h4 className="font-semibold text-sm text-[var(--foreground)] uppercase tracking-wider mb-4">
                  Issue Distribution Analysis
                </h4>
                
                <div className="space-y-4">
                  {/* Safety defects bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-rose-600 dark:text-rose-400">Safety defects (Immediate actions required)</span>
                      <span>{result.metrics.safety_defects} items</span>
                    </div>
                    <div className="w-full h-3 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-rose-500 rounded-full"
                        style={{ width: `${(result.metrics.safety_defects / totalIssuesCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Routine maintenance bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-amber-600 dark:text-amber-400">Routine maintenance (Standard homeowner tasks)</span>
                      <span>{result.metrics.routine_maintenance} items</span>
                    </div>
                    <div className="w-full h-3 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full"
                        style={{ width: `${(result.metrics.routine_maintenance / totalIssuesCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Cosmetic issues bar */}
                  <div>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-blue-600 dark:text-blue-400">Cosmetic / Aesthetics (Minor updates)</span>
                      <span>{result.metrics.cosmetic_issues} items</span>
                    </div>
                    <div className="w-full h-3 bg-[var(--surface-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded-full"
                        style={{ width: `${(result.metrics.cosmetic_issues / totalIssuesCount) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[var(--border)] pt-6 flex flex-wrap gap-3">
                <button
                  onClick={copyToClipboard}
                  className="button-secondary text-xs inline-flex items-center gap-1.5"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Clipboard className="h-4 w-4" />}
                  {copied ? "Copied Markdown" : "Copy Markdown Summary"}
                </button>
                <button
                  onClick={downloadReportFile}
                  className="button-secondary text-xs inline-flex items-center gap-1.5"
                >
                  <Download className="h-4 w-4" />
                  Download Summary File
                </button>
                <button
                  onClick={() => {
                    setResult(null);
                    setFile(null);
                  }}
                  className="button-secondary border-dashed text-xs inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="h-4 w-4" />
                  Analyze Another Report
                </button>
              </div>
            </div>
          )}

          {/* TAB CONTENT: Safety Defects */}
          {activeTab === "safety" && (
            <div className="space-y-4">
              <div className="bg-rose-50/50 dark:bg-rose-950/10 border border-rose-200 dark:border-rose-900/60 rounded-2xl p-4 text-sm text-rose-800 dark:text-rose-300">
                <p className="font-semibold flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-500 shrink-0" />
                  Important: Safety Defects represent immediate hazards.
                </p>
                <p className="text-xs mt-1 text-[var(--muted)]">
                  These electrical, mechanical, or structural concerns should be resolved by professionals quickly. They are excellent negotiation points in home-purchase contracts.
                </p>
              </div>

              {result.safety_defects.map((item, idx) => {
                const key = `safety-${idx}`;
                const isExpanded = expandedItems[key];
                return (
                  <div
                    key={idx}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-rose-300 dark:hover:border-rose-800 transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleItemExpand("safety", idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/40">
                            Severity: {item.severity || "High"}
                          </span>
                          <span className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> Cost: {item.cost_estimate}
                          </span>
                        </div>
                        <h4 className="mt-2 text-[17px] font-bold text-[var(--foreground)]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[var(--muted)] mt-1.5">Location: {item.location}</p>
                      </div>
                      <div className="text-[var(--muted)]">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </button>

                    <div className="border-t border-[var(--border)] bg-neutral-50/30 dark:bg-neutral-950/10 px-5 py-5 space-y-4">
                      <div>
                        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider block mb-1">
                          Plain English Explanation
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--foreground)]">
                          {item.plain_english}
                        </p>
                      </div>

                      {isExpanded ? (
                        <div className="pt-3 border-t border-[var(--border)] border-dashed">
                          <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-1">
                            Original Inspection PDF Report Text (Scary Technical Jargon)
                          </span>
                          <p className="text-xs italic font-mono bg-[var(--surface-subtle)] p-3 rounded-lg text-[var(--muted-strong)] border border-[var(--border)] leading-relaxed">
                            {item.technical_jargon}
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleItemExpand("safety", idx)}
                          className="text-xs text-[var(--accent)] font-semibold hover:underline flex items-center gap-1"
                        >
                          Show technical jargon text...
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB CONTENT: Routine Maintenance */}
          {activeTab === "maintenance" && (
            <div className="space-y-4">
              <div className="bg-amber-50/50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900/60 rounded-2xl p-4 text-sm text-amber-800 dark:text-amber-300">
                <p className="font-semibold flex items-center gap-1.5">
                  <Wrench className="h-4 w-4 text-amber-500 shrink-0" />
                  Routine Maintenance Items.
                </p>
                <p className="text-xs mt-1 text-[var(--muted)]">
                  These represent standard homeowner upkeep (HVAC tuneups, filter swaps, and gutter clearances). They are not structural emergencies but are important to prevent future issues.
                </p>
              </div>

              {result.routine_maintenance.map((item, idx) => {
                const key = `maintenance-${idx}`;
                const isExpanded = expandedItems[key];
                return (
                  <div
                    key={idx}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-amber-300 dark:hover:border-amber-800 transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleItemExpand("maintenance", idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40">
                            Timeline: {item.timeline || "First Year"}
                          </span>
                          <span className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> Cost: {item.cost_estimate}
                          </span>
                        </div>
                        <h4 className="mt-2 text-[17px] font-bold text-[var(--foreground)]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[var(--muted)] mt-1.5">Location: {item.location}</p>
                      </div>
                      <div className="text-[var(--muted)]">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </button>

                    <div className="border-t border-[var(--border)] bg-neutral-50/30 dark:bg-neutral-950/10 px-5 py-5 space-y-4">
                      <div>
                        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider block mb-1">
                          Plain English Explanation
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--foreground)]">
                          {item.plain_english}
                        </p>
                      </div>

                      {isExpanded ? (
                        <div className="pt-3 border-t border-[var(--border)] border-dashed">
                          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
                            Original Inspection PDF Report Text (Scary Technical Jargon)
                          </span>
                          <p className="text-xs italic font-mono bg-[var(--surface-subtle)] p-3 rounded-lg text-[var(--muted-strong)] border border-[var(--border)] leading-relaxed">
                            {item.technical_jargon}
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleItemExpand("maintenance", idx)}
                          className="text-xs text-[var(--accent)] font-semibold hover:underline flex items-center gap-1"
                        >
                          Show technical jargon text...
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TAB CONTENT: Cosmetic Issues */}
          {activeTab === "cosmetic" && (
            <div className="space-y-4">
              <div className="bg-blue-50/50 dark:bg-blue-950/10 border border-blue-200 dark:border-blue-900/60 rounded-2xl p-4 text-sm text-blue-800 dark:text-blue-300">
                <p className="font-semibold flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-blue-500 shrink-0" />
                  Cosmetic / Aesthetic Issues.
                </p>
                <p className="text-xs mt-1 text-[var(--muted)]">
                  These are minor aesthetic flaws, scuffed baseboards, faded paint, or light settlement cracks. They do not pose health risks or require immediate homeowner investment.
                </p>
              </div>

              {result.cosmetic_issues.map((item, idx) => {
                const key = `cosmetic-${idx}`;
                const isExpanded = expandedItems[key];
                return (
                  <div
                    key={idx}
                    className="bg-[var(--surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-blue-300 dark:hover:border-blue-800 transition-all shadow-sm"
                  >
                    <button
                      onClick={() => toggleItemExpand("cosmetic", idx)}
                      className="w-full text-left p-5 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/40">
                            Aesthetic Issue
                          </span>
                          <span className="text-xs font-semibold text-[var(--muted)] flex items-center gap-1">
                            <DollarSign className="h-3 w-3" /> Cost: {item.cost_estimate}
                          </span>
                        </div>
                        <h4 className="mt-2 text-[17px] font-bold text-[var(--foreground)]">
                          {item.title}
                        </h4>
                        <p className="text-xs text-[var(--muted)] mt-1.5">Location: {item.location}</p>
                      </div>
                      <div className="text-[var(--muted)]">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </button>

                    <div className="border-t border-[var(--border)] bg-neutral-50/30 dark:bg-neutral-950/10 px-5 py-5 space-y-4">
                      <div>
                        <span className="text-xs font-bold text-[var(--muted)] uppercase tracking-wider block mb-1">
                          Plain English Explanation
                        </span>
                        <p className="text-sm leading-relaxed text-[var(--foreground)]">
                          {item.plain_english}
                        </p>
                      </div>

                      {isExpanded ? (
                        <div className="pt-3 border-t border-[var(--border)] border-dashed">
                          <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                            Original Inspection PDF Report Text (Scary Technical Jargon)
                          </span>
                          <p className="text-xs italic font-mono bg-[var(--surface-subtle)] p-3 rounded-lg text-[var(--muted-strong)] border border-[var(--border)] leading-relaxed">
                            {item.technical_jargon}
                          </p>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleItemExpand("cosmetic", idx)}
                          className="text-xs text-[var(--accent)] font-semibold hover:underline flex items-center gap-1"
                        >
                          Show technical jargon text...
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Reset button at bottom */}
          <div className="flex justify-center pt-4">
            <button
              onClick={() => {
                setResult(null);
                setFile(null);
              }}
              className="button-primary inline-flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Upload Another Report
            </button>
          </div>
        </div>
      )}
      <div className="mt-8 border-t border-[var(--border)] pt-4 text-[11px] leading-relaxed text-[var(--muted)]">
        <p>
          * <strong>Disclaimer:</strong> This tool utilizes AI-based OCR and summarization to translate inspection text. It is for convenience and educational use only and does not replace a professional physical inspection, certified structural survey, or official engineering reviews. Neutral Overdrive is not liable for structural decisions, purchase choices, or contractor execution based on these summaries.
        </p>
      </div>
    </div>
  );
}
