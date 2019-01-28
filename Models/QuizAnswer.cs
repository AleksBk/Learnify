using System;
using System.Collections.Generic;

namespace Learnify.Models
{

        public class QuizAnswers
        {
            public int quizId {get;set;}
            public String courseItemName {get;set;}
            public Dictionary<int, String> answers {get;set;}

        }
}