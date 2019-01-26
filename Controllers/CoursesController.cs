using Learnify.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;
using System;

namespace Learnify.Controllers
{
    [Route("api/[controller]")]
    public class CoursesController
    {
        [HttpGet("{id}")]
        public async Task<CourseDetailsDto> Get(int id)
        {
            await Task.Delay(500);
            return courses[id];
            // return new CourseDetailsDto()
            // {
            //     Id = id,
            //     Name = "Example Course",
            //     Length = "2h 10m 45s",
            //     Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            //     Contents = new List<CourseItem>() {
            //         new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
            //             Name = "Introduction",
            //             Description = "Test",
            //             Length = "1:00"
            //         },
            //         new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
            //             Name = "Mathematical Base",
            //             Description = "Test",
            //             Length = "1:00"
            //         },
            //         new VideoCourseItem(id.ToString(), "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
            //             Name = "Advanced lesson",
            //             Description = "Test",
            //             Length = "1:00"
            //         },
            //         new VideoCourseItem(id.ToString(), "https://www.youtube.com/embed/pOmu0LtcI6Y") {
            //             Name = "Quadratic eqations, because why not?",
            //             Description = "Test",
            //             Length = "1:00"
            //         }
            //     }
            // };
        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<CourseDetailsDto>> GetAll()
        {
            await Task.Delay(500);
            return courses;
        }

        [HttpGet("{courseId}/item/{courseItemName}")]
        public IActionResult courseItemDetails(String courseId, String courseItemName) {

            if (!courseItems.ContainsKey(courseId)) {
                return new NotFoundObjectResult("Course item not found for particular courseId");
            }

            CourseItem courseItem = courseItems[courseId].Find( e => e.Name.Equals(courseItemName));
            return new OkObjectResult(courseItem) ;
        }

        [HttpPost("quiz-verify")]//??
        public List<bool> quizVerifier() {
            return null;
        }


        private static List<CourseDetailsDto> courses = new List<CourseDetailsDto>
        {
            new CourseDetailsDto() { Name = "Math", Id = 0, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>() {
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = "Test",
                        Length = "1:00"
                    }
                }
            },
            new CourseDetailsDto() { Name = "Integrals" ,Id = 1, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>() {
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = "Test",
                        Length = "1:00"
                    }
                }
            },
            new CourseDetailsDto() { Name = "Derivatives", Id = 2, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>() {
                    new TextCourseItem("2", "Long article text") {
                        Name = "Introduction",
                        Description = "Test intruduction - TextCourseItem",
                        Length = "1:00"
                    },
                    new VideoCourseItem("2", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Video",
                        Length = "1:00"
                    },
                    new TestCourseItem("2", 
                        new List<QuizEntry>() {
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Do You even lift bro?",
                                    possibleAnswers = new List<string>() {
                                        "Test answer1",
                                        "Test answer2",
                                        "Test answer3",
                                        "Test answer4",
                                    }
                                },
                                Answer = "Test answer4"
                            },
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Was this course ok?",
                                    possibleAnswers = new List<string>() {
                                        "Test answer1",
                                        "Test answer2",
                                        "Test answer3",
                                        "Test answer4",
                                    }
                                },
                                Answer = "Test answer4"
                            }
                        }
                    ) {
                        Name = "End course quiz",
                        Description = "Quiz",
                        Length = "1:00"
                    }
                }
            },
            new CourseDetailsDto() { Name = "Derivatives", Id = 3, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>()},
            new CourseDetailsDto() { Name = "Thermodynamics", Id = 4, Type = "Phisics", PictureUrl = "./pictures/phisics.jpg", Contents = new List<CourseItem>()},
            new CourseDetailsDto() { Name = "Basic English Words", Id = 5, Type = "English", PictureUrl = "./pictures/english.jpg", Contents = new List<CourseItem>()}
        };

        private static Dictionary<string, List<CourseItem>> courseItems = new Dictionary<string, List<CourseItem>> {
            { "0", new List<CourseItem>() {
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = "Test",
                        Length = "1:00"
                    }
                }
            },
            { "1", new List<CourseItem>() {
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = "Test",
                        Length = "1:00"
                    }
                }
            },
            { "2", new List<CourseItem>() {
                    new TextCourseItem("2", "Long article text") {
                        Name = "Introduction",
                        Description = "Test intruduction - TextCourseItem",
                        Length = "1:00"
                    },
                    new VideoCourseItem("2", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Video",
                        Length = "1:00"
                    },
                    new TestCourseItem("2", 
                        new List<QuizEntry>() {
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Do You even lift bro?",
                                    possibleAnswers = new List<string>() {
                                        "Test answer1",
                                        "Test answer2",
                                        "Test answer3",
                                        "Test answer4",
                                    }
                                },
                                Answer = "Test answer4"
                            },
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Was this course ok?",
                                    possibleAnswers = new List<string>() {
                                        "Test answer1",
                                        "Test answer2",
                                        "Test answer3",
                                        "Test answer4",
                                    }
                                },
                                Answer = "Test answer4"
                            }
                        }
                    ) {
                        Name = "End course quiz",
                        Description = "Quiz",
                        Length = "1:00"
                    }
                   }
            }        
        };


        private static List<CourseItem> course1Items = new List<CourseItem>() {
            new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                Name = "Introduction",
                Description = "Test",
                Length = "1:00"
            },
            new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                Name = "Mathematical Base",
                Description = "Test",
                Length = "1:00"
            },
            new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                Name = "Advanced lesson",
                Description = "Test",
                Length = "1:00"
            },
            new VideoCourseItem("1", "https://www.youtube.com/watch?v=pOmu0LtcI6Y") {
                Name = "Quadratic eqations, because why not?",
                Description = "Test",
                Length = "1:00"
            }
        };

        // private static List<QuizEntry> quizEntries = 
    }

}