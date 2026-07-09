---
slug: securesense
title: SecureSense
subtitle: AI-Powered Sensitive Data Protection
year: 2023
category: SECURITY
status: Completed
shortDescription: A machine learning system detecting sensitive information using transformer embeddings and pattern recognition while monitoring suspicious access patterns through secure APIs and audit logging.
description: A machine learning system that detects sensitive information using transformer embeddings and pattern recognition while monitoring suspicious access patterns through secure APIs and audit logging.
duration: 2 months
role: Solo Engineer
technologies:
  - name: Transformers
    tooltip: HuggingFace transformers for NLP classification
  - name: NLP
    tooltip: Natural language processing for text classification
  - name: FastAPI
    tooltip: High-performance async Python API server
  - name: Python
    tooltip: Primary language
  - name: SQLite
    tooltip: Audit log storage
---

## PROJECT OVERVIEW — Detecting What Should Not Be There

Data exfiltration often begins with sensitive data appearing where it should not — in logs, in unsanitized API responses, in files stored in the wrong location. SecureSense is a classification and monitoring system that uses transformer embeddings to detect sensitive content (PII, credentials, confidential business data) in text streams, combined with access pattern monitoring to flag suspicious retrieval behavior.

## TECHNICAL APPROACH — Two-Layer Detection

The system uses two complementary detection approaches. The first is a fine-tuned transformer model (BERT-based) trained on labeled examples of sensitive vs. non-sensitive text — this handles semantic detection where pattern matching would fail (e.g., "my card ending in four two eight one" rather than a 16-digit number). The second is a rule-based pattern layer using regex and structural heuristics for high-confidence detection of structured sensitive data formats.

## ACCESS MONITORING — Behavioral Anomaly Detection

Beyond content classification, the system monitors API access patterns: request frequency, unusual retrieval patterns, off-hours access, and bulk download behavior. These signals are aggregated into a risk score using a simple weighted model. The audit log provides a complete, tamper-evident record of all access events for forensic review.

## WHAT I LEARNED — Security Is Defense in Depth

The most important lesson was that no single detection mechanism is reliable in isolation. The transformer model catches semantic patterns that regex misses. The regex layer catches structured data that the model occasionally misclassifies. The behavioral monitoring catches exfiltration attempts that slip through content detection entirely. This project concretized what "defense in depth" means at the code level.
