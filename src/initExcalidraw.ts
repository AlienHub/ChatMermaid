import ExcalidrawWrapper from "./ExcalidrawWrapper.js";
import { parseMermaidToExcalidraw } from "@excalidraw/mermaid-to-excalidraw";
import { convertToExcalidrawElements}  from "@excalidraw/excalidraw"
import { graphToExcalidraw } from "./com/graphToExcalidraw.js";
import { DEFAULT_FONT_SIZE } from "./com/constants.js";

// Create Excalidraw Wrapper element
const excalidrawWrapper = document.createElement("div");
excalidrawWrapper.id = "excalidraw";
document.body.appendChild(excalidrawWrapper);

// Init Excalidraw
const root = ReactDOM.createRoot(excalidrawWrapper);
root.render(React.createElement(ExcalidrawWrapper));

// Render to Excalidraw
export const renderExcalidraw = (
  mermaidGraphDataString: string,
  fontSize = DEFAULT_FONT_SIZE
) => {
  const mermaidGraphData = JSON.parse(mermaidGraphDataString);
  const { elements, files } = graphToExcalidraw(mermaidGraphData, { fontSize });

  console.info("renderExcalidraw", elements);

  root.render(
    React.createElement(ExcalidrawWrapper, {
      elements,
      files,
    })
  );
};


const diagramDefinition = `
  graph LR
  A[开始] --> B[输入用户名和密码]
  B --> C{验证用户名和密码}
  C -->|验证通过| D[登录成功]
  C -->|验证失败| E[登录失败]
  D --> F[跳转到用户主页]
  E --> B
`;

export async function renderDiagram(diagramDefinition) {
  try {
    const { elements } = await parseMermaidToExcalidraw(diagramDefinition, {
      fontSize: 16, // 设置默认字体大小
    });

    console.info("解析后的流程图数据:", elements);
    const excalidrawElements = convertToExcalidrawElements(elements);
    
    console.info("转换后的流程图数据:", excalidrawElements);
    
    root.render( 
      React.createElement(ExcalidrawWrapper, {
        elements,
        excalidrawElements,
      })
    );

  } catch (error) {
    console.error("解析和渲染流程图时出错:", error);
  }
}

// 调用 renderExcalidraw 函数来渲染内容

renderDiagram(diagramDefinition);