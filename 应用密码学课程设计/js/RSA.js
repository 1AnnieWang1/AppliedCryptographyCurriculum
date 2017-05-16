var RSAIn = document.getElementById("RSAIn");
var RSAOut = document.getElementById("RSAOut");
var p = document.getElementById("p");
var q = document.getElementById("q");
var N = document.getElementById("N");
var L;
var E = document.getElementById("E");
var D = document.getElementById("D");
var C;
var M;
var C1;
var result;
var RSAResult="";


//求最大公约数
function gcd(x, y) {
	if(x == y)  
		return y;
	else
		gcd( y % x , x);
}

//求最小公倍数
function lcm(x, y) {
	return x * y / gcd(x, y);
}

//判断是否为素数
function IsPrime(num) {
	if (num > 1)
	{
		for (var i = 2; i <= Math.sqrt(num); i++)
		{
			if (num % i === 0)
				return false;							
		}
	}
	else
		return false;
	return true;
}

//随机生成大整数
function getRandom(){
	return Math.floor(Math.random()*10000+1000);
}


function ExtendedEuclid(f,d)
        {
            var x1, x2, x3, y1, y2, y3, t1, t2, t3, z;
            x1 = y2 = 1;
            x2 = y1 = 0;
            x3 = (f >= d) ? f : d;
            y3 = (f >= d) ? d : f;
            while (true)
            {
                if (y3 === 0)
                {
                    result = x3; /* 两个数不互素则result为两个数的最大公约数，此时返回值为零 */
                    return false;
                }
                if (y3 == 1)
                {
                    result = y2; /* 两个数互素则resutl为其乘法逆元，此时返回值为1 */
                    return true;
                }
                z = parseInt(x3 / y3);
                t1 = x1 - z * y1;
                t2 = x2 - z * y2;
                t3 = x3 - z * y3;
                x1 = y1;
                x2 = y2;
                x3 = y3;
                y1 = t1;
                y2 = t2;
                y3 = t3;
            }
        }

function change_text(num1, num2, num3) 
{
	var z = 1;
	var n = 0;
	var c = num2;
	while (c)
	{
		n++;
		c = parseInt(c / 2);
	}
	var a = new Array(n);
	for(var item in a) a[item]=0;
	c = num2;
	for (var i = n - 1; i >= 0; i--) //将num2转化为二进制表示
	{
		a[i] = c % 2;
		c = parseInt(c / 2);
	}
	for (var i = 0; i<n; i++)
	{
		z = (z*z) % num3;//逐位将z^2 mod num3赋值给z
		if (a[i] == 1)
			z = (z*num1) % num3; //置为1的位将z*num1 mod num3赋值给z
	}
	return z;
	
	
}

//获取产生的公钥密钥信息
function GetAll(){
	RSAIn = document.getElementById("RSAIn");
 	p = document.getElementById("p");
 	q = document.getElementById("q");
 	N = document.getElementById("N");
 	E = document.getElementById("E");
 	D = document.getElementById("D");
 	RSAResult = "";
}


function Encryption(){
	GetAll();
	C = change_text(RSAIn.value, E.value, N.value);

	RSAOut.innerHTML = C;
}


function Decryption(){
	GetAll();
	M = change_text(RSAIn.value, D.value, N.value);

	RSAOut.innerHTML = M;
}

function product() {
	p.value = getRandom();
	q.value = getRandom();

	//循环直到p和q都是素数
	while((!IsPrime(p.value))||(!IsPrime(q.value))||(p.value==q.value)){
		p.value = getRandom();
		q.value = getRandom();
	}

	
	N.value = p.value * q.value;
	L = (p.value-1)*(q.value-1);
	//RSAOut.innerHTML = L;

	E.value = 0;


 //循环至E与L互素
    while (true)
    {
        E.value = getRandom() % L;
        //如果加密密钥大于2，且与欧拉数公约数为1，即互素满足
        if ((E.value >= 2) &&(E.value <5000)&& ExtendedEuclid(E.value, L))
            break;
    }
    
    //求解密密钥
    var keyEn = result;
    while (keyEn < L)
        keyEn += L;
    D.value = keyEn % L;

	p.innerHTML = "p: " + p.value;
	q.innerHTML = "q: " + q.value;
	N.innerHTML = "N: " + N.value;
	E.innerHTML = "E: " + E.value;
	D.innerHTML = "D: " + D.value;

}


//文件加密
$("#RSAFileEncrypt").click(function(){//点击文件加密按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#RSAEncryptFiles").click();
    });

function RSAEncryptFile(){
    var selectedFile = document.getElementById("RSAEncryptFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击加密按钮算法一致
       RSAIn.innerHTML = content;
       Encryption();
       content = RSAOut.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "RSA加密结果.txt");//saveAs(blob,filename)
    };  
}

//文件解密
$("#RSAFileDecrypt").click(function(){//点击文件解密按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#RSADecryptFiles").click();
    });

function RSADecryptFile(){
    var selectedFile = document.getElementById("RSADecryptFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击解密按钮算法一致
       RSAIn.innerHTML = content;
       Decryption();
       content = RSAOut.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "RSA解密结果.txt");//saveAs(blob,filename)
    };  
}