import { Project, BlogPost } from './types';

export const PROFILE = {
  name: "Saidi Hamisi",
  role: "Senior Backend Engineer",
  location: "Remote / Global",
  bio: "Architecting scalable systems, optimizing database queries, and building robust APIs. I speak JSON, SQL, and Go.",
  status: "Online",
  uptime: "99.99%",
  email: "saidi.hamisi@example.com",
  socials: {
    github: "github.com/saidihamisi",
    linkedin: "linkedin.com/in/saidihamisi",
    twitter: "@saidi_backend"
  }
};

export const SKILLS = [
  "Go (Golang)", "Node.js", "Python", "PostgreSQL", "Redis", "Docker", "Kubernetes", "AWS", "gRPC", "GraphQL"
];

export const PROJECTS: Project[] = [
  {
    id: "p1",
    name: "Distributed Cache System",
    description: "A high-performance, distributed caching mechanism inspired by Redis, built with Go. Features include consistent hashing and replication.",
    techStack: ["Go", "gRPC", "Protobuf", "Raft Consensus"],
    repoUrl: "#",
    stats: [
      { label: "Latency", value: "< 2ms" },
      { label: "Throughput", value: "10k RPS" }
    ]
  },
  {
    id: "p2",
    name: "E-Commerce Microservices",
    description: "Full-scale microservice architecture for a high-traffic e-commerce platform. Handles order processing, inventory, and payments.",
    techStack: ["Node.js", "Express", "RabbitMQ", "MongoDB", "Docker"],
    repoUrl: "#",
    stats: [
      { label: "Services", value: "12" },
      { label: "Uptime", value: "99.9%" }
    ]
  },
  {
    id: "p3",
    name: "Log Aggregator API",
    description: "Centralized logging service that ingests terabytes of log data, indexes it, and provides a queryable API for analysis.",
    techStack: ["Rust", "ClickHouse", "Kafka", "Actix"],
    repoUrl: "#",
    stats: [
      { label: "Ingestion", value: "50GB/day" }
    ]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: "b1",
    title: "Optimizing SQL Queries for Scale",
    date: "2024-05-12",
    readTime: "8 min read",
    tags: ["Database", "SQL", "Performance"],
    excerpt: "Why your indexing strategy is failing you, and how to fix it before production goes down.",
    content: `
## The Problem with Default Indexing

Most developers learn to add indexes to columns they query often. However, composite indexes are where the real power lies...

### Understanding B-Trees

When we talk about SQL performance, we have to talk about data structures.
    `
  },
  {
    id: "b2",
    title: "Why I switched from REST to gRPC",
    date: "2024-04-03",
    readTime: "6 min read",
    tags: ["API", "gRPC", "Architecture"],
    excerpt: "Protocol Buffers offer schema validation and performance benefits that JSON simply cannot match.",
    content: "Content placeholder..."
  },
  {
    id: "b3",
    title: "Understanding Eventual Consistency",
    date: "2024-03-15",
    readTime: "10 min read",
    tags: ["Distributed Systems", "Theory"],
    excerpt: "In distributed systems, we often trade consistency for availability. Here is what that actually means for your data.",
    content: "Content placeholder..."
  }
];
