const questionsDom = document.getElementById("questions");
const submitQ = document.getElementById("submitQuestions"); //temporary

//init metrics
let metrics = {
    frugality: 0,     //1
    health: 0,        //2
    environment: 0,   //3
    personality: [],  //4
    age: []    //5
}

$.getJSON('questions/questions.json', function(result) {
    
    //clone array
    const allQuestions = result.questions.splice(0);
    ready(allQuestions);
        
});

const ready = allQuestions => {
    const questionCount = allQuestions.length;
    let pos = 0;
    submitQ.style.display = "none";
    //create html
    allQuestions.map(question => 
        questionsDom.innerHTML += QuestionTemplate(question));
        
    //listen for buttons, get the questions id, and the buttons id
    questionsDom.addEventListener("click", e => {

        if (!e.target.matches("button")) return;
        
        equateMetrics(e.target.dataset.id, e.target.parentElement.dataset.id, allQuestions);
        // hide question/show next
        e.target.parentElement.style.display = "none";
        pos++;
        
        if (pos == questionCount) {
            submitQ.style.display = "block";
            submitQ.addEventListener("click", e => createProfile(metrics));
        }
        
    });
    
    //temp submit buttom
    
}

const QuestionTemplate = props => {
    
    let answers = "";
    props.answers.map(answer => 
        answers += `<button data-id="${answer.id}" type="button" class="button answer">${answer.label}</button>`);
    
    return (
        `<div data-id="${props.id}" class="question">
            <div>
                <h2>${props.question}</h2>
                ${(props.sub) ? `<h6>${props.sub}</h6>` : ''}
            </div>
            <section data-id="${props.id}" class="answers">
                ${answers}
            </section>
        </div>`
    )
}

const equateMetrics = (bId, qId, allQ) => {
    //get current question and answer
    let currQ = allQ.filter(q => q.id == qId)[0];
    let ans = currQ.answers.filter(a => a.id == bId)[0];
    
    // let tempMetrics = Object.assign({}, metrics); //doesn't clone obj arr's
    
    //apply metric changes !! we need to figure out a good way to do the scales, rather than just add/subtract
    (ans.frugality) && (metrics.frugality += ans.frugality);
    (ans.health) && (metrics.health += ans.health);
    (ans.environment) && (metrics.environment += ans.environment);
    
    (ans.personality) && (ans.personality.map(trait => metrics.personality.push(trait)));
    (ans.age) && (ans.age.map(age => metrics.age.push(age)));
    
    console.log(metrics); 
    
}

const createProfile = finalMetrics => {
    //put metrics 1,2,3 on a scale -5 to 5
    //count instances for each keyword in metrics 4 and 5
    
    //know the max possible negative and positive for each segment
    //then take the users number and gets its position relative to that scale, then put it on the -5 to 5 scale
    
    //define the possible max for each metric
    const endpoints = {
       new: 5,
       frugality: 4,
       health: 4,
       environment: 2
    };
    
    //get the modifiers to transfer from their specific scale to a 5 scale
    const modifiers = {
        frugality: endpoints.frugality / endpoints.new,
        health: endpoints.health / endpoints.new,
        environment: endpoints.environment / endpoints.new
    }
    
    //place on 5 scale (finalMetrics holds the score for each metric)
    const newScale = {
        frugality: finalMetrics.frugality/modifiers.frugality,     //1
        health: finalMetrics.health/modifiers.health,        //2
        environment: finalMetrics.environment/modifiers.environment   //3
    }
    
    const personalityTraits = countKeywords(finalMetrics.personality);
    const ageDefine = countKeywords(finalMetrics.age);
    
    console.log(`Frugality: (-5) ${newScale.frugality} (5), Health: (-5) ${newScale.health} (5), Environment: (-5) ${newScale.environment} (5)`);
    console.log(`Personality Traits:`,personalityTraits, `Counting Age: `, ageDefine);
    
}

const countKeywords = words => {
    
    let keyCounts = [];
    let counted = [];
    
    words.map(word => {
        //check if already counted
        let duplicates = counted.filter(countedWord => countedWord == word);
        if (duplicates.length == 0) {
            
            let c = 0;
            words.filter(keyword => (
                (word == keyword) && (c++)
            ));
            
            keyCounts.push({keyword: word,count: c});
            counted.push(word);
        }
    });
    return keyCounts;
}