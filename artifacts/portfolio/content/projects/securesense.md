---
githubUrl: https://github.com/mrinaliii/SecureSense
slug: securesense
title: SecureSense
subtitle: AI-Powered Sensitive Data Protection
year: 2026
category: Cybersecurity
status: Completed
shortDescription: A secure document analysis platform using FastAPI, LangChain, and Ollama, with Elasticsearch-powered semantic search and retrieval across indexed documents.
description: Developed a secure document analysis platform using FastAPI, LangChain, and Ollama. Integrated Elasticsearch to enable semantic search and efficient retrieval across indexed documents, with REST APIs supporting secure querying, modular workflows, and scalable backend services.
duration: 2 months
role: Solo Engineer
coverSrc: /projects/securesense/cover.jpg
technologies:
  - name: Python
    tooltip: Primary language
  - name: FastAPI
    tooltip: High-performance async Python API server
  - name: LangChain
    tooltip: LLM orchestration framework for building AI pipelines
  - name: Ollama
    tooltip: Local LLM runtime for on-device inference
  - name: Elasticsearch
    tooltip: Full-text and semantic search across indexed documents
---
githubUrl: https://github.com/mrinaliii/SecureSense

## PROJECT OVERVIEW: Detecting What Should Not Be There

Data exfiltration often begins with sensitive data appearing where it should not - in logs, in unsanitized API responses, in files stored in the wrong location. SecureSense is a classification and monitoring system that uses transformer embeddings to detect sensitive content (PII, credentials, confidential business data) in text streams, combined with access pattern monitoring to flag suspicious retrieval behavior.

## TECHNICAL APPROACH: Two-Layer Detection

The system uses two complementary detection approaches. The first is a fine-tuned transformer model (BERT-based) trained on labeled examples of sensitive vs. non-sensitive text - this handles semantic detection where pattern matching would fail (e.g., "my card ending in four two eight one" rather than a 16-digit number). The second is a rule-based pattern layer using regex and structural heuristics for high-confidence detection of structured sensitive data formats.

## ACCESS MONITORING: Behavioral Anomaly Detection

Beyond content classification, the system monitors API access patterns: request frequency, unusual retrieval patterns, off-hours access, and bulk download behavior. These signals are aggregated into a risk score using a simple weighted model. The audit log provides a complete, tamper-evident record of all access events for forensic review.

## WHAT I LEARNED: Security Is Defense in Depth

The most important lesson was that no single detection mechanism is reliable in isolation. The transformer model catches semantic patterns that regex misses. The regex layer catches structured data that the model occasionally misclassifies. The behavioral monitoring catches exfiltration attempts that slip through content detection entirely. This project concretized what "defense in depth" means at the code level.
