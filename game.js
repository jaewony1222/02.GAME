let computer = {
    score : 0,
    percentball: 0.4,
    percentstrike: .85, //스트라이크 확률= .85-.03 = .82
    percenthit: 0.8, //헛스윙
    percenthomerun: 0.03,
}
//사용자 object
let userScore = {
    score : 0,
    percentball: 0.4,
    percentstrike: .85,
    percenthit: 0.8,
    percenthomerun: 0.03,
}
let ru = 0;
//컴퓨터,사용자 점수
let jumsu = document.querySelector(".jsp");
//스트라이크,볼,아웃 카운트
let sboCount = document.querySelectorAll(".sbo");
let s=0;
let b=0;
let o=0;
//이닝,점수
let comsc= 1; //회;
let inning = document.querySelector(".count");
//안타,헛스윙
// let hitcount = document.querySelector("");
// let nohitcount = document.querySelector("");
//버튼
let computerBtn = document.querySelectorAll(".twins");
let userBtn = document.querySelectorAll(".Lg");
// 현재 회 (말일때, 3아웃이 되면 ++ 해줄 것임)
let hey = 0;
//볼일때 스트라이크일때 안타 or 홈런쳤을때 <컴퓨터>
let mungu = document.querySelector("#mungu");
let comtotal = 0;
let usertotal = 0;
const cho = document.querySelectorAll(".cho");
const mal = document.querySelectorAll(".mal");
function ballbtn(){
    let randomDice= Math.random();
    sboCount[0]=s;
    sboCount[1]=b;
    sboCount[2]=o;
    if(computer.percenthomerun>randomDice){
        computerHomeRun();
    }
    else if( computer.percentball>randomDice){
        b++;
        mungu.innerHTML="볼";
        sboCount[1].innerHTML=b;
        if(b>=4){
            mungu.innerHTML="포볼";
            computerScoreUp();
            //포볼일때 카운트 초기화
            s=0;
            b=0;
            rooUp();
            //화면에 출력
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
        }
    }else if(computer.percenthit>randomDice){
        s++;
        mungu.innerHTML="헛스윙!";
        sboCount[0].innerHTML=s;
        //헛스윙 3번시 아웃
        if(s==3){
            s=0;
            b=0;
            o++;
            sboCount[2].innerHTML=o;
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
            mungu.innerHTML="삼진아웃!"
        }
        //아웃 3번시 공수교체
        if(o>=3){
            o=0;
            //ball도 같이 바뀌는거
            s=0;
            //화면에 볼도 바뀌는걸 출력
            sboCount[0].innerHTML=s;
            sboCount[2].innerHTML=o;
            mungu.innerHTML="쓰리아웃! 공수교체!";
            change();
            computerturnend();
            inning.innerHTML = (`${comsc}회말`);
        }
    } 
    //볼을 던져도 안타를 칠 수 있으니. 
    else {
        computerScoreUp();
        rooUp();
        s=0;
        b=0;
        sboCount[0].innerHTML=s;
        sboCount[1].innerHTML=b;
        mungu.innerHTML="안타!";      
    }
}
function strikebtn(){
    let randomDice= Math.random();
    sboCount[0]=s;
    sboCount[1]=b;
    sboCount[2]=o;
    if(computer.percenthomerun>randomDice){
        computerHomeRun();
    }
    else if
    (computer.percentstrike>randomDice){
        s++;
        mungu.innerHTML="스트라이크!";
        sboCount[0].innerHTML=s;
        if(s>=3){
            s=0;
            sboCount[0].innerHTML=s;
            o++;
            mungu.innerHTML+=" 아웃!";
            sboCount[2].innerHTML=o;
            //쓰리아웃일때
        if(o>=3){
            o=0;
            //ball도 같이 바뀌는거
            b=0;
            //화면에 볼도 바뀌는걸 출력
            sboCount[1].innerHTML=b;
            sboCount[2].innerHTML=o;
            mungu.innerHTML="쓰리아웃! 공수교체!";
            change();
            computerturnend();
            inning.innerHTML = (`${comsc}회말`);
        }
        }
    }
    else {
        computerScoreUp();
        rooUp();
    //안타를 치면 카운트 초기화
        s=0;
        b=0;
        sboCount[0].innerHTML=s;
        sboCount[1].innerHTML=b;
        mungu.innerHTML="안타!";
    }
}
let roo= document.querySelectorAll(".roo");
function rooUp(){
    ru++;
    ru= Math.min(ru,3)
    for(let i = 0; i<ru; i++){
        roo[i].classList.add("on");
        roo[i].style.opacity = 1;
    }    
}
function computerScoreUp(){
    if(ru==3){
        computer.score++;
        cho[comsc-1].innerHTML=computer.score;
        comtotal++; 
        jumsu.innerHTML = (`${comtotal}:${usertotal}`);


    }
}

