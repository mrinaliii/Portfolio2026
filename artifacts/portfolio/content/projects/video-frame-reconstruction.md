---
githubUrl: https://github.com/mrinaliii/Video_Reconstruction
slug: video-frame-reconstruction
title: Video Frame Reconstruction
subtitle: Graph-Based Frame Sequencing
year: 2025
category: Computer Vision
status: Completed
shortDescription: Reconstructs shuffled video frames using graph optimization and minimum spanning tree algorithms, leveraging OpenCV and parallel processing for efficient, scalable frame sequencing.
description: Reconstructed shuffled video frames using graph optimization and minimum spanning tree algorithms. Leveraged OpenCV and parallel processing to improve frame sequencing efficiency and scalability, and evaluated reconstruction accuracy through similarity scoring and automated performance benchmarking.
duration: 1 month
role: Solo Engineer
coverSrc: /projects/video-frame-reconstruction/cover.jpg
technologies:
  - name: Python
    tooltip: Primary language
  - name: OpenCV
    tooltip: Frame extraction, similarity scoring, and video I/O
  - name: NumPy
    tooltip: Numerical operations over frame feature vectors
  - name: "Graph (MST)"
    tooltip: Minimum spanning tree used to reconstruct optimal frame order
  - name: Parallel Computing
    tooltip: Parallelized similarity computation for scalability
---
githubUrl: https://github.com/mrinaliii/Video_Reconstruction

## PROJECT OVERVIEW: Putting the Story Back in Order

Given a set of video frames shuffled out of sequence, this project reconstructs the original temporal order without any timestamp metadata - relying purely on visual similarity between frames to infer what came before and after.

## TECHNICAL APPROACH: Similarity as a Graph Problem

Each frame is treated as a node in a graph, with edge weights derived from pairwise visual similarity (computed via OpenCV feature comparisons). Reconstructing the sequence then becomes a minimum spanning tree problem - finding the path through the graph that minimizes total transition "distance" between consecutive frames, which closely approximates the original frame order.

## PERFORMANCE: Scaling Similarity Computation

Pairwise similarity computation is the bottleneck for longer sequences, since it grows quadratically with frame count. Parallelizing the similarity matrix computation across available cores brought reconstruction time for longer sequences down to a practical range, and automated benchmarking was used to validate both accuracy and throughput as frame counts scaled up.

## WHAT I LEARNED: Classical Algorithms Still Win

It would have been easy to reach for a deep learning approach here, but a classical graph algorithm - applied to the right similarity metric - solved the problem accurately and far more efficiently. The lesson: matching the algorithm to the actual structure of the problem often beats defaulting to the most sophisticated tool available.
