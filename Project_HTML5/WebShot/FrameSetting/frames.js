const left = document.getElementById("left");
const right = document.getElementById("right");
const confirm = document.getElementById("confirm");
const btn = document.getElementById("next");

let isMouseOver = false;
let isMessageFixed = false;
let isLeftselected = false;
let selectedFrame = null; //프레임 선택 여부 파악

//메시지 표시 함수
function displayMessage(message){
    confirm.textContent = message;
}

//선택에 따라 배경색, 메시지 업데이트하는 함수
function update(){
    if(isLeftselected){
        left.classList.add("clicked");
        right.classList.remove("clicked");
        displayMessage("세로형을 선택하셨습니다");
    }else{
        left.classList.remove("clicked");
        right.classList.add("clicked");
        displayMessage("가로형을 선택하셨습니다");
    }
}

//프레임 선택 여부에 따라 페이지 이동 버튼 활성화
function btnActivate(){
    if(selectedFrame === null){
        btn.disabled = true;  //아무것도 선택하지 않은 경우 버튼 비활성화
    }else{
        btn.disabled = false;  //선택한 경우 버튼 활성화
    }
}

//세로형 프레임 mouseover, mouseout, click 이벤트 리스너 추가
left.addEventListener("mouseover", function() {
    if(!isMessageFixed){
        displayMessage("세로형을 선택하셨습니다");
        isMouseOver = true;
    }  
});
left.addEventListener("mouseout", function(){
    if(!isMessageFixed){
        displayMessage("프레임을 선택하세요");
        isMouseOver = false;
    } 
});
left.addEventListener("click", function() {
    if(isMouseOver){
        displayMessage("세로형을 선택하셨습니다");
        isMessageFixed = true;
    }

    isLeftselected = true;
    update();
    selectedFrame = "vertical"; //버튼 클릭 후 페이지 이동 조건1 : 세로형 선택
    btnActivate();
});

//가로형 프레임 mouseover, click 이벤트 리스너 추가
right.addEventListener("mouseover", function() {
    if(!isMessageFixed){
        displayMessage("가로형을 선택하셨습니다");
        isMouseOver = true;
    }  
});
right.addEventListener("mouseout", function(){
    if(!isMessageFixed){
        displayMessage("프레임을 선택하세요");
        isMouseOver = false;
    } 
});
right.addEventListener("click", function() {
    if(isMouseOver){
        displayMessage("가로형을 선택하셨습니다");
        isMessageFixed = true;
    }

    isLeftselected = false;
    update();
    selectedFrame = "horizontal"; //버튼 클릭 후 페이지 이동 조건2 : 가로형 선택
    btnActivate();
});

//다음 단계로 넘어가는 버튼
btn.addEventListener("click", function(){
    if(selectedFrame === "vertical"){
        window.location.href = "../CamToCanvas/vertical.html"; 
    }else if(selectedFrame === "horizontal"){
        window.location.href = "../CamToCanvas/horizontal.html"; 
    }
});