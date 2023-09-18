const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const canvas4 = document.getElementById("canvas4");

let imageData1 = "";
let imageData2 = "";
let imageData3 = "";
let imageData4 = "";

//  캔버스에 이미지 데이터 그리는 함수
function savedImgonCanvas(canvas, imageData){
    if(canvas && imageData){
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = imageData;
        image.onload = function(){
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
    }
}

// 이미지 데이터 불러와 캔버스에 출력
document.addEventListener("DOMContentLoaded", () => {
    // 가장 마지막에 저장된 네 개의 이미지 불러오기
    let imageCount = localStorage.getItem("imageCount");
    if (!imageCount) {
        imageCount = 0;
    } else {
        imageCount = parseInt(imageCount);
    }
    const nextNum = imageCount;

    // 로컬 스토리지에서 이미지 불러와서 캔버스에 각각 출력
    imageData1 = localStorage.getItem(`shot${nextNum - 3}`);
    imageData2 = localStorage.getItem(`shot${nextNum - 2}`);
    imageData3 = localStorage.getItem(`shot${nextNum - 1}`);
    imageData4 = localStorage.getItem(`shot${nextNum}`);

    savedImgonCanvas(canvas1, imageData1);
    savedImgonCanvas(canvas2, imageData2);
    savedImgonCanvas(canvas3, imageData3);
    savedImgonCanvas(canvas4, imageData4);
});


// 드래그 앤 드롭 기능을 구현
let draggedCanvas = null;

// 드래그 시작 시
document.addEventListener("dragstart", (event) => {
    if (event.target.tagName === "CANVAS") {
        draggedCanvas = event.target;
    }
});

// 드래그 중일 때
document.addEventListener("dragover", (event) => {
    event.preventDefault();
});

// 드래그 종료 시
document.addEventListener("dragend", () => {
    draggedCanvas = null;
});

// 캔버스 요소에 드래그 앤 드롭 이벤트 리스너를 추가
const canvases = document.querySelectorAll("canvas");
canvases.forEach(canvas => {
    canvas.addEventListener("dragstart", handleDragStart); // 드래그 이벤트 핸들러 추가
    canvas.addEventListener("dragover", handleDragOver);
    canvas.addEventListener("drop", handleDrop);
    canvas.addEventListener("dragenter", handleDragEnter);
    canvas.addEventListener("dragleave", handleDragLeave);
});

// 드래그 대상 캔버스를 드롭 대상 캔버스 위로 이동
function handleDragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

// 드래그 대상 캔버스를 드롭 대상 캔버스 위로 이동
function handleDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}

// 드래그 대상 캔버스를 드롭 대상 캔버스 위로 이동
function handleDrop(event) {
    event.preventDefault();

    // 드래그 대상 캔버스를 드롭 대상 캔버스 위로 이동
    if (draggedCanvas && draggedCanvas !== this) {
        const parent = this.parentElement;
        parent.insertBefore(draggedCanvas, this);
    }

    // 드롭 이벤트가 발생하고 난 뒤 효과 제거
    handleDragLeave.call(this);
}

// 드래그 대상 캔버스가 들어왔을 때 효과 추가
function handleDragEnter(event) {
    this.classList.add("hover");
}

// 드래그 대상 캔버스가 떠났을 때 효과 제거
function handleDragLeave(event) {
    this.classList.remove("hover");
}


// 버튼 요소 가져오기
const btnFix = document.getElementById("fix");
const btnDone = document.getElementById("done");
const btnDownload = document.getElementById("download");
const btnHome = document.getElementById("home");

//그림판 기능 구현
// 모든 캔버스 요소 가져오기
let canvasAll = document.querySelectorAll(".canvas");

// 선택된 색상을 저장할 변수
let selectedColor = "";

// 색상 버튼 클릭 시 색상 변경
const colorButtons = document.querySelectorAll(".btns-color");
colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        selectedColor = button.classList[1]; // 버튼의 두 번째 클래스를 선택된 색상으로 설정
    });
});


// 그림 그리기 이벤트 리스너 추가 함수
function addDrawingEvents(canvas) {
    const ctx = canvas.getContext("2d");
    let isDrawing = false;

    function startDrawing(e){
        isDrawing = true;
        ctx.strokeStyle = selectedColor; // 선택된 색상 적용
        ctx.lineWidth = 2; // 그림 선의 두께 설정
        ctx.beginPath();
        ctx.moveTo(e.offsetX, e.offsetY);
    }

    function draw(e){
        if (!isDrawing) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }

    function stopDrawing(){
        isDrawing = false;
        ctx.closePath();
    }

    canvas.addEventListener("mousedown", startDrawing);
    canvas.addEventListener("mousemove", draw);
    canvas.addEventListener("mouseup", stopDrawing);
}

// 그림 그리기 이벤트 리스너 제거 함수
function removeDrawingEvents(canvas) {
    canvas.removeEventListener("mousedown", startDrawing);
    canvas.removeEventListener("mousemove", draw);
    canvas.removeEventListener("mouseup", stopDrawing);
}

