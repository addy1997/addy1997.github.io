export type SkillLevel  = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
export type TechClass   = 'Core' | 'Supporting' | 'Emerging';

export interface Skill {
  name: string;
  level: SkillLevel;
  techClass: TechClass;
}

export interface SkillCategory {
  id: string;
  category: string;
  skills: Skill[];
}

export interface ExperienceBullet {
  label: string;
  detail: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  websiteUrl: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  bullets: ExperienceBullet[];
  skills: string[];
}

export type ProjectCategory = 'Robotics' | 'Machine Learning' | 'Agentic AI';

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  category: ProjectCategory;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  event?: string;
  date?: string;
  location?: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: 'github' | 'linkedin' | 'email' | 'twitter' | 'medium' | 'website';
}

export interface Profile {
  name: string;
  title: string;
  bio: string;
  avatarUrl: string;
  location: string;
  email: string;
  about: string[];
  highlights: string[];
  social: SocialLink[];
  experience: ExperienceItem[];
  skillCategories: SkillCategory[];
  projects: ProjectItem[];
}

export const profile: Profile = {
  name: 'Adwait Naik',
  title: 'Robotics, Computer Vision, Agentic AI',
  bio: 'An experienced software engineer with a passion for building scalable and efficient AI-driven systems that solve real-world problems.',
  avatarUrl: '/assets/profile_adwait.jpg',
  location: 'London, UK',
  email: 'adwaitnaik27@gmail.com',
  highlights: [
    'London, UK',
    '4+ years in Robotics & Autonomy',
    'Computer Vision · Agentic AI',
  ],
  social: [
    { label: 'GitHub',      href: 'https://github.com/addy1997',                         icon: 'github'   },
    { label: 'LinkedIn',    href: 'https://www.linkedin.com/in/anaik97',                  icon: 'linkedin' },
    { label: 'X (Twitter)', href: 'https://x.com/adwaitnaik97',                          icon: 'twitter'  },
    { label: 'Medium',      href: 'https://medium.com/@adwaitnaik2',                      icon: 'medium'   },
    { label: 'Email',       href: 'mailto:adwaitnaik27@gmail.com',                        icon: 'email'    },
  ],

  about: [
    "Originally from Pune, a city nestled near the foothills of the Western Ghats, in India, I began my academic journey in Mumbai, where I earned a Bachelor's degree in Electronics Engineering from the University of Mumbai in 2019. Driven by a growing interest in intelligent systems and emerging technologies, I moved to Glasgow to pursue a Master's degree in Robotics and Artificial Intelligence at the University of Glasgow, graduating in 2022.",
    "Since then, I have worked across VR/AR, Robotics, Autonomy, and AI-driven software systems, including serving as a KTP Associate (Software Engineer) on a UKRI-funded innovation project. Currently based in London, I work as an Autonomy Engineer at a startup, focusing on vehicle safety, perception systems, and computer vision technologies for next-generation autonomous platforms.",
  ],

  experience: [
    {
      id: 'auriga',
      company: 'Auriga AI Ltd.',
      websiteUrl: 'https://auriga.xyz/',
      role: 'Autonomy Engineer',
      location: 'London, UK',
      startDate: 'Jul 2025',
      endDate: 'Present',
      bullets: [
        {
          label: 'Perception Systems',
          detail: 'Architected a real-time 3D multi-object tracking pipeline for autonomous vehicles, integrating lane detection and Euclidean clustering; reduced end-to-end inference latency by 10–20%.',
        },
        {
          label: 'System Diagnostics',
          detail: 'Designed a robust diagnostics platform with failure detection, sensor health validation, and temporal consistency checks for LiDAR and camera-based perception stacks.',
        },
        {
          label: 'CI/CD & Deployment',
          detail: 'Built a CI/CD pipeline for autonomy and perception modules using GitHub Actions and CMake, targeting ROS2-based systems for reproducible, containerised deployments.',
        },
      ],
      skills: ['C++', 'ROS2', 'OpenCV', 'PyTorch', 'Docker', 'MongoDB'],
    },
    {
      id: 'aidrivers',
      company: 'Aidrivers Ltd.',
      websiteUrl: 'https://www.linkedin.com/company/aidriversltd/posts/?feedView=all',
      role: 'Autonomy Engineer',
      location: 'London, UK',
      startDate: 'Dec 2024',
      endDate: 'May 2025',
      bullets: [
        {
          label: 'Autonomy Platform Support',
          detail: 'Contributed to the development and integration of autonomy stack components for an on-board prime mover autonomous vehicle platform operating in logistics environments.',
        },
        {
          label: 'Sensor Diagnostics',
          detail: 'Developed runtime diagnostics for on-board sensors — cameras, LiDARs, and IMUs — monitoring data availability, frame rates, and behavioural anomalies for safe operation.',
        },
      ],
      skills: ['C++', 'ROS', 'OpenCV', 'PyTorch', 'Docker', 'MongoDB'],
    },
    {
      id: 'ecom',
      company: 'eCom Learning Solutions',
      websiteUrl: 'https://www.ecomlearningsolutions.com/',
      role: 'Software Engineer — Robotics Systems',
      location: 'Glasgow, UK',
      startDate: 'Nov 2022',
      endDate: 'Nov 2024',
      bullets: [
        {
          label: 'Robotic Teleoperation',
          detail: 'Developed an Innovate UK-funded VR-based teleoperation system for the Franka Emika robotic arm, implementing real-time control loops with sub-20 ms end-to-end latency.',
        },
        {
          label: 'Digital Twin & Cloud',
          detail: 'Built digital twin simulations using Azure Digital Twins and Three.js; implemented low-latency telemetry pipelines via Azure IoT Hub and SignalR for live robot state visualisation.',
        },
      ],
      skills: ['C++', 'Python', 'C#', 'JavaScript', 'TypeScript', 'Azure', 'Blender'],
    },
    {
      id: 'flox',
      company: 'FLOX Intelligence',
      websiteUrl: 'https://floxintelligence.com/',
      role: 'Software Developer — Simulation & Perception',
      location: 'Pune, India',
      startDate: 'Jan 2021',
      endDate: 'Jun 2021',
      bullets: [
        {
          label: 'Robotic Simulation',
          detail: 'Developed Ignition Gazebo system plugins to accurately model drone flight dynamics and sensor–environment interactions for simulation-to-real transfer research.',
        },
        {
          label: 'UAV Perception',
          detail: 'Integrated YOLO-based thermal object detection pipelines for UAVs, enabling autonomous target detection in low-visibility and GPS-denied conditions.',
        },
      ],
      skills: ['C++', 'Python', 'ROS', 'PyTorch', 'TensorFlow', 'Blender'],
    },
  ],

  skillCategories: [
    {
      id: 'languages',
      category: 'Programming Languages',
      skills: [
        { name: 'C++ 11/14/17/20', level: 'Intermediate', techClass: 'Core' },
        { name: 'Python',          level: 'Intermediate', techClass: 'Core' },
        { name: 'C#',              level: 'Beginner',     techClass: 'Supporting' },
        { name: 'JavaScript',      level: 'Beginner',     techClass: 'Supporting' },
        { name: 'TypeScript',      level: 'Beginner',     techClass: 'Supporting' },
      ],
    },
    {
      id: 'web',
      category: 'Web Technologies',
      skills: [
        { name: 'React',   level: 'Beginner', techClass: 'Emerging' },
        { name: 'Node.js', level: 'Beginner', techClass: 'Emerging' },
      ],
    },
    {
      id: 'devops',
      category: 'DevOps & Cloud',
      skills: [
        { name: 'Microsoft Azure', level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Docker',          level: 'Intermediate', techClass: 'Core' },
        { name: 'AWS',             level: 'Beginner',     techClass: 'Emerging' },
        { name: 'GitHub CI/CD',    level: 'Beginner',     techClass: 'Supporting' },
      ],
    },
    {
      id: 'ml',
      category: 'Machine Learning',
      skills: [
        { name: 'PyTorch',    level: 'Intermediate', techClass: 'Core' },
        { name: 'NumPy',      level: 'Intermediate', techClass: 'Supporting' },
        { name: 'SciPy',      level: 'Intermediate', techClass: 'Supporting' },
        { name: 'TensorFlow', level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Keras',      level: 'Intermediate', techClass: 'Supporting' },
        { name: 'OpenCV',     level: 'Intermediate', techClass: 'Core' },
        { name: 'Matplotlib', level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Plotly',     level: 'Beginner',     techClass: 'Emerging' },
        { name: 'LaTeX',      level: 'Intermediate', techClass: 'Supporting' },
      ],
    },
    {
      id: 'robotics',
      category: 'Robotics',
      skills: [
        { name: 'ROS / ROS2', level: 'Intermediate', techClass: 'Core' },
        { name: 'Gazebo',     level: 'Intermediate', techClass: 'Supporting' },
      ],
    },
    {
      id: 'agentic',
      category: 'Agentic AI',
      skills: [
        { name: 'LangChain', level: 'Beginner', techClass: 'Emerging' },
        { name: 'LangGraph', level: 'Beginner', techClass: 'Emerging' },
      ],
    },
    {
      id: 'system_design',
      category: 'System Design',
      skills: [
        { name: 'Scalable Software Architecture',          level: 'Intermediate', techClass: 'Core' },
        { name: 'Design Patterns',                         level: 'Intermediate', techClass: 'Core' },
        { name: 'Safety-Critical System Design',           level: 'Intermediate', techClass: 'Core' },
        { name: 'Event-Driven Architecture',               level: 'Intermediate', techClass: 'Supporting' },
        { name: 'API Design & Integration',                level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Exception Handling & Recovery',           level: 'Intermediate', techClass: 'Supporting' },
      ],
    },
    {
      id: 'communication',
      category: 'Communication',
      skills: [
        { name: 'Technical Documentation',     level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Presentations & Demos',       level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Scientific Academic Writing', level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Collaborative Problem Solving', level: 'Intermediate', techClass: 'Supporting' },
      ],
    },
    {
      id: 'project_mgmt',
      category: 'Project Management',
      skills: [
        { name: 'Agile & Scrum',                      level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Kanban Boards',                       level: 'Beginner',     techClass: 'Supporting' },
        { name: 'Task Prioritization',                 level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Cross-Functional Collaboration',      level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Project Documentation',               level: 'Intermediate', techClass: 'Supporting' },
        { name: 'Risk Assessment & Issue Tracking',    level: 'Beginner',     techClass: 'Supporting' },
      ],
    },
  ],

  projects: [
    {
      id: 'sharp-nerf',
      title: 'Sharp-NeRF: Defocus & Motion Blur Removal in Neural Radiance Fields',
      description:
        "Master's thesis project — a PyTorch implementation of neural radiance field rendering with defocus and motion blur removal for real-world scenes. Built on top of Deblur-NeRF (arXiv:2111.14292), the system learns to synthesise sharp novel views from blurry input images by modelling blur as a physical process within the NeRF training pipeline.",
      category: 'Machine Learning',
      techStack: ['Python', 'PyTorch', 'NeRF', 'NumPy', 'Matplotlib'],
      githubUrl: 'https://github.com/addy1997/Sharp-NeRF',
      date: '2022',
    },
    {
      id: 'procurement-agent',
      title: 'Procurement Supervisor Agent',
      description:
        "A serverless AI procurement orchestration system deployed on AWS Lambda. A central supervisor agent parses procurement queries into structured intents, routes tasks to four specialised sub-agents — Supplier Discovery, Compliance Validation, Inventory Orchestration, and Contract Negotiation — then synthesises results using NumPy and Pydantic, with automatic retry loops until objectives are met. Supplier matching uses MongoDB Atlas vector search with Voyage AI embeddings; LLM inference runs on Groq's Llama 3.3 70B.",
      category: 'Agentic AI',
      techStack: ['Python', 'LangGraph', 'AWS Lambda', 'Groq', 'Voyage AI', 'MongoDB Atlas', 'API Gateway', 'S3'],
      githubUrl: 'https://github.com/addy1997/procurement-agent',
      event: 'The Agentic Evolution Hackathon',
      date: 'May 2026',
      location: 'London, UK',
    },
    {
      id: 'rentshield-pro',
      title: 'RentShield Pro',
      description:
        "An AI-powered Progressive Web App that helps UK tenants understand their rights under the Renters’ Rights Act 2026. Features AI-driven contract analysis, hazard detection, EPC rating analysis, rent-increase review, dispute letter generation, and landlord-speak translation — all powered by Google Gemini and running entirely client-side with no backend required.",
      category: 'Agentic AI',
      techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Gemini API', 'PWA'],
      githubUrl: 'https://github.com/addy1997/rentshield_pro',
      event: 'Granola × DeepMind Hackathon',
      date: 'February 2026',
      location: 'London, UK',
    },
  ],
};
