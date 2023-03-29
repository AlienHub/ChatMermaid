# README

自然语言绘制 Mermaid 流程图，基于 OpenAI

[中文](https://github.com/AlienHub/ChatMermaid/blob/main/README.md) ｜ [English](https://github.com/AlienHub/ChatMermaid/blob/main/README_EN.md)

## 项目介绍

本项目是基于 OpenAI 的 API 接口，使用自然语言绘制 Mermaid 流程图，可以允许下载生成的流程图，或手动的去修改的的流程图等。

![image](https://user-images.githubusercontent.com/44266450/228503954-d65e8776-7e56-469b-a47e-7152652196a4.png)

![image](https://user-images.githubusercontent.com/44266450/228504060-f7061689-b0e7-4472-a614-fd6c1471f82a.png)

在线demo环境：https://chat.tntsec.net

> 注意：需要使用自己的 Key 哦

下面是一个示例：

https://user-images.githubusercontent.com/44266450/227425232-2364bc46-ce7a-4ebd-8d98-4c8433aec28e.mov

### 已经实现

- [x] 支持 Mermaid 文本的编辑
- [x] 支持 Mermaid 文本的复制
- [x] 支持 Mermaid 图片的导出为 PNG 等格式

### 未来计划

- [ ] 支持 Mermaid 图片的导出为 SVG 格式
- [ ] 可以支持对话模式，可以和机器人对话，机器人会根据对话内容绘制优化输出的 Mermaid 流程图
- [ ] 更好的页面风格

## 如何使用

1. 克隆项目代码。
2. 使用 `yarn install` 安装项目所需依赖。
3. 使用 `yarn dev` 查看运行结果。

### 主要逻辑文件

目前全部逻辑代码均在 `/src/App.vue` 中。

## 希望获得帮助

由于我不是专业开发人员，项目目前只是一个简单的demo，希望能获得帮助更好的完善项目。
