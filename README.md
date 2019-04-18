A profilier based on data from survey questions.

METRICS:

1. Frugality (frugality)
2. Health/Fitness (health)
3. Environmental Conciousness (environment)
4. Personality Assumptions (personality)
5. Ad (id)
6. Age

Scales: -5 to 5, 0 being average.
Metrics: 1,2,3
Example: (2)Health = -2; This means that x person is slightly less healthy than the average person.

Weights: there are 2 weights; 0.5(light) and 1(normal).

Keyword Counters: Counting each instance of a keyword. Keywords that show up more often are therefore assumed of person x.
Metrics: 4,5,6
Example: (4)Personality Assumptions: {"introverted":3}; "Introverted" shows up 3 times throughout the survey.

Weights: keywords have 2 weights; light and normal. A light "introverted" means the word shows up once in the answer, whereas a normal means the word shows up twice.

Ad holds an id number to access it's relevant advert.

Age: Young (0-29), Middle(30-50), Old (51+). Only "young" and "old" are keywords, and middle will be determined if young and old have tied or almost tied counts.

Init Profile:
All values at 0.
