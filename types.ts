
export enum Tier {
  MEMBER = 'Member',
  SILVER = 'Silver',
  GOLD = 'Gold',
  PLATINUM = 'Platinum'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  position: string;
  department: string;
  tier: Tier;
  points: number;
  joinDate: string;
  status: 'Active' | 'On Leave' | 'Terminated';
  email: string;
}

export interface Attachment {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX' | 'IMAGE';
  url: string;
  size: string;
}

export type NewsStatus = 'Draft' | 'Pending' | 'Published' | 'Hidden';

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'News' | 'Policy' | 'Event' | 'Spotlight' | 'Campaign';
  date: string; // Display date
  image: string;
  likes: number;
  comments: number;
  publisher: string; 
  unit: string; 
  isFeatured: boolean;
  campaignName?: string;
  attachments?: Attachment[];
  // Admin Fields
  status?: NewsStatus;
  targetAudience?: 'All' | 'Department' | 'Group';
  scheduledPublishDate?: string;
  scheduledUnpublishDate?: string;
  authorId?: string;
}

export interface Campaign {
  id: string;
  name: string;
  goal: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Upcoming' | 'Ended';
  targetAudience: 'All' | 'Department' | 'Group';
  hashtag?: string;
  banner?: string;
  message?: string;
  linkedNewsCount: number;
  totalViews?: number;
  linkedNewsIds?: string[];
}

export interface Reward {
  id: string;
  name: string;
  description: string;
  pointsCost: number;
  image: string;
  category: 'Voucher' | 'Product' | 'Service';
}

export interface Question {
  id: string;
  text: string;
  type: 'SingleChoice' | 'MultipleChoice' | 'Rating' | 'Text';
  options?: string[];
  required: boolean;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  category: 'Satisfaction' | 'Training' | 'Event' | 'General'; 
  startDate: string;
  endDate: string; 
  status: 'Draft' | 'Open' | 'Closed' | 'Archived'; 
  userStatus?: 'NotStarted' | 'InProgress' | 'Completed'; 
  participants: number;
  durationMinutes: number;
  questionCount: number;
  pointsReward?: number;
  targetType?: 'All' | 'Department' | 'Group' | 'Tier';
  targetValue?: string;
  createdAt?: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'DOCX' | 'XLSX';
  size: string;
  uploadDate: string;
  category: 'Quy trình' | 'Biểu mẫu' | 'Đào tạo';
}

export interface WorkHistory {
  id: string;
  date: string;
  type: 'Promotion' | 'Transfer' | 'NewHire' | 'Adjustment';
  department: string;
  position: string;
  note?: string;
}

export interface Activity {
  id: string;
  name: string;
  date: string;
  type: 'Competition' | 'Survey' | 'Honor';
  result: string;
  score?: string;
}

export interface TierConfig {
  id: string;
  name: string;
  color: string; 
  minPoints: number;
  minSeniorityMonths: number;
  benefits: string[];
  icon?: string;
}

export interface PointProgram {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Scheduled';
  targetAudience: 'All' | 'Department' | 'Tier';
  targetValue?: string; 
  budget: number;
  ruleType: 'Fixed' | 'Percentage';
  pointsValue: number;
  description: string;
}

export interface AppNotification {
  id: string;
  title: string;
  preview: string;
  type: 'General' | 'Urgent' | 'Unit';
  targetType: 'All' | 'Department' | 'Group';
  targetValue?: string;
  scheduledTime: string; // ISO string or 'Now'
  isScheduled: boolean;
  status: 'Draft' | 'Sent' | 'Sending' | 'Error' | 'Scheduled';
  sentCount?: number;
  totalTarget?: number;
  errorLog?: string;
  createdAt: string;
  sender: string;
}