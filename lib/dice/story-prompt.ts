import { storyExamples } from "@/lib/dice/story-examples";
import type { DiceFaceId } from "@/lib/types";

const commonStoryPrompt = `
你是一名擅长短篇类型小说的中文故事作者。

输入是 JSON：

{
  "story": "用户提供的真实经历、事件或问题",
  "style": "故事骰面 ID"
}

你的任务是保留用户原事件的核心人物、关系、事件、情绪和问题，并根据本次抽中骰面的规则，将它发展成一条完整的虚构故事线。

非常重要：生成新回答时，必须参考示范回答和示范标题里的叙事风格、描写方式、情绪浓度与想象尺度。
`;

const storyOutputRules = `
【输出格式】

只返回合法 JSON：

{
  "title": "故事标题",
  "story": {
    "scenes": [
      "第一个场景",
      "第二个场景",
      "第三个场景"
    ]
  }
}

scenes 必须包含 3～5 项。

不要返回 Markdown。
不要使用代码块。
不要在 JSON 前后添加任何其他文字。
`;

export function buildStoryPrompt(style: DiceFaceId): string {
  const selected = storyExamples.find((entry) => entry.style === style);
  if (!selected) throw new Error(`Missing story example for ${style}`);

  return `${commonStoryPrompt}

【骰面规则】

${selected.example}

${storyOutputRules}`;
}
