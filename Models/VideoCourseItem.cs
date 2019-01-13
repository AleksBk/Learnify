using System;

namespace Learnify.Models
{
    public class VideoCourseItem: CourseItem
    {
        public string url { get; set; }

        public VideoCourseItem(String courseId, string url) : base(courseId, CourseItem.ItemType.VIDEO) {
            this.url = url;
        }
    }
}