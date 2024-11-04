console.log('Canvas Practice Test Loaded');

// Reveal Button
const revealButton = document.createElement("button");
revealButton.innerText = "Reveal";
revealButton.style.position = "fixed"; 
revealButton.style.top = "5%"; 
revealButton.style.left = "88%";
revealButton.style.padding = "10px";  
revealButton.style.zIndex = "1000"; 

// Hide Button
const hideButton = document.createElement("button");
hideButton.innerText = "Hide";
hideButton.style.position = "fixed"; 
hideButton.style.top = "5%"; 
hideButton.style.left = "92%";
hideButton.style.padding = "10px";  
hideButton.style.zIndex = "1000"; 

// Dropdown for Questions
const dropdown = document.createElement('select');
dropdown.id = 'question-number';
dropdown.style.position = "fixed";
dropdown.style.top = "5%";
dropdown.style.left = "83%";
dropdown.style.width = "5%";
dropdown.style.padding = "10px";
dropdown.style.zIndex = "1000";

const allOption = document.createElement('option');
allOption.value = 'all';
allOption.innerText = 'All';
dropdown.appendChild(allOption);

function init() {
    console.log('Initiated');
    const wrapper = document.getElementById('right-side-wrapper');

    if (wrapper) {
        const button = document.createElement('button');

        button.innerText = 'Practice Test Mode';
        button.id = 'custom-button';
        button.style.marginBottom = '10px';

        wrapper.insertBefore(button, wrapper.firstChild);

        button.addEventListener('click', function() {
            InitiateButtons();
        });
    } else {
        console.log('Wrapper not found');
    }
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function hide(v1=document){
    const correctTags = v1.getElementsByClassName("answer_arrow");
    const inputs = v1.getElementsByTagName("input");
    const answers = v1.getElementsByClassName("answer");
    const inputBoxes = v1.getElementsByClassName("answer_group");
    const correctAnswers = v1.getElementsByClassName("correct_answer");
    const comments = v1.getElementsByClassName("quiz_comment");
    const inputsOfType = v1.querySelectorAll('input[type="text"]');
    const onlyChildLabels = v1.querySelectorAll('label:only-child');

    for (var i = 0; i < correctTags.length; i++) {
        correctTags[i].style.opacity = '0';
    }
    for (var i = 0; i < inputBoxes.length; i++) {
        inputBoxes[i].style.display = "none";
    }
    for (var i = 0; i < correctAnswers.length; i++) {
        correctAnswers[i].getElementsByTagName("input")[0].checked = false;
    }
    for(let i = 0; i < inputs.length; i++) {
        inputs[i].style.color = 'black';
    }
    for (var i=0; i < comments.length; i++) {
        comments[i].style.display = "none";
    }
    for (var i = 0; i < answers.length; i++) {
        answers[i].style.opacity = "1";
        answers[i].style.border = 'none';
    }
    for (var i = 0; i < inputsOfType.length; i++) {
        inputsOfType[i].style.display = 'none';
    }
    for (var i = 0; i < onlyChildLabels.length; i++) {
        onlyChildLabels[i].style.display = 'none';
    }
}

function show(v1=document){
    const correctTags = v1.getElementsByClassName("answer_arrow");
    const inputs = v1.getElementsByTagName("input");
    const answers = v1.getElementsByClassName("answer");
    const inputBoxes = v1.getElementsByClassName("answer_group");
    const correctAnswers = v1.getElementsByClassName("correct_answer");
    const comments = v1.getElementsByClassName("quiz_comment");
    const inputsOfType = v1.querySelectorAll('input[type="text"]');
    const onlyChildLabels = v1.querySelectorAll('label:only-child');

    for (var i = 0; i < correctTags.length; i++) {
        correctTags[i].style.opacity = '1';
    }
    for (var i = 0; i < inputBoxes.length; i++) {
        inputBoxes[i].style.display = "block";
    }
    for (var i = 0; i < correctAnswers.length; i++) {
        correctAnswers[i].getElementsByTagName("input")[0].checked = true;
    }
    for(let i = 0; i < inputs.length; i++) {
        //If selected, please fix and add button
        if(!inputs[i].parentElement.parentElement.classList.contains('correct_answer')) {
            inputs[i].style.color = 'red';
        }
    }
    // Show answer borders TODO

    for (var i=0; i < comments.length; i++) {
        if(!comments[i].classList.contains('empty')) 
            comments[i].style.display = "block";
    }
    for (var i = 0; i < inputsOfType.length; i++) {
        inputsOfType[i].style.display = 'block';
    }
    for (var i = 0; i < onlyChildLabels.length; i++) {
        onlyChildLabels[i].style.display = 'block';
    }
}


function InitiateButtons(){

    //Dropdown
    var question = document.getElementById("questions").children;

    for (let i = 1; i <= question.length; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.innerText = "Q"+i;
        dropdown.appendChild(option);
    }

    //Global Reveal (each question reveal is blocked)
    document.body.appendChild(dropdown);
    document.body.appendChild(hideButton);
    document.body.appendChild(revealButton);

    hideButton.addEventListener("click", function() {
        if(dropdown.value == 'all') {
            hide();
        } else {
            hide(question[dropdown.value-1]);
        }
    });
    revealButton.addEventListener("click", function() {
        if(dropdown.value == 'all') {
            show();
        } else {
            show(question[dropdown.value-1]);
        }
    });

    hide();


}