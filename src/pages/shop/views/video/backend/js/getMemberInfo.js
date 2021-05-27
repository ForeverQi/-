import {
    setMealQuery
} from "@/api/shop/video.bac";

/**
 * @Date: 2020-02-13 22:08:57
 * @LastEditors: qwguo
 * @LastEditTime: Do not edit
 * @description: 获取会员信息方法
 * @param {type} 参数说明
 * @return: 返回值
 */
export async function getMemberInfo() {
    let variable = await setMealQuery({}).then(data => {
        let Member = {};
        for (let key in data) {
            Member[key] = data[key];
        }
        // 计算流量使用比例
        // Member.userFlowPer = (Member.userUseFlowBytes / Member.userFlowBytes) * 100;
        // 计算空间使用比例
        // Member.userSpacePer = (Member.userUseSpaceBytes / Member.userSpaceBytes) * 100;
        // 计算剩余流量
        // Member.surplusFlow = Member.userFlowBytes - Member.userUseFlowBytes;
        // 计算剩余空间
        // Member.surplusSpace = Member.userSpaceBytes - Member.userUseSpaceBytes;
        // 计算剩会员余天数
        if(Member.vipEndDate){
            let endTime = new Date(Member.vipEndDate),
                nowTime = new Date();
            Member.surplusDay = ((endTime.getTime() - nowTime.getTime())/1000/60/60/24).toFixed(0);
        }else{
            Member.surplusDay = 0;
        }
        return Member;
    });
    return variable;
}

