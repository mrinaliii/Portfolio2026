---
slug: solar-energy-rag
title: Solar Energy RAG
subtitle: Retrieval-Augmented Generation Platform
year: 2024
category: AI/ML
status: Completed
shortDescription: A semantic document retrieval system enabling natural language interaction with structured solar energy reports using LangChain, vector embeddings, and modern language models.
description: Built a semantic document retrieval system that enables natural language interaction with structured solar energy reports using LangChain, vector embeddings, and modern language models.
duration: 2 months
role: Solo Engineer
coverSrc: /projects/solar-energy-rag/cover.jpg
technologies:
  - name: Python
    tooltip: Primary language
  - name: LangChain
    tooltip: Orchestration for the RAG pipeline
  - name: ChromaDB
    tooltip: Vector database for embedding storage and retrieval
  - name: "Hugging Face Embeddings"
    tooltip: Embedding models used to vectorize document chunks
  - name: Ollama
    tooltip: Local LLM runtime for on-device inference
---

## PROJECT OVERVIEW — Making Structured Reports Queryable

Solar energy technical reports are dense, structured, and filled with domain-specific terminology. Conventional search cannot answer questions like "What was the capacity factor deviation in Q3?" without understanding the document structure and the meaning of the query. This project built a RAG system that converts those reports into a semantic knowledge base, allowing domain users to interact with the data in natural language.

## TECHNICAL APPROACH — Chunking, Embedding, and Retrieval

Documents are preprocessed using a structure-aware chunking strategy that respects section boundaries rather than splitting naively at token limits. Each chunk is embedded using OpenAI's text-embedding-3-small model and stored in a FAISS index. At query time, the user question is embedded and the top-k most similar chunks are retrieved as context for the generation step.

## ARCHITECTURE — RAG Pipeline Design

- Document ingestion — PDF parsing with structure-aware section detection
- Chunking — paragraph-boundary splitting with 50-token overlap to preserve context at boundaries
- Embedding — OpenAI text-embedding-3-small, stored in FAISS index
- Retrieval — cosine similarity, top-5 chunks returned with metadata
- Generation — GPT-4o-mini with retrieved context and domain-specific system prompt
- Interface — Streamlit app with query history and source citation display

## KEY INSIGHT — Chunk Quality Determines Answer Quality

The most impactful improvement to answer quality was not the choice of LLM or the retrieval algorithm — it was the chunk strategy. Naive fixed-size chunking produced answers that were technically correct but lacked context. Structure-aware chunking that preserved section headings and table associations improved answer coherence significantly. The lesson: RAG systems live or die on document preprocessing, not model selection.

## OUTCOMES — Results

The system correctly answered domain-specific queries against the test document corpus. Citation accuracy (correctly identifying the source section) was 89%. The Streamlit interface allowed domain users with no technical background to query the system effectively, validating the UX design.

## WHAT I LEARNED — Internship Application and Beyond

This system was developed during my AI/ML internship at Reliance New Energy, where it was used to enable domain-expert users to query energy datasets without requiring SQL or data engineering knowledge. The experience confirmed that the highest-value AI applications are often the ones that make existing data more accessible, not the ones that generate new content.
