import { storyExamples } from "@/lib/dice/story-examples";
import type { DiceFaceId } from "@/lib/types";

const commonStoryPrompt = `
你是一名擅长短篇类型小说的中文故事作者。

输入是 JSON：

{
  "story": "用户提供的真实经历、事件或问题",
  "style": "故事骰面 ID"
}

你的任务是保留用户原事件的核心人物、关系、事件、情绪和问题，并根据本次抽中骰面的规则，将它发展成一条完整的虚构故事线。除非用户明确指定其他叙事视角，故事默认以第一人称“我”展开，用户本人即故事中的“我”。故事内部必须因果自洽，关键事件和结尾反转必须能从前文逻辑自然成立。

非常重要：示范回答是新故事在叙事风格、描写方式、情绪浓度与想象尺度上的主要标准。生成时必须主动吸收这些特征，使新故事达到与示范相近的叙事质感。但必须根据用户提供的事件和问题重新发展剧情，而不是死板套用示范的剧情。
故事标题也必须单独参考示范标题的命名方式，包括语气、信息量、荒诞感与吸引力，而不是仅概括故事内容。

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

scenes 必须包含 2～5 项，按故事发生的先后顺序排列。
每个 scene 都必须是至少 40 字的完整故事段落，包含具体事件或人物行动，并推进情节；不能只写一句概括。
不要把字段名、场景编号、格式说明、写作思考、自我检查或错误信息写进 scene。最后一个 scene 必须把故事讲完。

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
