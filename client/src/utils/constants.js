const rawApiUrl = import.meta.env.VITE_API_BASE_URL || '/api';
const sanitizedUrl = rawApiUrl.trim().replace(/\/+$/, '');
export const API_BASE_URL = sanitizedUrl.endsWith('/api') ? sanitizedUrl : `${sanitizedUrl}/api`;

export const RESUME_TEMPLATES = [
  {
    id: 'standard-ats',
    name: 'Modern Full-Stack ATS',
    tier: 'Free Tier',
    description: 'Clean modern software engineering layout with crisp Indigo accents, inline technology tags, and 100% single-column ATS parsing fidelity.',
    badge: 'Free Universal',
    isPremium: false,
  },
  {
    id: 'modern-tech',
    name: 'Tech Specialist',
    tier: 'Pro Subscription',
    description: 'High-density modern technical layout with crisp typography, key-value skills matrix, and explicit technology stack footers.',
    badge: 'Pro Tech',
    isPremium: true,
  },
  {
    id: 'executive-elite',
    name: 'Staff Engineer & Systems Lead',
    tier: 'Pro Subscription',
    description: 'Elite technical leadership & distributed systems layout highlighting technical architecture, core engineering competencies, and business impact.',
    badge: 'Pro Executive',
    isPremium: true,
  },
];

export const INITIAL_RESUME_STATE = {
  title: 'Systems & Backend Engineer Resume',
  templateId: 'standard-ats',
  isDraft: true,
  sections: {
    personalInfo: {
      fullName: 'Jordan Vance',
      jobTitle: 'Senior Systems & Backend Engineer',
      phone: '+1 (555) 382-9104',
      email: 'jordan.vance@example.org',
      location: 'Seattle, WA (Open to Remote)',
      linkedin: 'https://linkedin.com/in/example-jordan-vance',
      portfolio: 'https://jordanvance-systems.example.org',
      github: 'https://github.com/example-jordanvance',
    },
    summary: 'Backend Systems Engineer with 6+ years of experience designing fault-tolerant microservices, high-throughput message streaming architectures, and distributed caching solutions. Proven track record optimizing latency and scaling infrastructure across cloud environments.',
    experience: [
      {
        id: 'exp-1',
        role: 'Senior Backend Infrastructure Engineer',
        company: 'Nexus Distributed Systems',
        location: 'New York, NY (Remote)',
        startDate: 'Jan 2022',
        endDate: 'Present',
        current: true,
        techStack: ['Go', 'Kubernetes', 'Apache Kafka', 'PostgreSQL', 'Docker', 'AWS'],
        bullets: [
          'Engineered event-driven message bus using Apache Kafka and Go, processing 1.2B+ events daily with zero data loss and sub-20ms p99 latency.',
          'Automated Kubernetes cluster provisioning and horizontal pod autoscaling, driving a 28% reduction in annual cloud compute infrastructure costs.',
          'Refactored distributed database queries and connection pooling in PostgreSQL, lifting throughput from 12k to 48k transactions per second.',
        ],
      },
      {
        id: 'exp-2',
        role: 'Software Systems Engineer',
        company: 'Apex Cloud Architectures',
        location: 'Austin, TX (Remote)',
        startDate: 'Jun 2019',
        endDate: 'Dec 2021',
        current: false,
        techStack: ['TypeScript', 'Node.js', 'React', 'Redis', 'Docker', 'PostgreSQL', 'Jest'],
        bullets: [
          'Developed resilient REST and gRPC internal services serving 150,000+ daily enterprise business dashboard requests.',
          'Implemented a multi-tier Redis caching topology that decreased backend database load by 45% during peak traffic bursts.',
          'Authored comprehensive integration and unit test suites reaching 88% branch coverage with automated CI/CD gating.',
        ],
      },
    ],
    projects: [
      {
        id: 'proj-1',
        title: 'Distributed Key-Value Store',
        role: 'Lead Architect & Open Source Author',
        link: 'https://example.org/distributed-kv',
        githubLink: 'https://github.com/example/distributed-kv',
        startDate: 'Mar 2023',
        endDate: 'Aug 2023',
        techStack: ['Go', 'Raft Consensus', 'gRPC', 'Docker', 'Prometheus'],
        bullets: [
          'Designed and implemented an in-memory distributed key-value store implementing Raft consensus for state replication across 5+ cluster nodes.',
          'Achieved 35,000 read ops/sec with linear consistency guarantees and automatic leader election during simulated network partitions.',
        ],
      },
      {
        id: 'proj-2',
        title: 'Real-Time Financial Order Matching Engine',
        role: 'Core Contributor',
        link: 'https://example.org/order-matcher',
        githubLink: 'https://github.com/example/order-matcher',
        startDate: 'Sep 2022',
        endDate: 'Feb 2023',
        techStack: ['C++', 'WebSocket', 'Low-Latency Architecture', 'Redis', 'Google Test'],
        bullets: [
          'Engineered a low-latency price-time priority limit order book capable of processing over 600,000 orders/second in benchmark suites.',
          'Utilized lock-free queues and pre-allocated circular buffers to prevent memory allocation jitter in critical execution paths.',
        ],
      },
    ],
    skills: [
      {
        id: 'skill-1',
        category: 'Programming Languages',
        items: ['Go', 'Python', 'TypeScript', 'C++', 'Java', 'SQL'],
      },
      {
        id: 'skill-2',
        category: 'Backend & Distributed Systems',
        items: ['Kubernetes', 'Docker', 'Apache Kafka', 'gRPC', 'Microservices', 'RESTful APIs'],
      },
      {
        id: 'skill-3',
        category: 'Databases & Storage',
        items: ['PostgreSQL', 'Redis', 'DynamoDB', 'MongoDB', 'Elasticsearch'],
      },
      {
        id: 'skill-4',
        category: 'Cloud & DevOps',
        items: ['AWS (ECS, S3, RDS)', 'Terraform', 'CI/CD Pipelines', 'Linux', 'Prometheus', 'Grafana'],
      },
      {
        id: 'skill-5',
        category: 'Core Competencies',
        items: ['System Architecture', 'High Availability Design', 'Agile & Scrum', 'Technical Leadership'],
      },
    ],
    education: [
      {
        id: 'edu-1',
        institution: 'Metropolitan University of Technology',
        degree: 'Bachelor of Science in Computer Science & Engineering',
        fieldOfStudy: 'Computer Science',
        location: 'Boston, MA',
        startDate: 'Aug 2015',
        endDate: 'May 2019',
        gpa: '3.85 / 4.0',
      },
    ],
    certifications: [
      {
        id: 'cert-1',
        name: 'Certified Kubernetes Administrator (CKA)',
        issuer: 'Cloud Native Computing Foundation',
        issueDate: '2023',
      },
      {
        id: 'cert-2',
        name: 'AWS Certified Solutions Architect – Professional',
        issuer: 'Amazon Web Services',
        issueDate: '2022',
      },
    ],
  },
};
