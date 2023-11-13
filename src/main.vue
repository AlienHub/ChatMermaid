<template>
    <div class="main">
        <textarea v-model="textareaValue" class="output"></textarea>
        <div>
            <el-button type="primary" @click="handleButtonClick">Excalidraw</el-button>
            <el-button type="primary">Mermaid</el-button>
        </div>

        <textarea class="main_input" v-model="inputValue"></textarea>
        <el-button type="primary" class="main_button" @click="sendRequest">发 送</el-button>
    </div>
</template>


<script>
import { renderDiagram } from './initExcalidraw.ts';
import axios from 'axios';

export default {
    data() {
        return {
            textareaValue: '', // 用于绑定 textarea 的值
            inputValue: '',
            sseValue: '',
        };
    },
    methods: {
        handleButtonClick() {
            renderDiagram(this.textareaValue); // 将 textarea 的值传递给从 TypeScript 文件中导入的函数
        },
        sendRequest() {
            const url = 'https://api.dify.ai/v1/completion-messages';
            const secretKey = 'app-vcCkzJ1sPjp4AFAvPpPENnj7';
            const requestData = {
                inputs: {
                    Type: "流程图",
                    default_input: this.inputValue, // 使用 textarea 的值作为请求的输入内容
                },
                response_mode: 'blocking',
                user: 'alienx',
            };

            axios.post(url, requestData, {
                headers: {
                    'Authorization': `Bearer ${secretKey}`,
                    'Content-Type': 'application/json',
                },
            })
                .then(response => {
                    // 请求成功的处理逻辑
                    console.log(response.data);
                    const responseData = response.data;
                    const answer = responseData.answer;
                    // 删除 ```mermaid 和最后的 ```
                    const startIndex = answer.indexOf("```mermaid") + "```mermaid".length;
                    const endIndex = answer.lastIndexOf("```");
                    const modifiedAnswer = answer.substring(startIndex, endIndex);

                    this.textareaValue = modifiedAnswer;
                })
                .catch(error => {
                    // 请求失败的处理逻辑
                    console.error(error);
                });

        },
    }
}
</script>


<style>
textarea {
    resize: vertical;
    opacity: 1;
    border: none;
    border-radius: 10px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.15);
}

.main {
    width: 28%;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.output {
    /* width: 26%; */
    height: 60vh;
    margin-bottom: 8px;
    margin-top: 8px;
    padding: 8px;
}

.main_input {
    max-width: 100%;
    margin-bottom: 8px;
    margin-top: 8px;
    height: 20vh;
    padding: 8px;
}

.main_button {
    margin-left: auto;
    width: 88px;
    height: 32px;
}
</style>