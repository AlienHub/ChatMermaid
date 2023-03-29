# README

Natural language drawing Mermaid flow chart, based on OpenAI

[中文](https://github.com/AlienHub/ChatMermaid/blob/main/README.md) ｜ [English](https://github.com/AlienHub/ChatMermaid/blob/main/README_EN.md)

## Project Introduction

This project is based on the API interface of OpenAI, using natural language to draw the Mermaid flow chart, which allows downloading the generated flow chart, or manually modifying the flow chart, etc.

![image](https://user-images.githubusercontent.com/44266450/228503954-d65e8776-7e56-469b-a47e-7152652196a4.png)

![image](https://user-images.githubusercontent.com/44266450/228504060-f7061689-b0e7-4472-a614-fd6c1471f82a.png)

Online demo environment: https://chat.tntsec.net

> Note: You need to use your own Key

Here is an example:

https://user-images.githubusercontent.com/44266450/227425232-2364bc46-ce7a-4ebd-8d98-4c8433aec28e.mov

### Implemented

- [x] Support editing of Mermaid text
- [x] Support Mermaid text duplication
- [x] Support exporting Mermaid images to PNG and other formats

### Future plan

- [ ] Support exporting Mermaid images to SVG format
- [ ] Can support dialogue mode, you can talk to the robot, and the robot will draw an optimized output Mermaid flow chart according to the dialogue content
- [ ] better page style

## how to use

1. Clone the project code.
2. Use `yarn install` to install the dependencies required by the project.
3. Use `yarn dev` to view the running results.

### main logic file

Currently all logic codes are in `/src/App.vue`.

## Hope to get help

Since I am not a professional developer, the project is currently just a simple demo, and I hope to get help to improve the project better.
