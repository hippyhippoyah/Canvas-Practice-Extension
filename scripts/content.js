console.log('Content Script Loaded');

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
            hideAnswers();
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


function hideAnswers(){
    const correctTags = document.getElementsByClassName("answer_arrow");
    const inputs = document.getElementsByTagName("input");
    const answers = document.getElementsByClassName("answer");
    const questionBoxes = document.getElementsByClassName("display_question");

    for (let i = 0; i < questionBoxes.length; i++) {
        const questionBox = questionBoxes[i];

        const revealButton = document.createElement("button");
        revealButton.innerText = "Reveal Answer";

        // Clicking this button is blocked by canvas
        revealButton.addEventListener("click", function() {
            // Blocked by canvas
            // const answerArrows = questionBox.getElementsByClassName("answer_arrow");

            // for (let j = 0; j < answerArrows.length; j++) {
            //     answerArrows[j].style.opacity = "1";
            // }

        });

        const header = questionBox.querySelector('.header');
        if (header) {
            header.appendChild(revealButton);
        }
    }


    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'checkbox' || inputs[i].type === 'radio') {
            inputs[i].checked = false;
        }
    }


    if (correctTags) {
        for (var i = 0; i < correctTags.length; i++) {
            correctTags[i].style.opacity = '0';
        }
    }

    if (answers) {
        for (var i = 0; i < answers.length; i++) {
            answers[i].style.opacity = "1";
            answers[i].style.border = 'none';
        }
    }

    //Todo: Add reveal option for each question, add scoring, hide score, 
}