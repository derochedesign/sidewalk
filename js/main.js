const questionsDom = document.getElementById("questions");
const submitQ = document.getElementById("submitQuestions"); //temporary

//init metrics
let metrics = {
    frugality: 0,     //1
    health: 0,        //2
    environment: 0,   //3
    personality: [],  //4
    purchasing: []    //5
}

$.getJSON('questions/questions.json', function(result) {
    
    //clone array
    const allQuestions = result.questions.splice(0);
    ready(allQuestions);
        
});

const ready = allQuestions => {
    
    //create html
    allQuestions.map(question => 
        questionsDom.innerHTML += QuestionTemplate(question));
        
    //listen for buttons, get the questions id, and the buttons id
    questionsDom.addEventListener("click", e => {

        if (!e.target.matches("button")) return;
        
        equateMetrics(e.target.dataset.id, e.target.parentElement.dataset.id, allQuestions);
        // hide question/show next
    });
    
    //temp submit button
    submitQ.addEventListener("click", e => createProfile(metrics));
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
    (ans.purchasing) && (ans.purchasing.map(habit => metrics.purchasing.push(habit)));
    
    console.log(metrics); 
    
}

const createProfile = finalMetrics => {
    //put metrics 1,2,3 on a scale -5 to 5
    //count instances for each keyword in metrics 4 and 5
    
    console.log(`Frugality: ${finalMetrics.frugality}, Health: ${finalMetrics.health}, Environment: ${finalMetrics.environment}`);
    console.log(`Personality Traits:`,finalMetrics.personality, `Purchasing Habits: `, finalMetrics.purchasing);
    
}