function computerHomeRun(){
    computer.score+= ru+1;
    cho[comsc-1].innerHTML=computer.score;
    comtotal+= ru+1; 
    jumsu.innerHTML = (`${comtotal}:${usertotal}`);
    ru=0;
    mungu.innerHTML=`<marquee>HOMERUN!HOMERUN!HOMERUN!</marquee>`
    for(let i = 0; i<3; i++){
        roo[i].classList.remove("on");
        roo[i].style.opacity = .5;
    }   
}
function userHomeRun(){
    userScore.score+= ru+1;
    mal[comsc-1].innerHTML=userScore.score;
    usertotal+= ru+1; 
    jumsu.innerHTML = (`${comtotal}:${usertotal}`);
    ru=0;
    mungu.innerHTML=`<marquee>HOMERUN!HOMERUN!HOMERUN!</marquee>`
    for(let i = 0; i<3; i++){
        roo[i].classList.remove("on");
        roo[i].style.opacity = .5;
    } 
}

function userScoreUp(){
    if(ru==3){
        userScore.score++;
        mal[comsc-1].innerHTML=userScore.score;
        usertotal++;
        jumsu.innerHTML = (`${comtotal}:${usertotal}`);

    }
}
function computerturnend(){
    for(
    let i = 0; i<computerBtn.length; i++){
    computerBtn[i].style.display = "none";
    userBtn[i].style.display = "inline-block";
    }
    for(let i = 0; i<ru; i++){
        roo[i].classList.remove("on");
        roo[i].style.opacity = 0.5;
    }
    ru=0;

}
function userturnend(){
    for(
    let i = 0; i<userBtn.length; i++){
    computerBtn[i].style.display = "inline-block";
    userBtn[i].style.display = "none";
    }
    for(let i = 0; i<ru; i++){
        roo[i].classList.remove("on");
        roo[i].style.opacity = 0.5;
    }
    ru=0;
}
//
function hitbtn(){
    let randomDice= Math.random();
    console.log(randomDice);
    sboCount[0]=s;
    sboCount[1]=b;
    sboCount[2]=o;
    if(userScore.percenthomerun>randomDice){
        userHomeRun();
    }
    else if(userScore.percentball>randomDice){
        b++;
        mungu.innerHTML="볼";
        sboCount[1].innerHTML=b;
        if(b>=4){
            mungu.innerHTML="포볼";
            userScoreUp();
            //포볼일때 카운트 초기화
            s=0;
            b=0;
            rooUp();
            //화면에 출력
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
        }
    }else if(userScore.percenthit>randomDice){
        s++;
        mungu.innerHTML="헛스윙!";
        sboCount[0].innerHTML=s;
        if(s>=3){
            s=0;
            b=0;
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
            o++;
            mungu.innerHTML+=" 아웃!";
            sboCount[2].innerHTML=o;
            //쓰리아웃일때
        if(o>=3){
            o=0;
            //ball도 같이 바뀌는거
            b=0;
            s=0;
            //화면에 볼도 바뀌는걸 출력
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
            sboCount[2].innerHTML=o;
            mungu.innerHTML="쓰리 아웃! 공수교체!";
            change();
            comsc++;
            computer.score= 0;
            userScore.score= 0;     
            userturnend();
            inning.innerHTML = (`${comsc}회초`);
        }
        }
    } 
    //볼을 던져도 안타를 칠 수 있으니. 
    else {
        userScoreUp();
        rooUp();
        s=0;
        b=0;
        sboCount[0].innerHTML=s;
        sboCount[1].innerHTML=b;
        mungu.innerHTML="안타!";
    }
}

const glass= document.querySelector("#glass")
function change(){ 
    glass.classList.add("show")
    setTimeout(function(){
        glass.classList.remove("show")
        glass.classList.add("show2")
    },1000)
    setTimeout(function(){
        glass.classList.remove("show2")
    },2000)

}

function stopbtn(){
    let randomDice= Math.random();
    sboCount[0]=s;
    sboCount[1]=b;
    sboCount[2]=o;

    if(.5>randomDice){
        s++;
        mungu.innerHTML="스트라이크!"
        sboCount[0].innerHTML=s;
        if(s>=3){
            s=0;
            b=0;
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
            o++;
            mungu.innerHTML+=" 아웃!";
            sboCount[2].innerHTML=o;
            //쓰리아웃일때
        if(o>=3){
            o=0;
            //ball도 같이 바뀌는거
            b=0;
            s=0;
            //화면에 볼도 바뀌는걸 출력
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
            sboCount[2].innerHTML=o;
            mungu.innerHTML="삼진 아웃! 공수교체!";
            change();
            userturnend();
            inning.innerHTML = (`${comsc}회초`);
            }
        }
    }else{
        b++;
        mungu.innerHTML="볼!"
        sboCount[1].innerHTML=b;
        if(b>=4){
            mungu.innerHTML="포볼";
            userScoreUp();
            //포볼일때 카운트 초기화
            s=0;
            b=0;
            rooUp();
            //화면에 출력
            sboCount[0].innerHTML=s;
            sboCount[1].innerHTML=b;
        }
    }
}
//마지막 베이스(roo)로 들어올때마다 1점씩 추가