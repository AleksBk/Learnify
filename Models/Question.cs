using System;
using System.Collections.Generic;

namespace Learnify.Models
{
    public class Question
    {
        public String questionText { get; set; }

        public List<string> possibleAnswers { get; set; }

    }
}