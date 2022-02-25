var id = para['id'];
var width = para['width'];
var height = para['height'];
var divName = document.getElementById(para['divName']);

var div1 = document.createElement('div');
div1.id = 'main';
div1.style.width = width+'px';
div1.style.height = height+'px';
div1.style.border = '2px solid gray';

divName.appendChild(div1);

var buttonPlace = document.createElement('iframe');
buttonPlace.id = 'buttonPlace'
buttonPlace.frameBorder = 0;
buttonPlace.style.width = width+'px';
buttonPlace.style.height = height*0.08+'px';
buttonPlace.style.background = 'gray';
buttonPlace.addEventListener('load',function(){
    buttonPlace.contentDocument.body.style.overflow = 'hidden';
    CreateButton('Bold');
    CreateButton('Italic');
    CreateButton('Underline');

    var fontSizeList = {'key':'size','10px':1, '14px':2, '16px':3, '18px':4, '32px':5, '48px':6};
    var fontFamList = {'key':'family','굴림':'굴림','궁서':'궁서','휴먼엑스포':'휴먼엑스포','HY엽서L':'HYPost','휴먼매직체':'휴먼매직체','훈민정음체':'문체부 훈민정음체'};
    var fontColList = {'key':'color','검정':'black','빨강':'red','파랑':'blue','초록':'green','노랑':'yellow','주황':'orange','회색':'gray'};

    CreateSelect(fontSizeList);
    CreateSelect(fontFamList);
    CreateSelect(fontColList);
})
div1.appendChild(buttonPlace);

var editPlace = document.createElement('iframe');
editPlace.id = 'editPlace'
editPlace.src = 'about:blank';
editPlace.frameBorder = 0;
editPlace.style.width = width+'px';
editPlace.style.height = height*0.92+'px';
editPlace.addEventListener('load',function(){
    editPlace.contentDocument.body.contentEditable = 'true';
    editPlace.contentDocument.spellcheck = 'false';
    editPlace.contentDocument.body.style.fontFamily = '굴림';
    editPlace.contentDocument.body.style.fontSize = '14px';
    editPlace.contentDocument.body.style.wordBreak = 'break-all';
    //editPlace.contentDocument.body.style.zoom = 1.5;
    //editPlace.contentDocument.body.style.overflow = 'hidden';
    //editPlace.contentDocument.body.style.textOverflow= 'hidden';
})
div1.appendChild(editPlace);

function CreateButton(buttonName){
    var but1 = document.createElement('input');
    but1.id = buttonName;
    but1.type = 'button';
    but1.value = buttonName;
    but1.onclick = function(){
        editPlace.contentDocument.execCommand(buttonName);
        editPlace.contentWindow.focus();
    }
    buttonPlace.contentDocument.body.appendChild(but1);
}

function CreateSelect(list){
    var select = document.createElement('select');
    select.id = 'select '+ifKey;
    buttonPlace.contentDocument.body.appendChild(select);

    for(var i in list){
        if(i == 'key'){
            continue
        }
        var temp = document.createElement('option');
        temp.setAttribute('value', list[i])
        temp.innerText = i;
        temp.id = list['key']+i;
        if(i=='14px'){
            temp.selected = true;
        }
        select.appendChild(temp);
        var ifKey = list['key'];
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