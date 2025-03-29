
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Award, BookOpen, CheckCircle, FileText } from 'lucide-react';

const Assessments = () => {
  const { user } = useAuth();
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  
  const classes = [
    { id: 'class1', name: 'Class 6A' },
    { id: 'class2', name: 'Class 7B' },
    { id: 'class3', name: 'Class 8C' },
  ];
  
  const subjects = [
    { id: 'sub1', name: 'Mathematics' },
    { id: 'sub2', name: 'Science' },
    { id: 'sub3', name: 'English' },
    { id: 'sub4', name: 'Social Studies' }
  ];
  
  const students = [
    { id: '1', name: 'Alice Johnson', marks: { sub1: 92, sub2: 88, sub3: 78, sub4: 85 } },
    { id: '2', name: 'Bob Smith', marks: { sub1: 75, sub2: 82, sub3: 90, sub4: 77 } },
    { id: '3', name: 'Charlie Brown', marks: { sub1: 88, sub2: 91, sub3: 85, sub4: 92 } },
    { id: '4', name: 'Diana Prince', marks: { sub1: 95, sub2: 89, sub3: 92, sub4: 88 } },
    { id: '5', name: 'Ethan Hunt', marks: { sub1: 78, sub2: 80, sub3: 76, sub4: 82 } },
  ];
  
  const assessments = [
    { id: 'assess1', name: 'First Term Exam', subject: 'sub1', maxMarks: 100, weightage: 40 },
    { id: 'assess2', name: 'Mid Term Project', subject: 'sub1', maxMarks: 50, weightage: 20 },
    { id: 'assess3', name: 'Class Test', subject: 'sub1', maxMarks: 25, weightage: 10 },
    { id: 'assess4', name: 'Final Exam', subject: 'sub1', maxMarks: 100, weightage: 30 },
  ];

  const studentAssessments = [
    { id: 'mark1', assessmentId: 'assess1', studentId: '1', marks: 85 },
    { id: 'mark2', assessmentId: 'assess2', studentId: '1', marks: 42 },
    { id: 'mark3', assessmentId: 'assess3', studentId: '1', marks: 22 },
    { id: 'mark4', assessmentId: 'assess4', studentId: '1', marks: 90 },
  ];

  const handleSaveMarks = () => {
    console.log('Saving marks for class:', selectedClass, 'subject:', selectedSubject);
    // In real app, this would send data to the backend
  };

  const renderTeacherView = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select class..." />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Select Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedClass && selectedSubject && (
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Enter Student Marks</CardTitle>
              <CardDescription>
                Assessment: First Term Exam (Max Marks: 100)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>Marks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>
                        <Input 
                          type="number" 
                          min="0" 
                          max="100" 
                          defaultValue={student.marks[selectedSubject as keyof typeof student.marks]}
                          className="w-24"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-end">
                <Button onClick={handleSaveMarks}>Save Marks</Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderStudentView = () => {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Overall Grade</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">A</div>
              <p className="text-xs text-muted-foreground">
                Class Rank: 3
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">87.5%</div>
              <p className="text-xs text-muted-foreground">
                Across all subjects
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                Completed this term
              </p>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Subject Performance</CardTitle>
            <CardDescription>Your marks across different subjects</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Subject</TableHead>
                  <TableHead>Marks</TableHead>
                  <TableHead>Grade</TableHead>
                  <TableHead>Remarks</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => {
                  const marks = students[0].marks[subject.id as keyof typeof students[0].marks];
                  let grade = 'A';
                  if (marks < 60) grade = 'F';
                  else if (marks < 70) grade = 'D';
                  else if (marks < 80) grade = 'C';
                  else if (marks < 90) grade = 'B';
                  
                  let remarks = 'Needs Improvement';
                  if (marks >= 90) remarks = 'Excellent';
                  else if (marks >= 80) remarks = 'Very Good';
                  else if (marks >= 70) remarks = 'Good';
                  else if (marks >= 60) remarks = 'Satisfactory';
                  
                  return (
                    <TableRow key={subject.id}>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{marks}/100</TableCell>
                      <TableCell>{grade}</TableCell>
                      <TableCell>{remarks}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Assessment Details</CardTitle>
            <CardDescription>Breakdown of your performance in Mathematics</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment</TableHead>
                  <TableHead>Max Marks</TableHead>
                  <TableHead>Your Marks</TableHead>
                  <TableHead>Weightage</TableHead>
                  <TableHead>Weighted Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {assessments.map((assessment, index) => {
                  const studentMark = studentAssessments[index]?.marks || 0;
                  const weightedScore = (studentMark / assessment.maxMarks) * assessment.weightage;
                  
                  return (
                    <TableRow key={assessment.id}>
                      <TableCell>{assessment.name}</TableCell>
                      <TableCell>{assessment.maxMarks}</TableCell>
                      <TableCell>{studentMark}</TableCell>
                      <TableCell>{assessment.weightage}%</TableCell>
                      <TableCell>{weightedScore.toFixed(2)}</TableCell>
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell colSpan={3}></TableCell>
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="font-bold">
                    {studentAssessments.reduce((total, sa, index) => {
                      const assessment = assessments[index];
                      return total + ((sa.marks / assessment.maxMarks) * assessment.weightage);
                    }, 0).toFixed(2)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAdminView = () => {
    return (
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Select Class</label>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue placeholder="Select class..." />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="w-full sm:w-1/3">
            <label className="block text-sm font-medium mb-1">Select Subject</label>
            <Select value={selectedSubject} onValueChange={setSelectedSubject}>
              <SelectTrigger>
                <SelectValue placeholder="Select subject..." />
              </SelectTrigger>
              <SelectContent>
                {subjects.map(subject => (
                  <SelectItem key={subject.id} value={subject.id}>
                    {subject.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Class Average</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">82.4%</div>
              <p className="text-xs text-muted-foreground">
                Across all subjects
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Scorer</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Diana Prince</div>
              <p className="text-xs text-muted-foreground">
                Average: 91%
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assessments</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                This academic term
              </p>
            </CardContent>
          </Card>
        </div>

        {selectedClass && selectedSubject && (
          <Card>
            <CardHeader>
              <CardTitle>Class Performance</CardTitle>
              <CardDescription>
                {classes.find(c => c.id === selectedClass)?.name} - {subjects.find(s => s.id === selectedSubject)?.name}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student Name</TableHead>
                    <TableHead>First Term</TableHead>
                    <TableHead>Mid Term</TableHead>
                    <TableHead>Class Test</TableHead>
                    <TableHead>Final Exam</TableHead>
                    <TableHead>Overall</TableHead>
                    <TableHead>Grade</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => {
                    const subjectMarks = student.marks[selectedSubject as keyof typeof student.marks];
                    let grade = 'A';
                    if (subjectMarks < 60) grade = 'F';
                    else if (subjectMarks < 70) grade = 'D';
                    else if (subjectMarks < 80) grade = 'C';
                    else if (subjectMarks < 90) grade = 'B';
                    
                    return (
                      <TableRow key={student.id}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell>85</TableCell>
                        <TableCell>42</TableCell>
                        <TableCell>22</TableCell>
                        <TableCell>90</TableCell>
                        <TableCell>{subjectMarks}%</TableCell>
                        <TableCell>{grade}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Assessments & Marks</h1>
        <p className="text-muted-foreground">
          Manage and view student assessment results.
        </p>
      </div>

      {user?.role === 'teacher' && renderTeacherView()}
      {user?.role === 'student' && renderStudentView()}
      {(user?.role === 'super_admin' || user?.role === 'school_admin') && renderAdminView()}
    </div>
  );
};

export default Assessments;
