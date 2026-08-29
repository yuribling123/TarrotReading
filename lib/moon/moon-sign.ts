import { EclipticGeoMoon } from "astronomy-engine";

const zodiacSigns = [
  "白羊座",
  "金牛座",
  "双子座",
  "巨蟹座",
  "狮子座",
  "处女座",
  "天秤座",
  "天蝎座",
  "射手座",
  "摩羯座",
  "水瓶座",
  "双鱼座",
];


export function getMoonSign(date = new Date()) {
  const moon = EclipticGeoMoon(date);
  const index = Math.floor(moon.lon / 30) % 12;
  return zodiacSigns[index];
}

// 每天得到一个固定数字
export function getMoonSignMessage(moonSign: string) {
  const messages = moonSignMessages[moonSign];
  const today = new Date();
  const daySeed =
    today.getFullYear() * 1000 +
    today.getMonth() * 31 +
    today.getDate();
  const index = daySeed % messages.length; // after mod the number will be 0-2
  return messages[index];
}

export const moonSignMessages: Record<string, string[]> = {
  白羊座: [
    "跟随心动 勇敢迈出第一步",
    "抓住念头 让行动先于犹豫",
    "大胆一点 回应此刻最真实的冲动"
  ],

  金牛座: [
    "靠近喜欢 让温柔慢慢发生",
    "回到当下 感受真正值得珍惜的事",
    "放慢脚步 把时间留给舒服的人和事"
  ],

  双子座: [
    "说出心事 等待意外的回应",
    "留意讯息 答案可能藏在交谈里",
    "打开话题 也给新的可能留一点空间"
  ],

  巨蟹座: [
    "卸下防备 靠近熟悉的温暖",
    "听见情绪 它正在告诉你答案",
    "照顾自己的感受 也回应真正牵挂的人"
  ],

  狮子座: [
    "主动一点 让心意有迹可循",
    "相信自己 不必隐藏真正的渴望",
    "勇敢表达 让喜欢被看见"
  ],

  处女座: [
    "放下猜测 相信简单的答案",
    "理清纷乱 留意被忽略的细节",
    "整理思绪 不必急着给一切下结论"
  ],

  天秤座: [
    "制造相遇 回应微妙的心动",
    "感受关系 留意彼此靠近的信号",
    "回应心意 让关系自然靠近"
  ],

  天蝎座: [
    "读懂暗示 感受未说出口的话",
    "相信直觉 看见表象之下的真相",
    "留意沉默 有些心意藏在言语之外"
  ],

  射手座: [
    "跟随兴致 去赴一场小小冒险",
    "望向远处 为新的可能留个位置",
    "走出熟悉的轨迹 让意外发生"
  ],

  摩羯座: [
    "认真回应 给重要的人一点确定",
    "坚定选择 把愿望变成下一步",
    "确认方向 然后向想要的未来靠近"
  ],

  水瓶座: [
    "跳出日常 等待意外的灵感",
    "听从灵感 允许意料之外发生",
    "打破惯性 看看不同的答案"
  ],

  双鱼座: [
    "相信心动 让感觉替你指路",
    "留意梦境 潜意识正在轻声回应",
    "倾听直觉 回应心里的第一感觉"
  ]
};