var a = document.getElementById("FrequencyIn");//获取Frequency.html文本框FrequencyIn输入
var b = document.getElementById("FrequencyOut");//获取Frequency.html文本框FrequencyOut输出
var model = document.getElementById("model");//获取Frequency.html文本框model模板字符
var l = a.value.length;//计算输入的长度
var len = model.value.length;//计算模板字符长度
var b_result="";
var temp = "";
var sum = new Array(26);

//初始化
function initial() {
	a = document.getElementById("FrequencyIn");
	b = document.getElementById("FrequencyOut");
	model = document.getElementById("model");
	l = a.value.length;
	len = model.value.length;

	b_result = "";
	temp = "";
	for(var i=0; i<26; i++)
	{
		sum[i]=0;
	}
}


//在网页中实现的频率统计方法 
function Frequency() {
	initial();
	count_letter();
	BruteForceStringMatch();
	b.innerHTML = b_result;
}

function count_letter() {
	
	//var reg= /^[A-Za-z]+$/;
	for(var i=0; i<l; ++i)
	{	//if(reg.test(a.value[i]))
		++sum[a.value[i].charCodeAt()-97];//将选取的字母转化为数字后减去97，存入数组对应下标的空间
	}

	for(var i=0; i<26; ++i)
	{
		b_result = b_result + String.fromCharCode(i+97) + ": " + sum[i] + "\n";
	}

}


function BruteForceStringMatch() {
	var num = 0;
	var location = new Array(100);
	for(var i in location) location[i]=0;
	var index=0;
	
	b_result = b_result + "匹配结果：\n" ;
	for (var i = 0; i<l - len + 1; i++)
	{
		var j = 0;
		while (j<len&&model.value[j] == a.value[i + j])
		{
			++j;
		}
		if (j == len)
		{
			++num;
			b_result = b_result + "匹配成功，从第"  +(i+1)+ "个位置开始\n" ;
			location[index++] = i;
		}
	}
	
	if (num != 0)
	{
		b_result = b_result + "字符串中共成功匹配" + num + "次\n" ;
		
		b_result = b_result + "字符串在文中的位置是（用*表示）：\n" ;
		index = 0;
		for (var temp1 = 0; temp1 < l;)
		{			
			if (location[index] == temp1)
			{
				for (var temp2 = 0; temp2 < len; ++temp2)
				{
					b_result = b_result + "*";
					++temp1;
				}
				++index;
			}
			else
			{
				b_result = b_result + a.value[temp1];
				++temp1;
			}
		}
		b_result = b_result + "  ";
	}
	else
	{
		b_result = b_result + "匹配不成功" ;
	}
}


//文件解密
$("#FrequencyFileDecrypt").click(function(){//点击导入按钮，使files触发点击事件，然后完成读取文件的操作。
        $("#FrequencyFiles").click();
    });

function FrequencyFile(){
    var selectedFile = document.getElementById("FrequencyFiles").files[0];//获取读取的File对象
    var reader = new FileReader();//这里是核心！！！读取操作就是由它完成的。
    reader.readAsText(selectedFile,"gb2312");//读取文件的内容
    
    //读取完文件内容之后的操作
    reader.onload = function(){

       var content = this.result;//将读到txt文本内容放到content中
       
       //与点击解密按钮算法一致
       a.innerHTML = content;
       Frequency();
       content = b.value;

       //新建txt文件，将b文本框中的内容存入此文件
       var blob = new Blob([content], {type: "text/plain;charset=utf-8"});
       saveAs(blob, "频率统计分析结果.txt");//saveAs(blob,filename)
    };  
}