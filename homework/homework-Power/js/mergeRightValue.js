/**
 * 合并权限
 * @param rightValues 权限的二进制字符串 例如 1000、11111100、1001010100
 * @return 合并后的权限 1111110000
 */

var personPower = ["1", "111000000000000000000000000000000000000000000000000000000000000000000000000000000"];//这里代表合并之前的权限
//思路就是，两两合并出一个新权限，再与下一个权限合并，用一个数组来存着两两合并后的权限，然后与要合并的下一个权限一位一位比较，如果有1，合并后就是1，
//如果都没有1，那就是0.如果当前权限与下一个权限位数不同，那就用0代替。
//最后把存着新权限的数组转成字符串 返回
function mergeRightValue(personPower) {
    var Power=[];
    for(var i=0;i<personPower.length;i++){//遍历每一个权限
        for(var j=0;j<personPower[i].length;j++){//对比权限的某一位
            if(Power[j]==undefined){
                Power[j]="0";
            }
            if(Power[j]=="1"||personPower[i][j]=="1"){
                Power[j] = "1";
            }else{
                Power[j] = "0";
            }
        }

    }
    Power=Power.join("");
    console.log("合并前的权限为："+personPower)
    console.log("合并后的权限为："+Power)
}
mergeRightValue(personPower)