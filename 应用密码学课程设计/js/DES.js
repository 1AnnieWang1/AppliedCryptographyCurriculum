var DESIn = document.getElementById("DESIn");//获取DES.html文本框DESIn输入
var DESPsd = document.getElementById('DESPsd');//获取DES.html文本框DESPSD密钥
var DESOut  = document.getElementById('DESOut');//获取DES.html文本框DESOut输出

//获取明文或密文，以及密钥信息
function GetAll(){
	DESIn = document.getElementById("DESIn");
	DESPsd = document.getElementById('DESPsd');
}
//DES加密
function Encryption(){
	GetAll();
	DESOut.innerHTML = DES3.encrypt(DESPsd.value,DESIn.value);
}

//DES解密
function Decryption(){
	GetAll();
	DESOut.innerHTML = DES3.decrypt(DESPsd.value,DESIn.value);
}

//DES文件加密
$("#DESFileEncrypt").click(function(){//点击文件加密按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#DESEncryptFiles").click();
    });

function DESEncryptFile(){
    var selectedFile = document.getElementById("DESEncryptFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击加密按钮算法一致
       DESIn.innerHTML = content;
       Encryption();
       content = DESOut.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "DES加密结果.txt");//saveAs(blob,filename)
    };  
}

//DES文件解密
$("#DESFileDecrypt").click(function(){//点击文件解密按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#DESDecryptFiles").click();
    });

function DESDecryptFile(){
    var selectedFile = document.getElementById("DESDecryptFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击解密按钮算法一致
       DESIn.innerHTML = content;
       Decryption();
       content = DESOut.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "DES解密结果.txt");//saveAs(blob,filename)
    };  
}