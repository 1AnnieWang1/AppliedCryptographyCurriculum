var a = document.getElementById("CaesarIn");//获取Caesar.html中文本框CaesarIn输入
var b = document.getElementById("CaesarOut");//获取Caesar.html中文本框CaesarOut输出
var n = document.getElementById("num");//获取Caesar.html中文本框num偏移量
var l = a.value.length;//计算输入的长度
var result="";
var temp = "";
var ch;
var move;

//初始化
function initial() {
	a = document.getElementById("CaesarIn");
	b = document.getElementById("CaesarOut");
	n = document.getElementById("num");
	l = a.value.length;

	result = "";
	temp = "";
}

//凯撒密码加密
function Encryption() {
	
	initial();
  move = parseInt(n.value);

	//字符串循环加上n个偏移量
	for (var i = 0; i < l; i++) {
    ch = a.value[i].charCodeAt();
		if(ch>=48&&ch<=57)
      temp = (ch-48+move)%10+48;
    else if(ch>=65&&ch<=90)
      temp = (ch-65+move)%26+65;			
		else if(ch>=97&&ch<=122)
			temp = (ch-97+move)%26+97;
    else if(ch>=19968&&ch<=171941)
      temp = (ch-19968+move)%151974+19968;
    else
      temp = ch;
		result = result +String.fromCharCode(temp);
	}
	
	 b.innerHTML = result;//在文本框中输出

}

//凯撒密码解密
function Decryption() {
	
	initial();
  move = parseInt(n.value);

	//字符串循环减去n个偏移量
	 for (var i = 0; i < l; i++) {
    ch = a.value[i].charCodeAt();
    if(ch>=48&&ch<=57)
      temp = (ch-48-move+10)%10+48;
    else if(ch>=65&&ch<=90)
      temp = (ch-65-move+26)%26+65;      
    else if(ch>=97&&ch<=122)
      temp = (ch-97-move+26)%26+97;
    else if(ch>=19968&&ch<=171941)
      temp = (ch-19968-move+151974)%151974+19968;
    else
      temp = ch;
    result = result +String.fromCharCode(temp);
  }
	
	 b.innerHTML = result;//在文本框中输出

}

//文件加密
$("#CaesarFileEncrypt").click(function(){//点击文件加密按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#CaesarEncryptFiles").click();
    });

function CaesarEncryptFile(){
    var selectedFile = document.getElementById("CaesarEncryptFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击加密按钮算法一致
       a.innerHTML = content;
       Encryption();
       content = b.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "凯撒加密结果.txt");//saveAs(blob,filename)
    };  
}

//文件解密
$("#CaesarFileDecrypt").click(function(){//点击文件解密按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#CaesarDecryptFiles").click();
    });

function CaesarDecryptFile(){
    var selectedFile = document.getElementById("CaesarDecryptFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击解密按钮算法一致
       a.innerHTML = content;
       Decryption();
       content = b.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "凯撒解密结果.txt");//saveAs(blob,filename)
    };  
}