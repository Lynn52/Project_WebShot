function initMap(){
    const myLatLng = {
        lat:37.4725952,
        lng:126.8863386
    };

    var locations = [
        ['망원점', 37.5550127, 126.904994, "https://naver.me/xUE1O0c8"],
        ['신림점', 37.4837245, 126.928343, "https://naver.me/GxRS7Rvz"],
        ['샤로수길점', 37.4786475, 126.955696, "https://naver.me/G9sSXCp6"],
        ['홍대점', 37.5550259, 126.922943, "https://naver.me/5snpuSyd"],
        ['연남점', 37.5592531, 126.925248, "https://naver.me/GtbWJfQe"],
        ['강남역점', 37.5018814, 127.026975, "https://m.place.naver.com/share?id=1559434769&tabsPath=%2Fhome&appMode=detail"],
    ];

    var pLocations = [
        ['건대점', 37.5417623, 127.066728, "https://naver.me/xyumQY2F"],
        ['경희대점', 37.5907825, 127.054010, "https://naver.me/xejU6Ghs"],
        ['여의도점', 37.5260098, 126.930734, "https://naver.me/FZWfDwzR"],
        ['종각점', 37.5694848, 126.985207, "https://naver.me/F8ncOgaR"],
        ['신촌점', 37.5573769, 126.936714, "https://naver.me/xUEWMMqB"],
        ['혜화점', 37.5832350, 127.000477, "https://naver.me/GNUNSAks"],
    ];

    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 13,
        center: myLatLng,
    });

    var infowindow = new google.maps.InfoWindow();

    var marker1, marker2, i, j;

    // 현재 위치 마커 추가
    var currentLocationMarker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // 현재 위치 아이콘 설정
        title: '현재 위치'
    });

    google.maps.event.addListener(currentLocationMarker, "click", function () {
        infowindow.setContent('현재 위치');
        infowindow.open(map, currentLocationMarker);
    });

    //  모노맨션 위치 마커 추가
    for(i = 0; i < locations.length; i++){
        // 각 마커의 정보창에 이름과 해당 위치에 대한 링크 추가
        let content1 = '<div><strong>' + locations[i][0] + '</strong></div>' +
              '<div><a href="' + locations[i][3] + '">지도로 이동</a></div>';
    

        marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i][1], locations[i][2]),
            map: map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        });
        

        google.maps.event.addListener(marker1, "click", (function(marker1, i){
            return function(){
                infowindow.setContent(content1);
                infowindow.open(map, marker1);
            }
        })(marker1, content1));
    }

    //  포토이즘 컬러드 위치 마커 추가
    for(j = 0; j < pLocations.length; j++){
        // 각 마커의 정보창에 이름과 해당 위치에 대한 링크 추가
        let content2 = '<div><strong>' + pLocations[j][0] + '</strong></div>' +
              '<div><a href="' + pLocations[j][3] + '">지도로 이동</a></div>';
    

        marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(pLocations[j][1], pLocations[j][2]),
            map: map,
            icon: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png'
        });
        

        google.maps.event.addListener(marker2, "click", (function(marker2, j){
            return function(){
                infowindow.setContent(content2);
                infowindow.open(map, marker2);
            }
        })(marker2, content2));
    }
}

const offlineLink1 = document.getElementById("offline1");
offlineLink1.innerHTML = '<a href="https://www.instagram.com/mono.mansion/" style="text-decoration: none; color: black;">모노 맨션( Mono Mansion )</a>';

const offlineLink2 = document.getElementById("offline2");
offlineLink2.innerHTML = '<a href="https://photoism.co.kr/brand" style="text-decoration: none; color: black;">포토이즘컬러드( Photoism Colored )</a>';

const btnHome = document.getElementById("home");
btnHome.addEventListener("click", () => {
    window.location.href = "../index.html";
});