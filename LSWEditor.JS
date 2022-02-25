class LSWEditor {
    constructor(para){
        this.id = para['id'];
        this.width = para['width'];
        this.height = para['height'];
        this.divName = document.getElementById(para['divName']);
        this.Init();
    }
    
    Init(){
        var funLsw = this;
        var div1 = document.createElement('div');
        div1.id = 'main';
        div1.style.width = this.width+'px';
        div1.style.height = this.height+'px';
        div1.style.border = '2px solid gray';

        this.divName.appendChild(div1);

        var buttonPlace = document.createElement('iframe');
        buttonPlace.id = 'buttonPlace'
        buttonPlace.frameBorder = 0;
        buttonPlace.style.width = this.width+'px';
        buttonPlace.style.height = this.height*0.08+'px';
        buttonPlace.style.background = 'gray';
        buttonPlace.addEventListener('load',function(){
            funLsw.CreateButton('Bold');
            funLsw.CreateButton('Italic');
            funLsw.CreateButton('Underline');
            
            const fontSizeList = {'key':'size','10px':1, '14px':2, '16px':3, '18px':4, '32px':5, '48px':6};
            const fontFamList = {'key':'family','굴림':'굴림','궁서':'궁서','휴먼엑스포':'휴먼엑스포','HY엽서L':'HYPost','휴먼매직체':'휴먼매직체','훈민정음체':'문체부 훈민정음체'};
            const fontColList = {'key':'color','검정':'black','빨강':'red','파랑':'blue','초록':'green','노랑':'yellow','주황':'orange','회색':'gray'};
    
            funLsw.CreateSelect(fontSizeList);
            funLsw.CreateSelect(fontFamList);
            funLsw.CreateSelect(fontColList);
        })
        div1.appendChild(buttonPlace);

        var editPlace = document.createElement('iframe');
        editPlace.id = 'editPlace'
        editPlace.src = 'about:blank';
        editPlace.frameBorder = 0;
        editPlace.style.width = this.width+'px';
        editPlace.style.height = this.height*0.92+'px';
        editPlace.addEventListener('load',function(){
            editPlace.contentDocument.body.contentEditable = 'true';
            editPlace.contentDocument.spellcheck = 'false';
            editPlace.contentDocument.body.style.fontFamily = '굴림';
            editPlace.contentDocument.body.style.fontSize = '10px';
            editPlace.contentDocument.body.style.zoom = 1.5;
        })
        div1.appendChild(editPlace);

    }

    CreateButton(buttonName){
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

    CreateSelect(list){
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
            select.appendChild(temp);
            var ifKey = list['key'];
            select.onchange = function(m) {
                if(ifKey=='size'){
                    lsw.ChangeFontSize(select.options[select.selectedIndex].value)
                }
                else if(ifKey=='family'){
                    lsw.ChangeFontfamily(select.options[select.selectedIndex].value)
                }
                else if(ifKey=='color'){
                    lsw.ChangeFontColor(select.options[select.selectedIndex].value)
                }
            }
        }
    }

    ChangeFontfamily(font){
        editPlace.contentDocument.execCommand("FontName",false,font);
    }

    ChangeFontSize(size){
        editPlace.contentDocument.execCommand("FontSize",false,size);
    }

    ChangeFontColor(color){
        editPlace.contentDocument.execCommand("ForeColor",false,color);
    }
}
