<template>
  <div class="common-layout">

    <el-container>
      <el-header>
        <el-row :gutter="24"  justify="center">
          <el-col :span="1">
              <el-popover
                width="300"
                trigger="click"
                :visible="visible"
              >
              <template #reference>
                <el-button type="primary" plain :icon="Edit" />
              </template>
              <el-input v-model="inputValue1" placeholder="输入您的 Key" />
              <el-button type="primary" link @click="updatakey" style="float: right; margin-top: 8px;">确认</el-button>
              <el-button link @click="diskey" style="float: right; margin-top: 8px;">取消</el-button>
              

            </el-popover>
          </el-col>
          <el-col :span='21'>
            <el-input v-model="inputValue"  placeholder="请输入你想要绘制的流程" />
          </el-col>
          <el-col :span='2'>
            <el-button class='button' @click="handleSubmit" style="width: 100%;" >生成</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <div style="display: flex; justify-content: flex-end;">
          <el-button  class='button' @click="drawer = true">更新流程图</el-button>
          <el-button  class='button' @click="downloadImage">下载为PNG</el-button>
        </div>
        <pre class="mermaid" v-loading="loading" v-html="mermaid_data"></pre>
      </el-main>
    </el-container>
  </div>
  <el-drawer v-model="drawer" title="更新 Mermaid">
    <el-input
    v-model="textarea2"
    :rows="10"
    type="textarea"
    placeholder="Please input"
    />
    <el-row :gutter="24">
    <el-button  class='button-drawer' @click="updateDiagram">更新</el-button>
    <el-button  class='button-drawer' @click="copyToClipboard">复制文本</el-button>
    </el-row>
  </el-drawer>
</template>

<script>
import mermaid from 'mermaid'
import { ref } from 'vue'
import { ElMessage,ElConfigProvider } from 'element-plus'
import html2canvas from 'html2canvas'
import { Edit } from '@element-plus/icons-vue'

// @keyup.enter="handleSubmit"
const drawer = ref(false)

const loading = ref(false)

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
    const inputValue1 = ref('')
    const textarea2 = ref('')
    const openaikey = ref('')
    const visible = ref()
    
    const updatakey = () => {
      openaikey.value = inputValue1.value;
      visible.value = false;
    }
    const diskey = () => {
      openaikey.value = ref('');
      visible.value = false;
    }
    const handleSubmit = () => {
      // handle form submission here
      const prompt = "请使用输出Mermaid以下需求。" + inputValue.value + "不要写任何解释或其他文字，只需回复Mermiad图的文本即可。";
      chatopenai(prompt,openaikey).then((res) => {
        // const mermaid_reuslt = processDiagram(res);
        drawDiagram(res);
        textarea2.value = res;
        loading.value = false;
      }).catch((error) => {
        // throw new Error('Diagram error not found.');
        ElMessage.error('抱歉，API调用失败请重试')
      });
    }
    const updateDiagram = async function () {
      console.log(textarea2.value);
      drawDiagram(textarea2.value);
    };
    
    const downloadImage = () => {
      const el = document.querySelector('.mermaid');
      html2canvas(el).then(canvas => {
        const png = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'mermaid.png';
        link.href = png;
        link.click();
      });
    };

    const copyToClipboard = () => {
      const el = document.createElement('textarea');
      el.value = textarea2.value;
      document.body.appendChild(el);
      el.select();
      document.execCommand('copy');
      document.body.removeChild(el);
      open2()
    }
    const open2 = () => {
      ElMessage({
        message: '复制成功',
        type: 'success',
      })
    }
    
    return {
      mermaid_data,
      inputValue,
      handleSubmit,
      downloadImage,
      drawer,
      textarea2,
      updateDiagram,
      copyToClipboard,
      open2,
      loading,
      Edit,
      inputValue1,updatakey,diskey,visible

    }
  }
}

// 创建一个同步的函数，用于获取openai的返回值,"使用mermaid绘制TCP连接流程图,

async function chatopenai(content_1,key) {
  console.log(content_1)
  loading.value=true;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + key.value
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
  loading.value=false;
  return mermaidData;
}
</script>



<style>

:root {
  --el-color-primary:#6E3DEB;
  --el-color-primary-light-3: #7e53ed;
  --el-color-primary-light-5: #9e7ef2;
  --el-color-primary-light-7:#bfa9f6;
  --el-color-primary-light-9: #dfd4fb;
  --el-color-primary-dark-2: #562fb7;
}

.mermaid {
  text-align: center;
}
.button-drawer {
   margin-top: 24px;
   margin-left: 12px;
}
</style>
