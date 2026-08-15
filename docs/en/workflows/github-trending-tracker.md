# 【教程】GitHub热点及AI项目追踪

本教程介绍如何使用Bridgic Agent构建自动化工作流，每周定时追踪GitHub Trending 的周榜和月榜，产生一个AI热点分析报告并推送飞书消息。然后你可以在手机上接收并阅读这份报告。

本教程详细记录了该工作流的构建过程和调度运行过程。

下面我们马上开始探索之旅！在这个过程中，你无需关注任何一行底层代码。

## 成品展示

在本教程结束后，你将会看到一个成功构建的工作流：

![工作流截图workflow-card.webp](../../zh/workflows/github-trending/workflow-card.webp)

该工作流可直接下载并导入进你的Bridgic Agent，作为参考：
<!-- 写成 HTML 而非 markdown 链接的原因见 project-management-automation.md 同一处。 -->
<ul>
<li><a href="/downloads/github-trending-track.amphi-workflow" download>GitHub 热门项目追踪与飞书推送</a></li>
</ul>

**注意**：由于每个人的电脑桌面运行环境不同，这个工作流未必能在导入后直接运行。仅作为参考，你可以参考它们制作自己真正需要的工作流。
如果你一定要运行这个工作流，可以在运行碰到问题后，要求Bridgic Agent根据你的实际运行环境修复它即可。

还有一个定时调度任务：

![工作流截图schedule-running-success.webp](../../zh/workflows/github-trending/schedule-running-success.webp)

飞书手机客户端可以收到热点消息推送：

![工作流截图schedule-lark-message.webp](../../zh/workflows/github-trending/schedule-lark-message.webp)

## 工作流构建教程

### 准备工作

准备你自己的飞书账号，并创建一个飞书云文档，文档标题叫“GitHub热门项目追踪”。注：这个云文档也可以让工作流自动创建，但这里为了演示简单，我们手动创建它。你在后面可以随时根据需求自己修改。

### 构建可复用的工作流

本节会引导你创建出一个可复用（可重跑）的自动化工作流。

使用“/build”命令开始工作流创建。简洁、准确地描述需求：

![工作流截图new-task-1.webp](../../zh/workflows/github-trending/new-task-1.webp)

![工作流截图new-task-2.webp](../../zh/workflows/github-trending/new-task-2.webp)

Bridgic Agent对于需求中不明确的描述会主动和你确认（需求澄清）：

![工作流截图clarify-1.webp](../../zh/workflows/github-trending/clarify-1.webp)

![工作流截图clarify-2.webp](../../zh/workflows/github-trending/clarify-2.webp)

![工作流截图clarify-3.webp](../../zh/workflows/github-trending/clarify-3.webp)

![工作流截图clarify-4.webp](../../zh/workflows/github-trending/clarify-4.webp)

Bridgic Agent会提示你选择或确认任务的验收标准：

![工作流截图check-def-1.webp](../../zh/workflows/github-trending/check-def-1.webp)

![工作流截图check-def-2.webp](../../zh/workflows/github-trending/check-def-2.webp)

又发现了一些待澄清的需求点：

![工作流截图clarify-again-5.webp](../../zh/workflows/github-trending/clarify-again-5.webp)

![工作流截图clarify-again-6.webp](../../zh/workflows/github-trending/clarify-again-6.webp)

这里来到了很关键的一步：**任务说明书的确认**！你需要仔细阅读这里的描述，确保工作流的描述符合你的需求。如果你发现不符合需求的地方，可以用鼠标选中相应文字并评论它，然后Bridgic Agent会根据你的评论进行相应的修改。

![工作流截图task-req-1.webp](../../zh/workflows/github-trending/task-req-1.webp)

请关注任务说明书中对于“最终交付物”和“验收标准”的描述。

![工作流截图task-req-2.webp](../../zh/workflows/github-trending/task-req-2.webp)

阅读任务说明书后，你可能想对需求做一点点调整：生成报告中的每个入选项目，你希望增加一个项目的GitHub链接。你可以在任务说明书中找到相应的这行描述，用鼠标选中它，点击“评论”按钮：

![工作流截图task-req-comment-pre.webp](../../zh/workflows/github-trending/task-req-comment-pre.webp)

在评论框中写明新的任务要求：

![工作流截图task-req-comment-input.webp](../../zh/workflows/github-trending/task-req-comment-input.webp)

