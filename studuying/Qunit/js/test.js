/**
 * Created by Administrator on 2017/2/23 0023.
 */
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
    return Power;
}
test("basics", function() {
   var personPower=["00101","001","1100"]
    equal( mergeRightValue(["00101","001","1100"]), "11101", "正确" );
    equal( mergeRightValue(["000","000","000000"]), "000000", "正确" );
    equal( mergeRightValue(["01","00000"]), "01000", "正确" );
    equal( mergeRightValue(["001"]), "001", "正确" );
    equal( mergeRightValue(["1","000000","11"]), "110000", "正确" );
    equal( mergeRightValue(["1101","0010","1000","0000"]), "1111", "正确" );
    equal( mergeRightValue(["1","0","1"]), "1", "正确" );
    equal( mergeRightValue(["0000000000","100000000000"]), "100000000000", "正确" );
    equal( mergeRightValue(["10000000000000000000000000000000000000000000000","111000000000000000000000000000000000000000000000000000000000000000000000000000000"]), "111000000000000000000000000000000000000000000000000000000000000000000000000000000", "错误" );
    equal( mergeRightValue(["1","0","0"]), "1", "正确" );
});