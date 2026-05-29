/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Quote {
  id: string;
  text: string;
  author: string;
  translation?: string; // For Hindi/Urdu to English translation
  category: 'motivation' | 'coding' | 'shayari' | 'sufi';
  moodColor: string; // Tailwind class description
}

export interface Topic {
  title: string;
  summary: string;
  content: string;
  codeExample?: string;
  codeLanguage?: string;
}

export interface BCASubject {
  id: string;
  title: string;
  iconName: string; // Lucide icon reference name
  description: string;
  topics: Topic[];
}

export interface StudyTask {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface ReviewFlashcard {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface SnakeSegment {
  x: number;
  y: number;
}

export interface CommitBerry {
  x: number;
  y: number;
  value: number; // 1 to 4 depth of green on GitHub
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  tech: string[];
  features: string[];
  liveUrl?: string;
  type: string;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
