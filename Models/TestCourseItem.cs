using System;
using System.Collections.Generic;

namespace Learnify.Models
{
    public class TestCourseItem: CourseItem
    {
        public List<QuizEntry> quizEntries;

        public TestCourseItem(String courseId, List<QuizEntry> quizEntries) : base(courseId, CourseItem.ItemType.TEST) {
            this.quizEntries = quizEntries;
            this.Length = "";
            this.Description = "";
        }
    }
}