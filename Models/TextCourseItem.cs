using System;

namespace Learnify.Models
{
    public class TextCourseItem: CourseItem
    {
        public string article { get; set; }
        
        public TextCourseItem(String courseId, string article) : base(courseId, CourseItem.ItemType.TEXT) {
            this.article = article;
        }
    }
}