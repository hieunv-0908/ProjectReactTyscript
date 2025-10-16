import React, { useEffect, useMemo } from "react";
import { Tabs, Spin } from "antd";
import CourseCard from "./CourseCard";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store/store";
import { fetchSubject } from "../../../redux/feature/subject/subjectSlice";
import { fetLesson } from "../../../redux/feature/lesson/lessonSlice";

interface CourseTabsProps {
  searchTerm: string;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ searchTerm }) => {
  const dispatch = useDispatch<AppDispatch>();

  const { subjects, loading: subjectLoading } = useSelector(
    (state: RootState) => state.subject
  );
  const { data: lessons, loading: lessonLoading } = useSelector(
    (state: RootState) => state.lesson
  );

  useEffect(() => {
    dispatch(fetchSubject());
    dispatch(fetLesson());
  }, [dispatch]);

  const courses = useMemo(() => {
    return subjects.map((subject) => {
      const subjectLessons = lessons
        .filter((lesson) => String(lesson.subject_id) === String(subject.id))
        .map((lesson) => lesson.lesson_name);

      return {
        title: subject.subject_name,
        sessions: subjectLessons,
      };
    });
  }, [subjects, lessons]);

  // ✅ Lọc theo searchTerm (không phân biệt hoa thường)
  const filteredCourses = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return courses;
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(term) ||
        course.sessions.some((s) => s.toLowerCase().includes(term))
    );
  }, [courses, searchTerm]);

  if (subjectLoading || lessonLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Spin tip="Đang tải dữ liệu..." />
      </div>
    );
  }

  const tabItems = [
    {
      key: "1",
      label: "Tất cả môn học",
      children: (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "16px",
            padding: "16px",
          }}
        >
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course, index) => (
              <CourseCard key={index} {...course} />
            ))
          ) : (
            <p>Không tìm thấy kết quả nào.</p>
          )}
        </div>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} />;
};

export default CourseTabs;
