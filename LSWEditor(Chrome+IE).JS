// 인자값 저장
var id = para['id'];
var width = para['width'];
var height = para['height'];
var divName = document.getElementById(para['divName']);
var ie = false;
if(isIE()){ // 브라우저가 IE인지 값 저장
    ie = true;
}

// 전체영역 div
var div1 = document.createElement('div');
div1.id = 'main';
div1.style.width = width+'px';
div1.style.height = height+'px';
div1.style.border = '2px solid gray';
div1.style.overflow = 'hidden';

divName.appendChild(div1); // 받아온 div아래에 에디터 추가

// 버튼영역
var buttonPlace = document.createElement('iframe');
buttonPlace.id = 'buttonPlace'
buttonPlace.frameBorder = 0;
buttonPlace.style.width = width+'px';
buttonPlace.style.height = height*0.12+'px';
buttonPlace.style.background = 'gray';
buttonPlace.addEventListener('load',function(){ // 버튼영역의 iframe이 로드 되면 실행 (오류방지)
    var buttonPlace_div1 = document.createElement('div'); // 버튼영역 1번째 줄
    buttonPlace_div1.id = 'buttonPlace_div1'
    buttonPlace.contentDocument.body.appendChild(buttonPlace_div1);
    var buttonPlace_div2 = document.createElement('div'); // 버튼영역 2번째 줄
    buttonPlace_div2.id = 'buttonPlace_div2'
    buttonPlace.contentDocument.body.appendChild(buttonPlace_div2);

    buttonPlace.contentDocument.body.style.overflow = 'hidden'; // 버튼영역 늘어남 방지

    // 1번째 줄 버튼 추가
    var bold = CreateButton('Bold','Bold',buttonPlace_div1);
    bold.style.fontWeight = 'bold';
    var italic = CreateButton('Italic','Italic',buttonPlace_div1);
    italic.style.fontStyle = 'italic';
    var underline = CreateButton('Underline','Underline',buttonPlace_div1);
    underline.style.textDecoration = 'underline';
    var strikethrough = CreateButton('Throughline','StrikeThrough',buttonPlace_div1);
    strikethrough.style.textDecoration = 'line-through';

    // 1번째 줄 셀렉트박스 추가
    var defaultFont = window.getComputedStyle(document.body,null).getPropertyValue("font-family");
    var fontSizeList = {'key':'size','10px':1, '13px':2, '16px':3, '18px':4, '24px':5, '32px':6, '48px':7};
    var fontFamList = {'key':'family','기본글꼴':defaultFont,'맑은 고딕':'맑은 고딕','굴림':'굴림','궁서':'궁서','휴먼엑스포':'휴먼엑스포','HY엽서L':'HYPost','휴먼매직체':'휴먼매직체','훈민정음체':'문체부 훈민정음체'};
    var fontColList = {'key':'color','검정':'black','빨강':'red','파랑':'blue','초록':'green','노랑':'yellow','주황':'orange','회색':'gray','흰색':'white'};
    var backColList = {'key':'backcolor','검정':'black','빨강':'red','파랑':'blue','초록':'green','노랑':'yellow','주황':'orange','회색':'gray','흰색':'white'};
    CreateSelect(fontSizeList,buttonPlace_div1);
    CreateSelect(fontFamList,buttonPlace_div1);
    CreateSelect(fontColList,buttonPlace_div1);
    CreateSelect(backColList,buttonPlace_div1);
    
    // 2번째줄 버튼 추가
    CreateButton('Full','justifyFull',buttonPlace_div2);
    CreateButton('Left','justifyleft',buttonPlace_div2);
    CreateButton('Center','justifycenter',buttonPlace_div2);
    CreateButton('Right','justifyright',buttonPlace_div2);

    // 미리보기 버튼 추가
    var prevBut = document.createElement('button');
    prevBut.id = 'prevBut';
    prevBut.innerText = 'Preview';
    prevBut.onclick = function(){PreViewPop('test')};
    prevBut.style.float = 'right';
    buttonPlace_div1.appendChild(prevBut);
})

div1.appendChild(buttonPlace); // 전체영역에 버튼영역 추가

// 에디터영역
var editPlace = document.createElement('iframe');
editPlace.id = 'editPlace'
editPlace.src = 'about:blank';
editPlace.frameBorder = 0;
editPlace.style.width = width+'px';
editPlace.style.height = height*0.88+'px';
editPlace.addEventListener('load',function(){ // 에디터영역의 iframe이 로드 되면 실행 (오류방지)
    editPlace.contentDocument.body.contentEditable = 'true'; // 수정가능한 iframe으로 생성
    editPlace.contentDocument.body.style.wordBreak = 'break-all'; // 줄바꾸기 설정
    //editPlace.contentDocument.body.style.overflowY = 'hidden';
    // IE용 사이즈 조절
    if(ie){
    buttonPlace.style.height = height*0.14+'px';
    editPlace.style.height = height*0.86+'px';
    editPlace.contentDocument.body.style.marginRight = '0px';
}
})

div1.appendChild(editPlace);

