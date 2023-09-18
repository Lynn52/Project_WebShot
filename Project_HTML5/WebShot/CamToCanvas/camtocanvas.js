const message = document.getElementById("confirm");

const btnShoot1 = document.getElementById("shoot1");
const btnShoot2 = document.getElementById("shoot2");
const btnShoot3 = document.getElementById("shoot3");
const btnShoot4 = document.getElementById("shoot4");
const btnNext = document.getElementById("next");

// 각 canvas 및 video 엘리먼트를 개별적으로 정의
const canvas1 = document.getElementById("canvas1");
const canvas2 = document.getElementById("canvas2");
const canvas3 = document.getElementById("canvas3");
const canvas4 = document.getElementById("canvas4");

const video1 = document.createElement("video");
const video2 = document.createElement("video");
const video3 = document.createElement("video");
const video4 = document.createElement("video");

// 캔버스 그리기 함수 (개별 비디오 엘리먼트 사용)
function VideoToCanvas(canvas, video){
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    requestAnimationFrame(() => VideoToCanvas(canvas, video));
}

// 각각의 비디오 스트림 생성 및 캔버스에 연결
async function displayWebcam(canvas, video){
    try{
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
        VideoToCanvas(canvas, video);
    }catch(error){
         console.error("Error accessing webcam:", error);
         alert("웹캠 접근 권한을 허용해주세요.");
         throw error;
     }
}

// 페이지 로드 시 각각의 비디오 스트림 초기화 및 캔버스에 그리기
document.addEventListener("DOMContentLoaded", () => {
    displayWebcam(canvas1, video1);
    displayWebcam(canvas2, video2);
    displayWebcam(canvas3, video3);
    displayWebcam(canvas4, video4);
});

// takePicture 함수(개별 비디오 엘리먼트 사용)
function takePicture(canvas, video) {
    // 웹캠 스트림 중지
    const tracks = video.srcObject.getTracks();
    tracks.forEach((track) => {
        track.stop();
    });

    // 비디오 엘리먼트 비활성화
    video.pause();
    video.srcObject = null;

    // 이미지 URL을 canvas에 로드하고 그리기
    const ctx = canvas.getContext('2d');
    const image = new Image();
    image.src = canvas.toDataURL("image/png");

    image.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // 캔버스 초기화
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height); // 이미지 그리기

        //  스크린샷 된 이미지 데이터 저장
        saveImage(canvas);
    };
}

// 이미지 데이터 로컬 스토리지에 저장
function saveImage(canvas){
    //  이미 저장된 이미지 데이터 키 숫자 가져오기
    let imageCount = localStorage.getItem("imageCount");
    if(!imageCount){
        imageCount = 0;
    }else{
        imageCount = parseInt(imageCount);
    }

    //  다음 이미지 키 숫자 생성
    const nextNum = imageCount + 1;
    //  다음 이미지 데이터 저장
    const shotKey = `shot${nextNum}`;
    const imageData = canvas.toDataURL("image/png");
    localStorage.setItem(shotKey, imageData);

    //  이미지 데이터 키 숫자 업데이트
    localStorage.setItem("imageCount", nextNum);
}

// 각 버튼에 대한 클릭 이벤트 핸들러 설정 (개별 비디오 엘리먼트 사용)
btnShoot1.addEventListener("click", () => {
    takePicture(canvas1, video1);
    btnShoot1.disabled = true;  //btnShoot1 비활성화
    btnShoot2.disabled = false;  //btnShoot2 활성화
});

btnShoot2.addEventListener("click", () => {
    takePicture(canvas2, video2);
    btnShoot2.disabled = true;  //btnShoot2 비활성화
    btnShoot3.disabled = false;  //btnShoot3 활성화
});

btnShoot3.addEventListener("click", () => {
    takePicture(canvas3, video3);
    btnShoot3.disabled = true;  //btnShoot3 비활성화
    btnShoot4.disabled = false;  //btnShoot4 활성화
});

btnShoot4.addEventListener("click", () => {
    takePicture(canvas4, video4);
    btnShoot4.disabled = true;  //btnShoot4 비활성화
    btnNext.disabled = false;
    message.innerHTML = "꾸미러 가기 💫";
});

//  페이지 이동 버튼 클릭 이벤트 핸들러
function movePage(nextPageUrl){
    window.location.href = nextPageUrl;
}

btnNext.addEventListener("click", () => {
    // 다음 페이지 URL로 이동하면서 이미지 데이터를 전달
    let nextPageUrl = '';
    if(window.location.href.includes("vertical.html")){
        //  vertical.html에서 버튼 클릭 시
        nextPageUrl = '../Decoration/decoVertical.html';
    }else if(window.location.href.includes("horizontal.html")){
        //  horizontal.html에서 버튼 클릭 시
        nextPageUrl = '../Decoration/decoHorizontal.html';
    }
    
    console.log("nextPageUrl :", nextPageUrl);
    movePage(nextPageUrl);
});

