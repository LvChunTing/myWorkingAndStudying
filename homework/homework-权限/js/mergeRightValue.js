var personPower=["1000","11111100","1001010100"]
function mergeRightValue(personPower) {
    var Power=[];
    for(var i=0;i<personPower.length;i++){
        for(var j=0;j<personPower[i].length;j++){
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
    console.log("合并后的权限为："+Power)
}
mergeRightValue(personPower)