<template>
  <div>
    <el-input v-model="inputValue" @keyup.enter="handleSubmit" />
  </div>
  <div>
    <pre class="mermaid" v-html="mermaid_data"></pre>
  </div>
</template>

<script>
import mermaid from 'mermaid'

import { ref } from 'vue'

function processDiagram(diagram) {
  // Remove the mermaid code block formatting
  diagram = diagram.replace(/```mermaid/g, '');
  diagram = diagram.replace(/```/g, '');

  // Return the processed diagram string
  return diagram;
}

const drawDiagram = async function (graphDefinition) {
  const { svg } = await mermaid.render('mermaid', graphDefinition);
  document.querySelector('.mermaid').innerHTML = svg;
};

export default {
  name: 'MermaidDiagram',
  setup() {
    const mermaid_data = ref(null)
    const inputValue = ref('')

    const handleSubmit = () => {
      // handle form submission here
      console.log("zhel" + inputValue.value)
      chatopenai(inputValue.value).then((res) => {
        const mermaid_reuslt = processDiagram(res);
        drawDiagram(mermaid_reuslt);

      })
    }
    return {
      mermaid_data,
      inputValue,
      handleSubmit
    }
  }
}

// 创建一个同步的函数，用于获取openai的返回值,"使用mermaid绘制TCP连接流程图,

async function chatopenai(content_1) {
  console.log(content_1)
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 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'
    },
    body: JSON.stringify({
      "model": "gpt-3.5-turbo",
      "messages": [{ "role": "user", "content": content_1 },],
    })
  })
  const data = await response.json()
  console.log(data);
  const mermaidRegex = /```mermaid\n([\s\S]*?)\n```/;
  // const match = data.choices[0].text.match(mermaidRegex);
  const match = typeof data.choices['0'].message.content === 'string' ? data.choices['0'].message.content.match(mermaidRegex) : null;
  console.log(match);
  const mermaidData = match ? match[1] : null;
  console.log(mermaidData);
  return mermaidData;
}
</script>

<style scoped>
.mermaid {
  text-align: center;
}
</style>