点击“发送反馈并立即构建”：

![工作流截图task-req-comment-added.webp](../../zh/workflows/github-trending/task-req-comment-added.webp)

重新确认任务说明书：

![工作流截图task-req-diff-confirm.webp](../../zh/workflows/github-trending/task-req-diff-confirm.webp)

至此任务说明书已经确认完毕。接下来请遵照Bridgic Agent的引导进行操作。

Bridgic Agent发现需要你分别针对飞书云文档的读权限进行授权，所以弹框告知用户来处理。你基于提示进行处理即可：

![工作流截图larkdoc-read-auth-dialog.webp](../../zh/workflows/github-trending/larkdoc-read-auth-dialog.webp)

![工作流截图larkdoc-read-auth-page.webp](../../zh/workflows/github-trending/larkdoc-read-auth-page.webp)

![工作流截图larkdoc-read-auth-submit.webp](../../zh/workflows/github-trending/larkdoc-read-auth-submit.webp)

同样的过程，再授权一下飞书云文档的写权限：

![工作流截图larkdoc-write-auth-dialog.webp](../../zh/workflows/github-trending/larkdoc-write-auth-dialog.webp)

![工作流截图larkdoc-write-auth-page.webp](../../zh/workflows/github-trending/larkdoc-write-auth-page.webp)

![工作流截图larkdoc-write-auth-submit.webp](../../zh/workflows/github-trending/larkdoc-write-auth-submit.webp)

构建工作流的最后一步：给工作流取个名字。

![工作流截图workflow-naming.webp](../../zh/workflows/github-trending/workflow-naming.webp)

工作流创建成功！

![工作流截图workflow-build-success.webp](../../zh/workflows/github-trending/workflow-build-success.webp)

这个新创建的工作流，以后你随时可以在工作流页面中找到它。工作流卡片如下：

![工作流截图workflow-card.webp](../../zh/workflows/github-trending/workflow-card.webp)

#### 定时调度工作流

刚刚创建出来的新工作流，你可以直接运行它，但当前这个工作流非常适合定时执行。我们使用调度功能来配置定时执行：

![工作流截图schedule-button.webp](../../zh/workflows/github-trending/schedule-button.webp)

![工作流截图schedule-new.webp](../../zh/workflows/github-trending/schedule-new.webp)

![工作流截图schedule-success.webp](../../zh/workflows/github-trending/schedule-success.webp)

这时一个定时任务就调度成功了。

已经调度成功的定时任务，可以在“调度”页面进行管理，可以随时进来查看定时任务每次的执行过程及结果：

![工作流截图schedule-running.webp](../../zh/workflows/github-trending/schedule-running.webp)

定时任务这次执行成功后，可以看到执行结果：

![工作流截图schedule-running-success.webp](../../zh/workflows/github-trending/schedule-running-success.webp)

点击上图中的“查看结果”，可以看到这次任务执行的产出：

![工作流截图schedule-running-result.webp](../../zh/workflows/github-trending/schedule-running-result.webp)

最后，你在飞书手机客户端上可以收到热点消息推送：

![工作流截图schedule-lark-message.webp](../../zh/workflows/github-trending/schedule-lark-message.webp)

点击“文档链接”，可以在手机上查看AI热点分析报告：

![工作流截图schedule-lark-doc.webp](../../zh/workflows/github-trending/schedule-lark-doc.webp)

## 注意事项

- 由于电脑本地的执行环境不同，你的构建过程可能也会碰到很多差异，未必跟以上记录的过程完全相同。具体的过程体验取决于环境和模型能力；建议使用好的模型来构建工作流，然后可以使用次一级的模型来运行它。
- 工作流构建出来之后，并非一成不变，Bridgic Agent提供了强大的工作流修改能力。如果你需求有所变动，随时告诉Bridgic Agent：“修改 @XXX工作流，我要XXXX”。你可以不断优化自己的工作流，让它越来越精细，也越来越贴近你的需求。
- Bridgic Agent对于工作流的构建，成功率非常高。只要需求描述清晰且可行，通常能够一次性成功。但偶尔出现失败的情况，也不要紧，可以让Bridgic Agent修复工作流。修复时告诉它你碰到的异常情况。
- 构建过程中如果发生意外情况，不要慌张，可以随时向agent提问，请它提供更多信息或者让它给建议。在中间过程可以把碰到的问题/疑问都抛给Bridgic Agent。
