export class ClassModel {
  className: string;
  courseCode: string;
  courseDescription: string;
  number: number;
  subject: string;
  section: string;
  semester: string;
  classId: number;
  classTimes: string;
  days: string;
  isInSchedule: boolean;

  constructor(data: any) {
    this.className = data.className || '';
    this.courseCode = data.courseCode || '';
    this.courseDescription = data.courseDescription || '';
    this.number = data.number || 0;
    this.subject = data.subject || '';
    this.section = data.section || '';
    this.semester = data.semester || '';
    this.classId = data.classId || -1;
    this.classTimes = data.classTimes || '';
    this.days = data.days || '';
    this.isInSchedule = data.isInSchedule || false;
  }
}