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

        [HttpPost("quiz-verify")]
        public IActionResult quizVerifier([FromBody] QuizAnswers quizAnswers) {
            var quiz = courses[quizAnswers.quizId].Contents.Find(e => e.Name.Equals(quizAnswers.courseItemName)) as TestCourseItem;
            if (quiz == null) {
                return new NotFoundObjectResult("Course item not found for particular courseId");
            }
            QuizResults quizResults = new QuizResults();
            for (int i = 0; i < quiz.quizEntries.Count; i++) {
                var e = quiz.quizEntries[i];
                if (e.Answer.Equals(quizAnswers.answers[i])) {
                    quizResults.correctOnes.Add(i);
                } else {
                    quizResults.invalidOnes.Add(i, e.Answer);
                }
            }
        
            return new OkObjectResult(quizResults);
        }

        private const string LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?";
        private static List<CourseDetailsDto> courses = new List<CourseDetailsDto>
        {
            new CourseDetailsDto() { Name = "Math", Id = 0, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>() {
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = "Test",
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = "Test",
                        Length = "1:00"
                    }
                }
            },
            new CourseDetailsDto() { Name = "Integrals" ,Id = 1, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>() {
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = LoremIpsum,
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
                    new VideoCourseItem("2", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
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
                                        "I guess",
                                        "Probably",
                                        "I don't know",
                                        "Sure",
                                    }
                                },
                                Answer = "Sure"
                            },
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Was this course ok?",
                                    possibleAnswers = new List<string>() {
                                        "Yes",
                                        "No",
                                        "I don't know",
                                        "YESS",
                                    }
                                },
                                Answer = "YESS"
                            }
                        }
                    ) {
                        Name = "End course quiz",
                        Description = "",
                        Length = ""
                    }
                }
            },
            new CourseDetailsDto() { Name = "Derivatives", Id = 3, Type = "Math", PictureUrl = "./pictures/math.jpg", Contents = new List<CourseItem>()},
            new CourseDetailsDto() { Name = "Thermodynamics", Id = 4, Type = "Phisics", PictureUrl = "./pictures/phisics.jpg", Contents = new List<CourseItem>()},
            new CourseDetailsDto() { Name = "Basic English Words", Id = 5, Type = "English", PictureUrl = "./pictures/english.jpg",
                Contents = new List<CourseItem>()
                {
                    new TextCourseItem("0", LoremIpsum) {
                        Name = "Introduction",
                        Description = "Test intruduction - TextCourseItem",
                        Length = "1:00"
                    },
                    new TextCourseItem("1", LoremIpsum) {
                        Name = "I am, You ...",
                        Description = "Test intruduction - TextCourseItem",
                        Length = "1:00"
                    },
                    new TextCourseItem("0", LoremIpsum) {
                        Name = "Make love, not war",
                        Description = "Test intruduction - TextCourseItem",
                        Length = "1:00"
                    },
                }}
        };

        private static Dictionary<string, List<CourseItem>> courseItems = new Dictionary<string, List<CourseItem>> {
            { "0", new List<CourseItem>() {
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("0", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = LoremIpsum,
                        Length = "1:00"
                    }
                }
            },
            { "1", new List<CourseItem>() {
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Introduction",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Advanced lesson",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("1", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Quadratic eqations, because why not?",
                        Description = LoremIpsum,
                        Length = "1:00"
                    }
                }
            },
            { "2", new List<CourseItem>() {
                    new TextCourseItem("2", "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?)") {
                        Name = "Introduction",                        
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new VideoCourseItem("2", "https://www.youtube.com/embed/pOmu0LtcI6Y") {
                        Name = "Mathematical Base",
                        Description = LoremIpsum,
                        Length = "1:00"
                    },
                    new TestCourseItem("2", 
                        new List<QuizEntry>() {
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Do You even lift bro?",
                                    possibleAnswers = new List<string>() {
                                        "I guess",
                                        "Probably",
                                        "I don't know",
                                        "Sure",
                                    }
                                },
                                Answer = "Sure"
                            },
                            new QuizEntry() {
                                Question = new Question() {
                                    questionText = "Was this course good enough?",
                                    possibleAnswers = new List<string>() {
                                        "Yes",
                                        "No",
                                        "I don't know",
                                        "YESS",
                                    }
                                },
                                Answer = "YESS"
                            }
                        }
                    ) {
                        Name = "End course quiz",
                        Description = "",
                        Length = ""
                    }
                   }
            }        
        };
    }
}