const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0,0,0,0,0,0,0,0,0,0,0,0];

function calResult(){
    console.log(select);
    let resultword = select.indexOf(Math.max(...select));
    return resultword;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultName');
    resultName.innerHTML = infoList[point].name;

    let resultImg = document.createElement('Img');
    const imgDiv = document.querySelector('#resultImg');
    let imgURL = 'img/imagee-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";
    setTimeout(() => {
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";
        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block";
        },450)});
        setResult();
}

function addAnswer(answerText,qIdx,idx){ // 답변/질문지 번호/선택 답
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

    // 답변 누르고 난 뒤
    answer.addEventListener("click",function(){ 
        let children = document.querySelectorAll('.answerList');
        for(let i  = 0;i < children.length;i++){
            children[i].disabled = true; 
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
            // children[i].style.display = 'none';
        }
        setTimeout(() => {
            let target = qnaList[qIdx].a[idx].type;
            for(let j = 0;j < target.length;j++){
                select[target[j]] += 1; // 결과 담기
            }
            for(let i = 0; i < children.length;i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        },450);
    }, false); 
}

function goNext(qIdx){
    // 변수에 맞춰 질문이 변하도록 출력 
    if (qIdx === endPoint){
        goResult();
        return
    }
    let qBox = document.querySelector('.qBox');
    qBox.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i); 
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