// 드래그 앤 드롭 기능 활성/비활성화 함수
function toggleDrawingAndDrag(enabled) {
    
    canvasAll.forEach(canvas => {
        if (enabled) {
            addDrawingEvents(canvas);
            canvas.draggable = false; // 그림 그리기 활성화 시 드래그 비활성화
        } else {
            removeDrawingEvents(canvas);
            canvas.draggable = true; // 그림 그리기 비활성화 시 드래그 활성화
        }
    });
}

// 합친 네 컷 이미지 데이터 로컬 스토리지에 저장
 function saveMerged(canvas){
    //  이미 저장된 이미지 데이터 키 숫자 가져오기
    let mergedCount = localStorage.getItem("mergedCount");
    if(!mergedCount){
        mergedCount = 0;
    }else{
        mergedCount = parseInt(mergedCount);
    }

    //  다음 이미지 키 숫자 생성
    const nextNum = mergedCount + 1;
    //  다음 이미지 데이터 저장
    const mergedKey = `merged${nextNum}`;
    const mergedData = canvas.toDataURL("image/png");
    localStorage.setItem(mergedKey, mergedData);

    //  이미지 데이터 키 숫자 업데이트
    localStorage.setItem("mergedCount", nextNum);
}

let dEnabled = true;
// #fix 버튼 클릭 시 드래그 앤 드롭 및 그림 그리기 기능 활성/비활성화 전환
btnFix.addEventListener("click", () => {
    dEnabled = !dEnabled;

    // 드래그 앤 드롭 및 그림 그리기 활성화/비활성화 설정
    canvasAll.forEach(canvas => {
        if (dEnabled) {
            canvas.draggable = true; // 활성화 상태일 때 드래그 활성화
            canvas.addEventListener("dragover", handleDragOver);
            canvas.addEventListener("drop", handleDrop);
            canvas.addEventListener("dragenter", handleDragEnter);
            canvas.addEventListener("dragleave", handleDragLeave);
        } else {
            canvas.draggable = false; // 비활성화 상태일 때 드래그 비활성화
            canvas.removeEventListener("dragover", handleDragOver);
            canvas.removeEventListener("drop", handleDrop);
            canvas.removeEventListener("dragenter", handleDragEnter);
            canvas.removeEventListener("dragleave", handleDragLeave);
        }
    });

    // 그림 그리기와 드래그 앤 드롭 활성화/비활성화 설정
    toggleDrawingAndDrag(!dEnabled); // dEnabled 상태가 true일 때 그림 그리기 비활성화

    btnFix.setAttribute("disabled", "true");  //  #fix 버튼 클릭 시 순서 변경 불가
    btnDone.disabled = false;
});

let imageDataUrl = null;
// btnDone 클릭 시 실행되는 함수
btnDone.addEventListener("click", () => {
    // canvas-container1 영역을 하나의 이미지로 합치기
    const canvasContainer = document.querySelector(".canvas-container1");
    const mergedCanvas = document.createElement("canvas");
    const ctx = mergedCanvas.getContext("2d");

    // canvas-container1의 크기를 계산하고 mergedCanvas에 설정
    const containerRect = canvasContainer.getBoundingClientRect();
    mergedCanvas.width = containerRect.width;
    mergedCanvas.height = containerRect.height;

    // canvas-container1 영역의 내용을 합친 캔버스에 그리기
    canvasContainer.childNodes.forEach((canvas) => {
        if (canvas instanceof HTMLCanvasElement) {
            // 개별 canvas의 위치와 크기 계산
            const canvasRect = canvas.getBoundingClientRect();
            const offsetX = canvasRect.left - containerRect.left;
            const offsetY = canvasRect.top - containerRect.top;

            // canvas를 합친 캔버스에 그리기 (offsetX와 offsetY에 border 두께를 더해줌)
            ctx.drawImage(canvas, offsetX, offsetY);
        }
    });

    // 합친 캔버스를 이미지로 추출 (데이터 URL로 변환)
    imageDataUrl = mergedCanvas.toDataURL("image/png");
    // 로컬 스토리지에 이미지 데이터 저장
    saveMerged(mergedCanvas);

    // 다운로드, 홈 버튼 활성화
    btnDownload.disabled = false;
    btnHome.disabled = false;

    // 데이터 URL을 링크로 제공
    // 다운로드 버튼에 이미지 데이터 URL 입력
    btnDownload.href = imageDataUrl;
    
});

btnDownload.addEventListener("click", () => {
    // 링크를 복사할 수 있도록 팝업 메시지 표시
    const linkToCopy = imageDataUrl;
    const copyText = `${linkToCopy}`;
    prompt("아래 링크를 복사하세요:", copyText);
});

btnHome.addEventListener("click", () => {
    window.location.href = "../../index.html";
});