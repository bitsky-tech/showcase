# 【教程】基于教材批量制作教学材料

本教程介绍如何使用Bridgic Agent，根据指定的PDF教材，批量为每个课程单元生成课件PPT、教学设计表格和学习任务单。下文详细记录了该工作流的构建过程和调度运行过程。

本教程还展示了Bridgic Agent如何自动拆分并管理子agent的能力。你将会看到，Bridgic Agent启动子agent的两种不同方式。

下面我们马上开始探索之旅！在这个过程中，你无需关注任何一行底层代码。

## 成品展示

在本教程结束后，你将会看到一个成功构建的工作流：

![工作流截图workflow-card.webp](./courseware-development/workflow-card.webp)

该工作流可直接下载并导入进你的Bridgic Agent，作为参考：
<!-- 写成 HTML 而非 markdown 链接的原因见 project-management-automation.md 同一处。 -->
<ul>
<li><a href="/downloads/courseware-development.amphi-workflow" download>基于教材的教学材料生成</a></li>
</ul>

**注意**：由于每个人的电脑桌面运行环境不同，这个工作流未必能在导入后直接运行。仅作为参考，你可以参考它们制作自己真正需要的工作流。
如果你一定要运行这个工作流，可以在运行碰到问题后，要求Bridgic Agent根据你的实际运行环境修复它即可。

最后，在工作流运行完毕后，你将会得到基于指定教材生成的一系列教学材料，包括为每个课程单元生成的课件PPT、教学设计表格和学习任务单。如下：

![工作流截图running-results-card.webp](./courseware-development/running-results-card.webp)

你还会从本教程中学会子agent的管理和两种启动方式。

第一种：子agent由主agent启动：

![工作流截图running-subagent-step.webp](./courseware-development/running-subagent-step.webp)

第二种：子agent由工作流脚本启动：

![工作流截图running-subagents-list.webp](./courseware-development/running-subagents-list.webp)

## 工作流构建教程

### 准备工作

你需要准备好三个文件，作为工作流的输入：
- 教材样例：一个PDF文件。
- 教学设计表格.docx。
- 学习任务单.docx。

### 构建可复用的工作流

本节会引导你创建出一个可复用（可重跑）的自动化工作流。

使用“/build”命令开始工作流创建。简洁、准确地描述需求：

![工作流截图new-task.webp](./courseware-development/new-task.webp)

Bridgic Agent对于需求中不明确的描述会主动和你确认（需求澄清）：

![工作流截图clarify-1.webp](./courseware-development/clarify-1.webp)

![工作流截图clarify-2.webp](./courseware-development/clarify-2.webp)

![工作流截图clarify-3.webp](./courseware-development/clarify-3.webp)

![工作流截图clarify-4.webp](./courseware-development/clarify-4.webp)

![工作流截图clarify-5.webp](./courseware-development/clarify-5.webp)

Bridgic Agent会提示你选择或确认任务的验收标准：

![工作流截图check-1.webp](./courseware-development/check-1.webp)

![工作流截图check-2.webp](./courseware-development/check-2.webp)

这里来到了很关键的一步：**任务说明书的确认**！你需要仔细阅读这里的描述，确保工作流的描述符合你的需求。如果你发现不符合需求的地方，可以用鼠标选中相应文字并评论它，然后Bridgic Agent会根据你的评论进行相应的修改。

![工作流截图task-req-1.webp](./courseware-development/task-req-1.webp)

请关注任务说明书中对于“最终交付物”和“验收标准”的描述。

![工作流截图task-req-2.webp](./courseware-development/task-req-2.webp)

对任务说明书提一些额外的要求：

![工作流截图task-req-comment-1.webp](./courseware-development/task-req-comment-1.webp)

![工作流截图task-req-comment-submit.webp](./courseware-development/task-req-comment-submit.webp)

在需求变动后，重新确认任务说明书：

![工作流截图task-req-diff-confirm.webp](./courseware-development/task-req-diff-confirm.webp)

至此任务说明书已经确认完毕。接下来请遵照Bridgic Agent的引导进行操作。

构建工作流的最后一步：给工作流取个名字。

![工作流截图workflow-naming.webp](./courseware-development/workflow-naming.webp)

工作流创建成功！

![工作流截图workflow-created.webp](./courseware-development/workflow-created.webp)

这个新创建的工作流，以后你随时可以在工作流页面中找到它。工作流卡片如下：

![工作流截图workflow-card.webp](./courseware-development/workflow-card.webp)

### 运行工作流

![工作流截图running-input.webp](./courseware-development/running-input.webp)

工作流执行过程中，发现需要确认指定教材的第一单元的起止分界：

![工作流截图running-confirm-1.webp](./courseware-development/running-confirm-1.webp)

![工作流截图running-confirm-2.webp](./courseware-development/running-confirm-2.webp)

确认后，工作流继续执行。你会看到，它会在恰当的时机启动子agent来完成子任务（你完全不用关心具体子agent如何拆分，由Bridgic Agent自动完成）。

第一个启动子agent的时机是“提炼统一教学内容模型”这一步：

![工作流截图running-subagent-step.webp](./courseware-development/running-subagent-step.webp)

![工作流截图running-subagent-session.webp](./courseware-development/running-subagent-session.webp)

以上这个子agent由主agent启动。

第二个启动子agent的时机是，当需要为教材的每一个单元生成教学材料时，单独为每个单元（这个例子中共7个单元）启动了一个子agent。由于涉及到批量启动子agent，Bridgic Agent首先征求你的确认：

![工作流截图running-subagents-confirm.webp](./courseware-development/running-subagents-confirm.webp)

以上这7个子agent由工作流脚本启动。

确认后，多个子agent开始运行：

![工作流截图running-subagents-list.webp](./courseware-development/running-subagents-list.webp)

![工作流截图running-subagent-session-example.webp](./courseware-development/running-subagent-session-example.webp)

等待工作流运行成功结束：

![工作流截图running-success.webp](./courseware-development/running-success.webp)

点击“查看结果”，可以看到刚才工作流的运行结果：

![工作流截图running-results-card.webp](./courseware-development/running-results-card.webp)

把生成的教学材料（30个文件）批量导出来（转存）：

![工作流截图running-results-export.webp](./courseware-development/running-results-export.webp)

最后，得到需要的教学材料（包括课件PPT、教学设计表格和学习任务单）：

![工作流截图running-results.webp](./courseware-development/running-results.webp)

## 注意事项

- 由于电脑本地的执行环境不同，你的构建过程可能也会碰到很多差异，未必跟以上记录的过程完全相同。具体的过程体验取决于环境和模型能力；建议使用好的模型来构建工作流，然后可以使用次一级的模型来运行它。
- 工作流构建出来之后，并非一成不变，Bridgic Agent提供了强大的工作流修改能力。如果你需求有所变动，随时告诉Bridgic Agent：“修改 @XXX工作流，我要XXXX”。你可以不断优化自己的工作流，让它越来越精细，也越来越贴近你的需求。
- Bridgic Agent对于工作流的构建，成功率非常高。只要需求描述清晰且可行，通常能够一次性成功。但偶尔出现失败的情况，也不要紧，可以让Bridgic Agent修复工作流。修复时告诉它你碰到的异常情况。
- 构建过程中如果发生意外情况，不要慌张，可以随时向agent提问，请它提供更多信息或者让它给建议。在中间过程可以把碰到的问题/疑问都抛给Bridgic Agent。
