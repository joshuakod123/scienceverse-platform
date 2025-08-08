// server/models/Lesson.js
const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  subtitle: {
    type: String,
    required: [true, 'Please add a subtitle'],
    trim: true,
    maxlength: [200, 'Subtitle cannot be more than 200 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  // 새로 추가된 필드: 강의 본문 콘텐츠
  content: {
    type: String,
    required: [true, 'Please add lesson content'],
    // HTML 또는 Markdown 형식의 긴 텍스트 지원
  },
  // 새로 추가된 필드: 애니메이션 컴포넌트 이름 배열
  animationComponents: [{
    type: String,
    trim: true
    // 예시: ['GoodnessOfFitTest', 'HistogramSlider', 'MeanVsMedian']
  }],
  courseId: {
    type: String,
    required: [true, 'Please specify course ID'],
    enum: ['ap-physics-1', 'ap-physics-2', 'ap-physics-c-mechanics', 'ap-physics-c-em', 
           'ap-calculus-ab', 'ap-calculus-bc', 'ap-statistics', 'ap-chemistry', 'ap-biology']
  },
  unitNumber: {
    type: Number,
    required: [true, 'Please specify unit number'],
    min: 1,
    max: 20
  },
  lessonNumber: {
    type: Number,
    required: [true, 'Please specify lesson number within unit'],
    min: 1
  },
  duration: {
    type: Number,
    required: [true, 'Please add duration in minutes']
  },
  imageUrl: {
    type: String,
    default: 'default-lesson.jpg'
  },
  author: {
    type: String,
    required: [true, 'Please add an author']
  },
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'Physics',
      'Chemistry',
      'Biology',
      'Mathematics',
      'Statistics',
      'Computer Science'
    ]
  },
  level: {
    type: String,
    required: [true, 'Please specify a difficulty level'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'AP']
  },
  // 기존 sections 필드 유지 (선택적 사용)
  sections: [{
    title: {
      type: String,
      required: true
    },
    content: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    quizzes: [{
      question: {
        type: String
      },
      options: [{
        type: String
      }],
      correctAnswer: {
        type: Number
      }
    }]
  }],
  prerequisites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Lesson'
  }],
  listeners: {
    type: Number,
    default: 0
  },
  tags: [String],
  // 유료 콘텐츠 관련 필드
  isPremium: {
    type: Boolean,
    default: false
  },
  price: {
    type: Number,
    default: 0
  },
  slug: {
    type: String,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Create a slug from the title and course
LessonSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  
  if (!this.isModified('title') && !this.isModified('courseId')) {
    next();
    return;
  }
  
  // 과목-유닛-레슨 형식의 고유한 slug 생성
  this.slug = `${this.courseId}-unit${this.unitNumber}-lesson${this.lessonNumber}-${this.title
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')}`;
  
  next();
});

// 인덱스 추가 (빠른 조회를 위해)
LessonSchema.index({ courseId: 1, unitNumber: 1, lessonNumber: 1 });
LessonSchema.index({ courseId: 1, unitNumber: 1 });

module.exports = mongoose.model('Lesson', LessonSchema);