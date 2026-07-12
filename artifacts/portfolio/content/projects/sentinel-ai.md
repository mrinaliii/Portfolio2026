---
githubUrl: https://github.com/mrinaliii/sentinel-ai
slug: sentinel-ai
title: Sentinel AI
subtitle: AI-Powered SOC Analyst
year: 2024
category: AI/ML
status: Completed
shortDescription: An intelligent Security Operations platform combining large language models with SIEM technologies to assist analysts in threat investigation, alert analysis, and MITRE ATT&CK mapping.
description: An intelligent Security Operations platform that combines large language models with modern SIEM technologies to assist analysts in threat investigation, alert analysis, and MITRE ATT&CK mapping.
duration: 3 months
role: Solo Engineer
coverSrc: /projects/sentinel-ai/cover.jpg
technologies:
  - name: Python
    tooltip: Primary language
  - name: PyTorch
    tooltip: Deep learning framework used for model fine-tuning
  - name: "Hugging Face Transformers"
    tooltip: DistilBERT-based classification for alert triage
  - name: FastAPI
    tooltip: High-performance async Python API server
  - name: Regex
    tooltip: Pattern-based rules for structured log and alert parsing
---
githubUrl: https://github.com/mrinaliii/sentinel-ai

## PROJECT OVERVIEW: The Problem With Alert Fatigue

Modern Security Operations Centers process thousands of alerts per day. Most are noise. Analysts spend the majority of their time triaging rather than investigating - and the real threats can slip through while they are buried in false positives. Sentinel AI addresses this by using language models to pre-analyze incoming alerts, correlate them with known threat patterns, and produce natural-language summaries that give analysts the context they need to act immediately.

## TECHNICAL APPROACH: Layering LLMs Over Existing SIEM Infrastructure

Rather than replacing existing SIEM tooling, Sentinel AI sits as an intelligence layer above it. Alerts from Splunk and Elasticsearch are normalized into a common schema, then passed through a LangChain pipeline that performs contextual enrichment - cross-referencing MITRE ATT&CK tactics, pulling relevant threat intelligence, and generating a structured analyst brief. Wazuh provides the underlying host-based detection rules that feed into the alert stream.

## ARCHITECTURE: Four-Layer Pipeline

- Ingestion Layer - Splunk and Elasticsearch connectors normalize heterogeneous alert formats
- Enrichment Layer - MITRE ATT&CK mapping via vector similarity search over the tactics database
- Reasoning Layer - LangChain pipeline with GPT-4o-mini generates analyst briefs and confidence scores
- Presentation Layer - React dashboard surfaces prioritized alerts with one-click drill-down into LLM analysis

## KEY CHALLENGES: Grounding the LLM Without Hallucination

The biggest engineering challenge was ensuring the LLM's analysis stayed grounded in real alert data rather than generating plausible-sounding but fabricated threat narratives. The solution was a retrieval step before every generation call: the system fetches the three most semantically similar historical incidents from the vector store and includes them as context. This anchors the model's reasoning in real patterns rather than pure generation.

## MITRE INTEGRATION: Mapping Alerts to Adversary Behavior

Each alert is embedded using the same model as the MITRE ATT&CK technique descriptions, and cosine similarity is used to identify the most relevant tactics and sub-techniques. This gives the analyst immediate framing: not just "unusual outbound connection" but "potential C2 beaconing, consistent with T1071.001 - Application Layer Protocol: Web Protocols." The mapping is surfaced in the alert brief with a confidence percentage.

## OUTCOMES: What The System Achieved

In internal testing against a synthetic alert dataset, the system correctly identified the relevant MITRE technique in 84% of cases. Analyst review time per alert was reduced from an estimated 12 minutes (manual lookup and contextual research) to under 3 minutes with the AI brief. The LLM analysis was rated "useful or highly useful" in 91% of evaluated cases.

## WHAT I LEARNED: Security AI Is a Human-AI Collaboration Problem

The most important design decision was not technical - it was epistemic. The system presents confidence scores and reasoning chains, never conclusions. An analyst who cannot explain why they escalated an alert is a liability. Sentinel AI is designed to augment analyst judgment, not replace it. This shaped every prompt, every UI decision, and every data display choice in the dashboard.