function CreateButton(buttonName, buttonValue, div){ // 버튼 생성 함수
    var but1 = document.createElement('button');
    but1.id = buttonName;
    but1.value = buttonValue;
    but1.innerText = buttonName;
    but1.onmousedown = function(e){
        if(e.target.id=="editPlace"){
    
        }
        else{
          e.preventDefault();
        }
        if(ie){
            ForIE(buttonValue,false,null);
        }
        else{
            editPlace.contentDocument.execCommand(buttonValue,false,null);
        } 
    }
    div.appendChild(but1);

    return but1;
}

function CreateSelect(list,div){ // 셀렉트박스 생성 함수
    var select = document.createElement('select');
    var ifKey = list['key'];
    select.id = 'select '+ifKey;
    div.appendChild(select);

    for(var i in list){
        var temp = document.createElement('option');
        if(i == 'key'){
            if(ifKey=='size'){
                temp.innerText = '글자크기';
                temp.id = '글자크기';
            }
            else if(ifKey=='family'){
                temp.innerText = '글꼴';
                temp.id = '글꼴';
            }
            else if(ifKey=='color'){
                temp.innerText = '글자색';
                temp.id = '글자색';
            }
            else if(ifKey=='backcolor'){
                temp.innerText = '글배경색';
                temp.id = '글배경색';
                temp.selected = true;
            }
            select.appendChild(temp);
        }
        else{
            temp.setAttribute('value', list[i])
            temp.innerText = i;
            temp.id = list['key']+i;
            
            if(i=='16px'){
                temp.selected = true;
            }
            if(i=='기본글꼴'){
                temp.selected = true;
            }
            if(i=='검정' && list['key']=='color'){
                temp.selected = true;
            }
            
            if(ifKey=='family'){
                temp.style.fontFamily = list[i];
            }
            else if(ifKey=='color'){
                temp.style.backgroundColor = 'rgb(207, 207, 207)'
                temp.style.color = list[i];
            }
            else if(ifKey=='backcolor'){
                temp.style.backgroundColor = list[i];
                temp.style.color = 'rgb(207, 207, 207)';
            }

            select.appendChild(temp);

            select.onmousedown = function(){
                if(this.id=='select size'){
                    buttonPlace.contentDocument.getElementById('글자크기').selected = true;
                }
                else if(this.id=='select family'){
                    buttonPlace.contentDocument.getElementById('글꼴').selected = true;
                }
                else if(this.id=='select color'){
                    buttonPlace.contentDocument.getElementById('글자색').selected = true;
                }
                else if(this.id=='select backcolor'){
                    buttonPlace.contentDocument.getElementById('글배경색').selected = true;
                }
            }

            select.onchange = function(m) {
                if(ifKey=='size'){
                    ChangeFontSize(select.options[select.selectedIndex].value)
                }
                else if(ifKey=='family'){
                    ChangeFontfamily(select.options[select.selectedIndex].value)
                }
                else if(ifKey=='color'){
                    ChangeFontColor(select.options[select.selectedIndex].value)
                }
                else if(ifKey=='backcolor'){
                    ChangeBackColor(select.options[select.selectedIndex].value)
                }
                editPlace.contentDocument.body.focus();
            }
        }
    }
}

function ChangeFontfamily(font){ // 폰트 변경 함수
    if(ie){
        ForIE("FontName",false,font);
    }
    else{
        editPlace.contentDocument.execCommand("FontName",false,font);
    }
}

function ChangeFontSize(size){ // 폰트 사이즈 변경 함수
    if(ie){
        ForIE("FontSize",false,size);
    }
    else{
        editPlace.contentDocument.execCommand("FontSize",false,size);
    }
}

function ChangeFontColor(color){ // 폰트 생상 변경 함수
    if(ie){
        ForIE("ForeColor",false,color);
    }
    else{
        editPlace.contentDocument.execCommand("ForeColor",false,color);
    }
}

function ChangeBackColor(color){ // 폰트 생상 변경 함수
    if(ie){
        ForIE("BackColor",false,color);
    }
    else{
        editPlace.contentDocument.execCommand("BackColor",false,color);
    }
}

function PreViewPop(content){ // 미리보기 팝업 함수
    if(ie){
        window.open("LSWEditor_Preview.html",content,'width='+width+',height='+editPlace.offsetHeight+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes');    
    }
    else{
        window.open("LSWEditor_Preview.html",content,'width='+width*1.1+',height='+editPlace.offsetHeight+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no');
    }
}

function isIE() { // 브라우저 IE 체크 함수
    return document.all || (!!window.MSInputMethodContext && !!document.documentMode);
}

function ForIE(param1, param2, param3){ // 브라우저 IE 면 selection, range도 적용
    var s = editPlace.contentDocument.getSelection();
    var selRange = s.getRangeAt(0);

    var newNode = editPlace.contentDocument.createTextNode('d');
    selRange.insertNode(newNode);
    s.removeAllRanges();
    s.addRange(selRange);

    editPlace.contentDocument.execCommand(param1,param2,param3);

    selRange.setStart(newNode, 0);
    selRange.setEnd(newNode, 1);
    selRange.deleteContents();

    s.removeAllRanges();
    s.addRange(selRange);
}