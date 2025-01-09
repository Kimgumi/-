const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const endPoint = 12;

function addAnswer(answerText,qIdx){
    // qnaList[qIdx].a[i].answer을 answerText으로 받아서 사용 
    // 버튼으로 관리하도록 개발
    let aBox = document.querySelector('.aBox');
    let answer = document.createElement('button');
    answer.classList.add('answerList'); // 모두 부르기 위해 클래스 부여
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');
    
    aBox.appendChild(answer); // <div>태그 안에 <button>을 만듬 
    answer.innerHTML = answerText;

    answer.addEventListener("click",function(){
        let children = document.querySelectorAll('.answerList');
        for(let i  = 0;i < children.length;i++){
            children[i].disabled = true; 
            children[i].style.WebkitAnimation = "fadeOut 1s";
            children[i].style.animation = "fadeOut 1s";
            // children[i].style.display = 'none';
        }
        setTimeout(() => {
            for(let i = 0; i < children.length;i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450);
    }, false); 
}

function goNext(qIdx){
    // 변수에 맞춰 질문이 변하도록 출력 
    let qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx);
    }
    let status = document.querySelector('.statusBar');
    status.style.width = (100/endPoint) * (qIdx+1) + '%';
}



function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
        setTimeout(() => {
            main.style.display = "none";
            qna.style.display = "block";
        },450);
        let qIdx = 0;
        goNext(qIdx);
    },450);
}