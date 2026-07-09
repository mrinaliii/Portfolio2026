---
slug: skillforge
title: SkillForge
subtitle: Cloud-Native Skill Analytics
year: 2024
category: CLOUD
status: Completed
shortDescription: A scalable AWS-based serverless architecture that processes distributed data through secure ingestion pipelines while maintaining reliable validation across asynchronous workflows.
description: Designed a scalable AWS-based serverless architecture that processes distributed data through secure ingestion pipelines while maintaining reliable validation across asynchronous workflows.
duration: 2 months
role: Solo Engineer
technologies:
  - name: AWS Lambda
    tooltip: Serverless compute — event-driven processing
  - name: Amazon ECS
    tooltip: Container orchestration for longer-running workloads
  - name: DynamoDB
    tooltip: NoSQL database for high-throughput writes
  - name: API Gateway
    tooltip: Managed API endpoint with auth
  - name: SQS
    tooltip: Async message queue for decoupled processing
  - name: Python
    tooltip: Lambda function runtime
---

## PROJECT OVERVIEW — Serverless at the Architecture Level

SkillForge explores how to design a fully serverless data processing pipeline on AWS — from ingestion through validation to storage — that scales elastically without any managed server infrastructure. The focus was architectural rather than feature-driven: every design decision had to justify itself against cost, latency, and operational complexity.

## ARCHITECTURE — The Event-Driven Pipeline

- API Gateway — authenticated entry point, rate-limited, request validation at the edge
- Lambda (Ingestion) — lightweight event consumers that normalize incoming payloads
- SQS — decouples ingestion from processing, provides retry and DLQ semantics
- Lambda (Validation) — business logic validation with explicit error routing
- ECS (Long-running jobs) — batch processing workloads that exceed Lambda's 15-minute limit
- DynamoDB — high-throughput writes with conditional expressions to prevent race conditions

## KEY CHALLENGES — Managing Asynchronous Reliability

Distributed async systems fail in non-obvious ways. The hardest problem was ensuring that a validation failure in the processing Lambda correctly prevented the write to DynamoDB and triggered an appropriate dead-letter queue event — without losing the original message. The solution required explicit idempotency keys on every DynamoDB write and careful SQS visibility timeout tuning.

## WHAT I LEARNED — Architecture Is Constraint Design

The most important lesson from this project was that a good serverless architecture is primarily about constraint design — choosing what the system is NOT allowed to do. Long-running synchronous operations get ECS, not Lambda. State lives in DynamoDB, never in Lambda memory. Failure modes are handled at the queue level, not in code. These constraints, applied consistently, produce a system that is boring to operate — which is the goal.
