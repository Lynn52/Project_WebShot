const imageContainer = document.getElementById('galleryArea');

// 화면에 이미지를 추가하는 함수
function addImageToContainer(imageUrl) {

    // 이미지를 생성하고 설정
    var image = new Image();
    image.src = imageUrl;

    // 이미지에 .ws-gallery-item 클래스를 추가
    image.classList.add('ws-gallery-item');

    // 이미지를 div에 추가
    imageContainer.appendChild(image);
}

let imageCount = parseInt(localStorage.getItem('imageCount'));
let mergedCount = parseInt(localStorage.getItem('mergedCount'));
let mergedHCount = parseInt(localStorage.getItem('mergedHCount'));

// 로컬 스토리지에서 이미지를 검색하고 화면에 추가
for (var i = 1; i <= imageCount; i++) {
    var key = 'shot' + i;
    var imageUrl = localStorage.getItem(key);

    if (imageUrl) {
        // 이미지를 화면에 추가
        addImageToContainer(imageUrl);
    }
}

for (var k = 1; k <= mergedHCount; k++) {
    var mergedHKey = 'mergedH' + k; // 변수명을 k로 수정
    var mergedHImgUrl = localStorage.getItem(mergedHKey);

    if (mergedHImgUrl) {
        addImageToContainer(mergedHImgUrl);
    }
}

for (var j = 1; j <= mergedCount; j++) {
    var mergedKey = 'merged' + j;
    var mergedImgUrl = localStorage.getItem(mergedKey);

    if (mergedImgUrl) {
        addImageToContainer(mergedImgUrl);
    }
}

// 이미지 클릭 시 URL을 prompt로 띄우기
var galleryItems = document.querySelectorAll('.ws-gallery-item');

galleryItems.forEach(function(item) {
    item.addEventListener('click', function() {
        var imageUrl = prompt('이미지 URL을 입력하세요:', this.querySelector('img').src);
        if (imageUrl) {
            window.open(imageUrl, '_blank');
        }
    });
});

//  gallery 영역에 이미지 파일 첨부 기능
const droparea = document.getElementById("insertArea");

function dragenter(e){
    e.preventDefault();
}

function dragover(e){
    e.preventDefault();
}
        
function drop(e){
    //dataTransfer.files의 경우 드래그되는 파일 리스트가 반환됨
    var filelist = e.dataTransfer.files;
    //for문을 통해 파일 리스트의 각 파일을 불러온다.
    for(var file of filelist){
        var reader = new FileReader();
            //핵심은 각 파일마다 "img" 요소를 매번 생성하는 것
            var dropImage = document.createElement("img");

            reader.onload = function(e){
            dropImage.src = e.target.result;
            // 이미지에 .ws-gallery-item 클래스를 추가
            dropImage.classList.add('ws-gallery-item');
            imageContainer.appendChild(dropImage);
            };   

            reader.readAsDataURL(file);
            e.preventDefault();
    }        
}

droparea.addEventListener('dragenter', dragenter);
droparea.addEventListener('dragover', dragover);
droparea.addEventListener('drop', drop);