var id = para['id'];
var width = para['width'];
var height = para['height'];
var divName = document.getElementById(para['divName']);

// 전체영역 div
var div1 = document.createElement('div');
div1.id = 'main';
div1.style.width = width+'px';
div1.style.height = height+'px';
div1.style.border = '2px solid gray';

divName.appendChild(div1);

// 버튼영역
var buttonPlace = document.createElement('iframe');
buttonPlace.id = 'buttonPlace'
buttonPlace.frameBorder = 0;
buttonPlace.style.width = width+'px';
buttonPlace.style.height = height*0.08+'px';
buttonPlace.style.background = 'gray';
buttonPlace.addEventListener('load',function(){
    buttonPlace.contentDocument.body.style.overflow = 'hidden';
    CreateButton('Bold');
    buttonPlace.contentDocument.getElementById('Bold').style.fontWeight = 'bold';
    CreateButton('Italic');
    buttonPlace.contentDocument.getElementById('Italic').style.fontStyle = 'italic';
    CreateButton('Underline');
    buttonPlace.contentDocument.getElementById('Underline').style.textDecoration = 'underline';

    var defaultFont = window.getComputedStyle(document.body,null).getPropertyValue("font-family");
    var fontSizeList = {'key':'size','10px':1, '13px':2, '16px':3, '18px':4, '24px':5, '32px':6, '48px':7};
    var fontFamList = {'key':'family','기본글꼴':defaultFont,'맑은 고딕':'맑은 고딕','굴림':'굴림','궁서':'궁서','휴먼엑스포':'휴먼엑스포','HY엽서L':'HYPost','휴먼매직체':'휴먼매직체','훈민정음체':'문체부 훈민정음체'};
    var fontColList = {'key':'color','검정':'black','빨강':'red','파랑':'blue','초록':'green','노랑':'yellow','주황':'orange','회색':'gray'};

    CreateSelect(fontSizeList);
    CreateSelect(fontFamList);
    CreateSelect(fontColList);

    // 미리보기
    var prevBut = document.createElement('button');
    prevBut.id = 'prevBut';
    prevBut.innerText = 'Preview';
    prevBut.onclick = function(){PreViewPop('test')};
    prevBut.style.float = 'right';
    buttonPlace.contentDocument.body.appendChild(prevBut);
})

div1.appendChild(buttonPlace);

// 에디터영역
var editPlace = document.createElement('iframe');
editPlace.id = 'editPlace'
editPlace.src = 'about:blank';
editPlace.frameBorder = 0;
editPlace.style.width = width+'px';
editPlace.style.height = height*0.92+'px';
editPlace.addEventListener('load',function(){
    editPlace.contentDocument.body.contentEditable = 'true';
    editPlace.contentDocument.body.style.wordBreak = 'break-all';
    editPlace.contentDocument.body.innerHTML = '<p></p>';
})
div1.appendChild(editPlace);

function CreateButton(buttonName){
    var but1 = document.createElement('button');
    but1.id = buttonName;
    but1.innerText = buttonName;
    but1.onmousedown = function(e){
        if(e.target.id=="editPlace"){
    
        }
        else{
          e.preventDefault();
        }
        editPlace.contentDocument.execCommand(buttonName,false,null); 
    }
    buttonPlace.contentDocument.body.appendChild(but1);
}

function CreateSelect(list){
    var select = document.createElement('select');
    var ifKey = list['key'];
    select.id = 'select '+ifKey;
    buttonPlace.contentDocument.body.appendChild(select,false);

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
            if(i=='검정'){
                temp.selected = true;
            }
            
            if(ifKey=='family'){
                temp.style.fontFamily = list[i];
            }
            else if(ifKey=='color'){
                temp.style.color = list[i];
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
                editPlace.contentDocument.body.focus();
            }
        }
    }
}

function ChangeFontfamily(font){
    editPlace.contentDocument.execCommand("FontName",false,font);
}

function ChangeFontSize(size){
    editPlace.contentDocument.execCommand("FontSize",false,size);
}

function ChangeFontColor(color){
    editPlace.contentDocument.execCommand("ForeColor",false,color);
}

function PreViewPop(content){
    window.open("LSWEditor_Preview.html",content,'width='+width+',height='+height+',toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no');
}