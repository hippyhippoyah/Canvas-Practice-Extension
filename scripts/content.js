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
    // const questionBoxes = document.getElementsByClassName("display_question");
    const inputBoxes = document.getElementsByClassName("answer_group");
    const correctAnswers = document.getElementsByClassName("correct_answer");
    const comments = document.getElementsByClassName("quiz_comment");

    //Global Reveal (each question reveal is blocked)
    const fixedButton = document.createElement("button");
    fixedButton.innerText = "Reveal Answer";
    fixedButton.style.position = "fixed"; 
    fixedButton.style.top = "50%"; 
    fixedButton.style.left = "80%";
    fixedButton.style.zIndex = "1000"; 
    document.body.appendChild(fixedButton);

    var revealed = false;

    fixedButton.addEventListener("click", function() {
        if (!revealed) {
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
            for (var i=0; i < comments.length; i++) {
                if(!comments[i].classList.contains('empty')) 
                    comments[i].style.display = "block";
            }
            fixedButton.innerText = "Hide Answer";
            revealed = true;
        } else {
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
            fixedButton.innerText = "Reveal Answer";
            revealed = false;
        }
    });


    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type === 'checkbox' || inputs[i].type === 'radio') {
            inputs[i].checked = false;
            inputs[i].removeAttribute("disabled"); 
        }
    }
    for (var i = 0; i < correctTags.length; i++) {
        correctTags[i].style.opacity = '0';
    }

    for (var i = 0; i < answers.length; i++) {
        answers[i].style.opacity = "1";
        answers[i].style.border = 'none';
    }

    for (var i = 0; i < inputBoxes.length; i++) {
        inputBoxes[i].style.display = "none";
    }

    for (var i=0; i < comments.length; i++) {
        comments[i].style.display = "none";
    }

    
    


}