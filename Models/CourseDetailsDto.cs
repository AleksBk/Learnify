using System.Collections.Generic;

namespace Learnify.Models
{
    public class CourseDetailsDto 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Length { get; set; }
        public string Type { get; set; }
        public string PictureUrl { get; set; }

        public List<CourseItem> Contents { get; set; }
    }
}