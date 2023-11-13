<template>
    <div class="head">
        <!-- <div>logo</div> -->
        <div>
            <el-button type="primary" @click="sexcalidraw">Excalidraw</el-button>
            <el-button type="primary" @click="smermaid">Mermaid</el-button>
        </div>
    </div>
    <div class="main">
        <textarea v-model="textareaValue" class="output"></textarea>
        <textarea class="main_input" v-model="inputValue"></textarea>
        <el-button type="primary" class="main_button" @click="sendRequest">发 送</el-button>
    </div>
    <div class="content-container">
        <excalidraw :class="{ active: showExcalidraw }" id="excalidraw"></excalidraw>
        <div :class="{ active: showMermaid }" id="mermaids">
            <pre class="mermaid"></pre>
        </div>
    </div>
</template>


<script setup>
import { renderDiagram } from './initExcalidraw.ts';
import axios from 'axios';
import mermaid from 'mermaid';
import { ref } from 'vue';

const textareaValue = ref('');
const inputValue = ref('');
const showExcalidraw = ref(true);
const showMermaid = ref(false);

// 定义方法

const smermaid = () => {
    showExcalidraw.value = false;
    showMermaid.value = true;
    drawDiagram(textareaValue.value);
};

const sexcalidraw = () => {
    showExcalidraw.value = true;
    showMermaid.value = false;
    renderDiagram(textareaValue.value); // 将 textarea 的值传递给从 TypeScript 文件中导入的函数
};


const drawDiagram = async function (graphDefinition) {
    // const { svg } = await mermaid.render('mermaid', graphDefinition);
    // document.querySelector('.mermaid').innerHTML = svg;
    try {
        const { svg } = await mermaid.render('mermaid', graphDefinition);
        // console.log(svg);
        document.querySelector('.mermaid').innerHTML = svg;
        document.querySelector('dmermaid').remove();

    } catch (error) {
        const errorElement = document.createElement('div');
        errorElement.innerText = error.toString();
        document.querySelector('.mermaid').appendChild(errorElement);
        // document.querySelector('.mermaid').innerHTML = '';
        // console.error(error);
        document.querySelector('dmermaid').remove();
    }

};


const sendRequest = async () => {
    const url = 'https://api.dify.ai/v1/completion-messages';
    const secretKey = 'app-ymU3nTJa3m6W77iOUmUuiTT2';

    try {
        const response = await axios.post(url, {
            inputs: {
                Type: "流程图",
                default_input: inputValue.value,
            },
            response_mode: 'blocking',
            user: 'alienx',
        }, {
            headers: {
                'Authorization': `Bearer ${secretKey}`,
                'Content-Type': 'application/json',
            },
        });

        const responseData = response.data;
        console.log(responseData);
        const answer = responseData.answer;
        const startIndex = answer.indexOf("```mermaid") + "```mermaid".length;
        const endIndex = answer.lastIndexOf("```");
        const modifiedAnswer = answer.substring(startIndex, endIndex);

        // 直接修改 ref 的值
        textareaValue.value = modifiedAnswer;
    } catch (error) {
        console.error("请求失败:", error);
    }
};

// // 返回需要在模板中使用的数据和方法
// return {
//     textareaValue,
//     inputValue,
//     showExcalidraw,
//     showMermaid,
//     handleButtonClick,
//     sendRequest,
// };

</script>


<style>
.head {
    height: 56px;
    display: flex;
    align-items: center;
    /* margin-top: 8px; */
}

textarea {
    resize: vertical;
    opacity: 1;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}

.content-container>div,
.content-container>excalidraw {
    display: none;
}

.content-container>div.active,
.content-container>excalidraw.active {
    display: block;
}

.main {
    width: 28%;
    display: flex;
    flex-direction: column;
    height: 100%;
    top: 56px;
}

.output {
    /* width: 26%; */
    height: calc(100vh - 56px - 20vh - 32px - 24px);
    margin-bottom: 8px;
    margin-top: 8px;
    padding: 8px;
}

.main_input {
    max-width: 100%;
    margin-bottom: 8px;
    margin-top: 8px;
    height: 10vh;
    padding: 8px;
}

.main_button {
    margin-left: auto;
    width: 88px;
    height: 32px;
}
</style>